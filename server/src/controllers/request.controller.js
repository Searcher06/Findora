import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { validateId } from "../utils/validateID.js";
// import { messageModel } from "../models/message.model.js";
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

  const request = await requestModel.create({
    requestType: "claim",
    finderId: finderId,
    claimerId: userID,
    itemId: itemId,
    // Start the conversation right here!
    conversation: [
      {
        senderId: userID,
        receiverId: finderId,
        text: "Hello, I think this item is mine!",
      },
    ],
    // Update the preview for the Inbox UI
    lastMessage: {
      text: "Hello, I think this item is mine!",
      senderId: userID,
    },
    lastMessageAt: new Date(),
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

  // FIXED: Removed messageModel.create and added embedded conversation
  const request = await requestModel.create({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
    conversation: [
      {
        senderId: userID,
        receiverId: claimerId,
        text: "I think I found your item!",
      },
    ],
    lastMessage: {
      text: "I think I found your item!",
      senderId: userID,
    },
    lastMessageAt: new Date(),
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
    .populate("finderId", "firstName lastName username profilePic") // Populate finder with user details
    .populate("claimerId", "firstName lastName username profilePic") // Populate claimer with user details
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

  // Setting the 6-Digit code for item handover
  request.finderCode = finderCode;
  request.claimerCode = claimerCode;
  // updating the request and item state
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

  // checking if the requestId is valid
  if (validateId(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID, or check your url");
  }
  const request = await requestModel.findOne({
    _id: requestId,
    $or: [{ finderId: userID }, { claimerId: userID }],
    status: "accepted",
  });

  // checking if there's no request
  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  // checking if the current user is the finder
  if (userID.toString() == request.finderId.toString()) {
    // checking if the finder code is not equal to the claimer code
    if (code.toString() !== request.claimerCode.toString()) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.claimerVerified) {
      res.status(400);
      throw new Error("Claimer already verified!"); //todo:change the grammar later
    }
    // verifying the claimer
    request.claimerVerified = true;
    // Checking if the current user is the claimer
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

    // emit the event to both users that the item has been handled successfully
    io.to(`request:${requestId}`).emit("request:verified", finalRequestDoc);

    res.status(200).json(finalRequestDoc);
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
