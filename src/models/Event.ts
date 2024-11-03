import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    estimatedAttendees: {
      type: Number,
      required: true,
    },
    description: {
      type: Number,
      required: true,
    },
    askedAmount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    previousEvents: [
      {
        name: {
          type: String,
          required: true,
        },
        Attendees: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.user || mongoose.model("user", userSchema);
