import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Number: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    Address: {
      type: String,
      require: true,
    },
  },
  { timestamps: "true" },
);
export default dataSchema;
