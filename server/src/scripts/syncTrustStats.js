import dotenv from "dotenv";
import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";

dotenv.config();

const TRUST_POINTS_PER_SUCCESS = 10;

const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/Findora";

const connectDB = async () => {
  const connection = await mongoose.connect(DATABASE_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  console.log("Database connected to " + connection.connection.host);
};

const run = async () => {
  await connectDB();

  const returnedStats = await requestModel.aggregate([
    { $match: { status: "returned" } },
    { $project: { participants: ["$finderId", "$claimerId"] } },
    { $unwind: "$participants" },
    { $group: { _id: "$participants", successfulReturns: { $sum: 1 } } },
  ]);

  const statsMap = new Map(
    returnedStats.map((entry) => [entry._id.toString(), entry.successfulReturns])
  );

  const users = await userModel.find({}).select("_id");
  let updatedCount = 0;

  for (const user of users) {
    const successfulReturns = statsMap.get(user._id.toString()) || 0;
    const trustPoints = successfulReturns * TRUST_POINTS_PER_SUCCESS;
    const hasVerifiedReturnBadge = successfulReturns > 0;

    await userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          successfulReturns,
          trustPoints,
          hasVerifiedReturnBadge,
        },
      }
    );

    updatedCount += 1;
  }

  console.log("Trust sync complete");
  console.log(`Users scanned: ${users.length}`);
  console.log(`Users updated: ${updatedCount}`);
  console.log(`Returned request participant rows: ${returnedStats.length}`);
};

run()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Trust sync failed:", error);
    try {
      await mongoose.connection.close();
    } catch (_err) {
      // ignore
    }
    process.exit(1);
  });
