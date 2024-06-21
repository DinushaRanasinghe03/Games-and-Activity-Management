import mongoose from "mongoose";

const gamesandactivitiesRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    MemberName: {
      type: String,
      required: true,
    },
    noParticipation: {
      type: Number,
      required: true,
    },
    regiEmail: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model(
  "gamesandactivitiesrequests",
  gamesandactivitiesRequestSchema
);
