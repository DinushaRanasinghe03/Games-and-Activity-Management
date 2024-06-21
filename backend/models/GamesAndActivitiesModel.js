import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    gameoractivitycategory: {
      type: mongoose.ObjectId,
      ref: "activitycategories",
      required: true,
    },
    activityimage: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    guidelines: {
      type: String,
      required: true,
    },

    instructors: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("gamesandactivities", activitySchema);
