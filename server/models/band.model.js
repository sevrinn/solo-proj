const mongoose = require("mongoose");

const BandSchema = mongoose.Schema(
  {
    bandName: {
      type: String,
      required: [true, "Your band/solo act has to have a name"],
    },
    genre: {
      type: String,
    },
    description: {
      type: String,
      required: [
        true,
        "A short description of your band/ solo project is required",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Band", BandSchema);
