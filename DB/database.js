import mongoose from "mongoose";
import data from "../constant.js";

const DB = async () => {
  try {
    const data1 = await mongoose.connect(`${process.env.MNGO_DB_URL}/${data}`);
    console.log("data listen successfully ");
    return data1;
  } catch (error) {
    console.log(error, "connection error");
  }
};
export default DB;
