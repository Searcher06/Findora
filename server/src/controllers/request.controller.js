import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { userModel } from "../models/user.model.js";
import { validateId } from "../utils/validateID.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";

const claimItem = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const finderId = item.reportedBy;

  if (item.isHidden) {
    res.status(403);
    throw new Error("This item is not available for requests");
  }

  // Check if request already exists
  const requestExist = await requestModel.findOne({
    claimerId: userID,
    itemId: itemId,
  });

  if (requestExist) {
    res.status(400);
    throw new Error("You already sent a request for this item!");
  }

  const initialMessage = `[SYSTEM]: New Claim Request for "${item.name}". I believe this item belongs to me and would like to verify.`;
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
    .populate("finderId", "_id firstName lastName username profilePic")
    .populate("claimerId", "_id firstName lastName username profilePic")
    .populate("itemId");

  const receiverUsername = populatedRequest.finderId.username;
  const receiverSocketId = getReceiverSocketId(receiverUsername);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newChatRequest", populatedRequest);
  }

  // WhatsApp + Push notification to finder — fire-and-forget
  userModel
    .findById(finderId)
    .select("whatsappPhone firstName")
    .then((u) => {
      if (u?.whatsappPhone) {
        sendWhatsApp(
          u.whatsappPhone,
          `Hi ${u.firstName}! 📬 Someone just submitted a claim for your found item *"${item.name}"* on Findora.\n\nOpen the app to review their request and accept or decline it.`
        );
      }
    })
    .catch(() => {});

  sendPushNotification(finderId, {
    title: "New Claim Request",
    body: `Someone submitted a claim for "${item.name}". Tap to review.`,
    url: `/notifications`,
  }).catch(() => {});

  res.status(201).json(populatedRequest);
};

const reportItemFound = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const claimerId = item.reportedBy;

  if (item.isHidden) {
    res.status(403);
    throw new Error("This item is not available for requests");
  }

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

  const initialMessage = `[SYSTEM]: I've started a conversation regarding the "${item.name}" you lost. I believe I have found it!`;

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
    .populate("finderId", "_id firstName lastName username profilePic")
    .populate("claimerId", "_id firstName lastName username profilePic")
    .populate("itemId");

  const receiverUsername = populatedRequest.claimerId.username;
  const receiverSocketId = getReceiverSocketId(receiverUsername);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newChatRequest", populatedRequest);
  }

  // WhatsApp notification to claimer/item owner — fire-and-forget
  userModel
    .findById(claimerId)
    .select("whatsappPhone firstName")
    .then((u) => {
      if (u?.whatsappPhone) {
        sendWhatsApp(
          u.whatsappPhone,
          `Hi ${u.firstName}! 🔍 Good news — someone says they've found your lost item *"${item.name}"* on Findora.\n\nOpen the app to connect with them and arrange a handover.`
        );
      }
    })
    .catch(() => {});

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

  if (request.status !== "pending") {
    res.status(400);
    throw new Error("Only pending requests can be accepted");
  }

  if (!item) {
    request.status = "closed";
    request.closedAt = new Date();
    request.closeReason = "Linked item is missing";
    await request.save();
    res.status(409);
    throw new Error("Cannot accept this request because the linked item is missing");
  }

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

  const receiverSocketId = getReceiverSocketId(request.claimerId.username);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("acceptClaim", updatedRequest);
    console.log("Claim accepted");
  }

  // WhatsApp notifications to both parties with their respective codes — fire-and-forget
  // Each person receives their own code to share with the other at handover
  if (updatedRequest.claimerId?.whatsappPhone) {
    sendWhatsApp(
      updatedRequest.claimerId.whatsappPhone,
      `Hi ${updatedRequest.claimerId.firstName}! ✅ Your claim for *"${item.name}"* has been accepted!\n\n🔑 Your handover code:\n*${claimerCode}*\n\nWhen you meet the finder, show them this code — they'll enter it to confirm the exchange. Open the Findora app for full details.`
    ).catch(() => {});
  }
  if (updatedRequest.finderId?.whatsappPhone) {
    sendWhatsApp(
      updatedRequest.finderId.whatsappPhone,
      `Hi ${updatedRequest.finderId.firstName}! 🤝 You've accepted a claim for *"${item.name}"*.\n\n🔑 Your handover code:\n*${finderCode}*\n\nWhen you meet the claimer, show them this code — they'll enter it to confirm the exchange. Open the Findora app for full details.`
    ).catch(() => {});
  }

  sendPushNotification(updatedRequest.claimerId?._id, {
    title: "Claim Accepted! 🎉",
    body: `Your claim for "${item.name}" was accepted. Tap to get your handover code.`,
    url: `/handover/${updatedRequest._id}`,
  }).catch(() => {});

  res.status(200).json(updatedRequest);
};

const verifyHandover = async (req, res) => {
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
    if (!item) {
      updatedRequest.status = "closed";
      updatedRequest.closedAt = new Date();
      updatedRequest.closeReason = "Linked item is missing";
      await updatedRequest.save();
      res.status(409);
      throw new Error(
        "Cannot complete handover because the linked item is missing"
      );
    }
    updatedRequest.status = "returned";
    item.status = "returned";
    await item.save();
    await updatedRequest.save();

    // Campus trust system: reward both participants after successful handover.
    const TRUST_POINTS_PER_SUCCESS = 10;
    const finderId = updatedRequest.finderId?._id || updatedRequest.finderId;
    const claimerId = updatedRequest.claimerId?._id || updatedRequest.claimerId;

    await Promise.all([
      userModel.findByIdAndUpdate(finderId, [
        {
          $set: {
            trustPoints: {
              $add: [{ $ifNull: ["$trustPoints", 0] }, TRUST_POINTS_PER_SUCCESS],
            },
            successfulReturns: { $add: [{ $ifNull: ["$successfulReturns", 0] }, 1] },
            hasVerifiedReturnBadge: true,
          },
        },
      ]),
      userModel.findByIdAndUpdate(claimerId, [
        {
          $set: {
            trustPoints: {
              $add: [{ $ifNull: ["$trustPoints", 0] }, TRUST_POINTS_PER_SUCCESS],
            },
            successfulReturns: { $add: [{ $ifNull: ["$successfulReturns", 0] }, 1] },
            hasVerifiedReturnBadge: true,
          },
        },
      ]),
    ]);

    const finalRequestDoc = await requestModel
      .findById(requestId)
      .populate("finderId", "firstName lastName username profilePic")
      .populate("claimerId", "firstName lastName username profilePic")
      .populate("itemId", "name image");

    io.to(`request:${requestId}`).emit("request:verified", finalRequestDoc);

    // WhatsApp notifications to both parties — fire-and-forget
    // updatedRequest has finderId, claimerId, itemId all fully populated
    const itemName = updatedRequest.itemId?.name || "your item";
    if (updatedRequest.finderId?.whatsappPhone) {
      sendWhatsApp(
        updatedRequest.finderId.whatsappPhone,
        `Hi ${updatedRequest.finderId.firstName}! 🎉 Handover complete for *"${itemName}"*!\n\n+10 trust points have been added to your Findora profile. Thank you for your honesty in returning this item — you made someone's day! 🙌`
      ).catch(() => {});
    }
    if (updatedRequest.claimerId?.whatsappPhone) {
      sendWhatsApp(
        updatedRequest.claimerId.whatsappPhone,
        `Hi ${updatedRequest.claimerId.firstName}! 🎉 Your item *"${itemName}"* has been successfully returned!\n\n+10 trust points have been added to your Findora profile. We're glad Findora helped reunite you with your item! 😊`
      ).catch(() => {});
    }

    return res.status(200).json(finalRequestDoc);
  }
  res.status(200).json(updatedRequest);
};

export {
  claimItem,
  reportItemFound,
  getAllRequests,
  verifyHandover,
  getRequestsById,
  acceptClaim,
};
