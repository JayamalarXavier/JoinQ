const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    queueName: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Hospital",
        "College",
        "Bank",
        "Event",
        "Restaurant",
        "Government Office",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    currentToken: {
  type: Number,
  default: 0,
},

lastToken: {
  type: Number,
  default: 0,
},

peopleWaiting: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Open", "Paused", "Closed"],
      default: "Open",
    },

    qrCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Queue", queueSchema);