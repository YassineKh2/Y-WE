import mongoose from "mongoose";

const { Schema } = mongoose;

const STATE = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REFUSED: "REFUSED",
};

const eventSchema = new Schema(
  {
    idOwner: {
      type: String,
      required: true,
    },
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
      type: String,
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
    state: {
      type: String,
      enum: Object.values(STATE),
      default: STATE.PENDING,
    },
  },
  { timestamps: true },
);

export default mongoose.models.event || mongoose.model("event", eventSchema);
