import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const App = express();

App.use(cors());
App.use(express.json({ limit: "50mb" }));
App.use(express.urlencoded({ extended: true }));
App.use(express.static("public"));

import router from "./Router/router.js";

App.use("/api/v1/users", router);

export default App;
