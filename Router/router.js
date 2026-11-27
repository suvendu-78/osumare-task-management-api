import express from "express";

import {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controller/taskcontroller.js";

const router = express.Router();

router.route("/tasks").get(getAllTasks).post(createTask);

router
  .route("/tasks/:id")
  .get(getSingleTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;
