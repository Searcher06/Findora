import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { validateId } from "../utils/validateID.js";
import { messageModel } from "../models/message.model.js";

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

  const message = await messageModel.create({
    receiverId: finderId,
    senderId: userID,
    text: "This is item is mine!",
  });

  const request = await requestModel.create({
    requestType: "claim",
    finderId,
    claimerId: userID,
    itemId,
  });

  res.status(201).json({
    message,
    request,
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

  const message = await messageModel.create({
    receiverId: claimerId,
    senderId: userID,
    text: "I think I found your item!",
  });

  const request = await requestModel.create({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
  });

  res.status(201).json({
    request,
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
    .populate("itemId", "name image");

  res.status(200).json(request);
};
const acceptClaim = async (req, res) => {
  const { id: requestId, itemId } = req.requestObject;
  const request = await requestModel.findById(requestId);
  const item = await itemModel.findById(itemId);
  let finderCode = "";
  let claimerCode = "";

  item.status = "claimed";
  request.status = "accepted";

  for (let i = 1; i <= 4; i++) {
    finderCode += Math.floor(Math.random() * 10);
    claimerCode += Math.floor(Math.random() * 10);
  }

  request.finderCode = finderCode;
  request.claimerCode = claimerCode;
  await item.save();
  await request.save();
  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};
const handleItem = async (req, res) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  const { code } = req.body.verification;
  // checking if the requestId is valid
  if (validateId(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
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

  const item = await itemModel.findById(request.itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  if (request.status == "returned") {
    res.status(403);
    throw new Error("Item already returned");
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
      throw new Error("Claimer already verified!");
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
