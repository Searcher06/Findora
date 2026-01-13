import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { validateId } from "../utils/validateID.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

const claimItem = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const finderId = item.reportedBy;

  // Check if request already exists
  const requestExist = await requestModel.findOne({
    claimerId: userID,
    itemId: itemId,
  });

  if (requestExist) {
    res.status(400);
    throw new Error("You already sent a request for this item!");
  }

  const initialMessage = "Hello, I think this item is mine!";

  const request = await requestModel.create({
    requestType: "claim",
    finderId: finderId,
    claimerId: userID,
    itemId: itemId,
    conversation: [
      {
        senderId: userID,
        receiverId: finderId,
        text: initialMessage,
      },
    ],
    lastMessage: {
      text: initialMessage,
      senderId: userID,
    },
    lastMessageAt: new Date(),
    // Set lastSeen so receiver gets a notification
    lastSeen: {
      claimer: new Date(),
      finder: new Date(0),
    },
  });

  const populatedRequest = await requestModel
    .findById(request.id)
    .populate("finderId", "firstName lastName username profilePic")
    .populate("claimerId", "firstName lastName username profilePic")
    .populate("itemId");

  res.status(201).json(populatedRequest);
};

const sendFoundRequest = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const claimerId = item.reportedBy;

  const requestExists = await requestModel.findOne({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
  });

  if (requestExists) {
    res.status(400);
    throw new Error("You already sent a request for this item!");
  }

  if (item.status !== "lost") {
    res.status(400);
    throw new Error("Can only send a found request to a lost item");
  }

  const initialMessage = "I think I found your item!";

  const request = await requestModel.create({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
    conversation: [
      {
        senderId: userID,
        receiverId: claimerId,
        text: initialMessage,
      },
    ],
    lastMessage: {
      text: initialMessage,
      senderId: userID,
    },
    lastMessageAt: new Date(),
    lastSeen: {
      finder: new Date(),
      claimer: new Date(0),
    },
  });

  const populatedRequest = await requestModel
    .findById(request._id)
    .populate("finderId", "firstName lastName username profilePic")
    .populate("claimerId", "firstName lastName username profilePic")
    .populate("itemId");

  res.status(201).json(populatedRequest);
};

const getAllRequests = async (req, res) => {
  const { id: userId } = req.user;

  const requests = await requestModel
    .find({ participants: userId })
    .populate("finderId", "firstName lastName username profilePic")
    .populate("claimerId", "firstName lastName username profilePic")
    .populate("itemId", "name image")
    .select("-conversation")
    .sort({ lastMessageAt: -1 });

  res.status(200).json(requests);
};

const getRequestsById = async (req, res) => {
  const { id: requestId } = req.requestObject;
  const request = await requestModel
    .findById(requestId)
    .populate("finderId", "firstName lastName username profilePic")
    .populate("claimerId", "firstName lastName username profilePic")
    .populate("itemId");

  res.status(200).json(request);
};

const acceptClaim = async (req, res) => {
  const { id: requestId, itemId } = req.requestObject;
  const request = await requestModel.findById(requestId).populate("claimerId");
  const item = await itemModel.findById(itemId);
  let finderCode = "";
  let claimerCode = "";

  item.status = "claimed";
  request.status = "accepted";

  for (let i = 1; i <= 5; i++) {
    finderCode += Math.floor(Math.random() * 10);
    claimerCode += Math.floor(Math.random() * 10);
  }

  request.finderCode = finderCode;
  request.claimerCode = claimerCode;

  // Update lastSeen for the finder since they are active
  request.lastSeen.finder = new Date();

  await item.save();
  await request.save();

  const updatedRequest = await requestModel
    .findById(requestId)
    .populate("finderId")
    .populate("claimerId");

  const receiverSocketId = getRecieverSocketId(request.claimerId.username);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("acceptClaim", updatedRequest);
    console.log("Claim accepted");
  }

  res.status(200).json(updatedRequest);
};

const handleItem = async (req, res) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  const { code } = req.body;

  if (validateId(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID, or check your url");
  }
  const request = await requestModel.findOne({
    _id: requestId,
    $or: [{ finderId: userID }, { claimerId: userID }],
    status: "accepted",
  });

  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  if (userID.toString() == request.finderId.toString()) {
    if (code.toString() !== request.claimerCode.toString()) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.claimerVerified) {
      res.status(400);
      throw new Error("Claimer already verified!");
    }
    request.claimerVerified = true;
    request.lastSeen.finder = new Date();
  } else if (userID.toString() == request.claimerId.toString()) {
    if (code.toString() !== request.finderCode.toString()) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.finderVerified) {
      res.status(400);
      throw new Error("Finder already verified!");
    }

    request.finderVerified = true;
    request.lastSeen.claimer = new Date();
  } else {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  await request.save();
  const updatedRequest = await requestModel
    .findById(requestId)
    .populate("finderId")
    .populate("claimerId")
    .populate("itemId");

  if (updatedRequest.finderVerified && updatedRequest.claimerVerified) {
    const item = await itemModel.findById(request.itemId);
    updatedRequest.status = "returned";
    item.status = "returned";
    await item.save();
    await updatedRequest.save();
    const finalRequestDoc = await requestModel
      .findById(requestId)
      .populate("finderId", "firstName lastName username profilePic")
      .populate("claimerId", "firstName lastName username profilePic")
      .populate("itemId", "name image");

    io.to(`request:${requestId}`).emit("request:verified", finalRequestDoc);

    return res.status(200).json(finalRequestDoc);
  }
  res.status(200).json(updatedRequest);
};

export {
  claimItem,
  sendFoundRequest,
  getAllRequests,
  handleItem,
  getRequestsById,
  acceptClaim,
};
