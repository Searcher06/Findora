import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { validateId } from "../utils/validateID.js";
import { messageModel } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

const claimItem = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const finderId = item.reportedBy;

  const requestExist = await requestModel.findOne({
    claimerId: userID,
    finderId: finderId,
    requestType: "claim",
    itemId: itemId,
    status: "pending",
  });

  console.log(requestExist);
  if (requestExist) {
    res.status(400);
    throw new Error(
      "You already sent request for this item!\nContact the the person that posted the item\nin the chats page"
    );
  }

  const request = await requestModel.create({
    requestType: "claim",
    finderId: item.reportedBy,
    claimerId: userID,
    itemId,
  });

  await request.save();

  const populatedRequest = await requestModel
    .findById(request.id)
    .populate("finderId")
    .populate("claimerId")
    .populate("itemId");

  const message = await messageModel.create({
    receiverId: finderId,
    senderId: userID,
    text: "Hello,I think this item is mine!",
    requestId: request.id,
  });
  await message.save();

  res.status(201).json({
    message,
    populatedRequest,
  });
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
    throw new Error(
      "You already sent a request for this item!\nMessage the person that posted the item instead\nin the chat page."
    );
  }

  if (item.status != "lost") {
    res.status(400);
    throw new Error("Can only send a found request to a lost item");
  }

  const request = await requestModel.create({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
  });
  await request.save();

  const populatedRequest = await requestModel
    .findById(request.id)
    .populate("finderId")
    .populate("claimerId")
    .populate("itemId");

  const message = await messageModel.create({
    receiverId: claimerId,
    senderId: userID,
    text: "I think I found your item!",
    requestId: request.id,
  });
  await request.save();

  res.status(201).json({
    populatedRequest,
    message,
  });
};
const getAllRequests = async (req, res) => {
  const { id: userId } = req.user;

  const requests = await requestModel
    .find({
      $or: [{ finderId: userId }, { claimerId: userId }],
    })
    .populate("finderId", "firstName lastName username profilePic") // Populate finder with user details
    .populate("claimerId", "firstName lastName username profilePic") // Populate claimer with user details
    .populate("itemId", "name image");

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

  for (let i = 1; i <= 6; i++) {
    finderCode += Math.floor(Math.random() * 10);
    claimerCode += Math.floor(Math.random() * 10);
  }

  // Setting the 6-Digit code for handling of item
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
    if (code != request.claimerCode) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.claimerVerified) {
      res.status(400);
      throw new Error("Claimer already verified!"); //todo:change the grammer later
    }
    // verifying the claimer
    request.claimerVerified = true;
  } else if (userID.toString() == request.claimerId.toString()) {
    if (code != request.finderCode) {
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
  const updatedRequest = await requestModel.findById(requestId);

  if (updatedRequest.finderVerified && updatedRequest.claimerVerified) {
    const item = await itemModel.findById(request.itemId);
    updatedRequest.status = "returned";
    item.status = "returned";
    await item.save();
    await updatedRequest.save();
    const finalRequestDoc = await requestModel.findById(requestId);
    res.status(200).json(finalRequestDoc);
  } else {
    res.status(200).json(updatedRequest);
  }
};

export {
  claimItem,
  sendFoundRequest,
  getAllRequests,
  handleItem,
  getRequestsById,
  acceptClaim,
};
