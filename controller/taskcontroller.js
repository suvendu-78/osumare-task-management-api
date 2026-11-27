import {
  getTasks,
  addTask,
  findTask,
  updateTaskData,
  deleteTaskData,
} from "../Utils/taskData.js";

import ApiResponse from "../Utils/Apiresponse.js";
import ApiError from "../Utils/Apierror.js";

const createTask = (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      throw new ApiError(400, "Title and description are required");
    }

    const task = addTask({
      title: title.trim(),
      description: description.trim(),
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Task created successfully", task));
  } catch (error) {
    next(error);
  }
};

const getAllTasks = (req, res, next) => {
  try {
    let tasks = [...getTasks()];

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search?.trim().toLowerCase();

    const sortBy = req.query.sortBy || "id";
    const order = req.query.order === "desc" ? -1 : 1;

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      throw new ApiError(400, "Invalid pagination values");
    }

    // FILTERING
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    const allowedSortFields = ["id", "title", "createdAt"];

    if (!allowedSortFields.includes(sortBy)) {
      throw new ApiError(400, "Invalid sorting field");
    }

    tasks.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * order;
      if (a[sortBy] > b[sortBy]) return 1 * order;
      return 0;
    });

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / limit);

    const startIndex = (page - 1) * limit;
    const paginatedTasks = tasks.slice(startIndex, startIndex + limit);

    return res.status(200).json(
      new ApiResponse(200, "Tasks fetched successfully", {
        tasks: paginatedTasks,
        pagination: {
          currentPage: page,
          limit,
          totalTasks,
          totalPages,
        },
      }),
    );
  } catch (error) {
    next(error);
  }
};

const getSingleTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new ApiError(400, "Invalid task ID");
    }

    const task = findTask(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Task fetched successfully", task));
  } catch (error) {
    next(error);
  }
};

const updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new ApiError(400, "Invalid task ID");
    }

    const { title, description } = req.body;

    if (
      !req.body ||
      Object.keys(req.body).length === 0 ||
      Object.keys(req.body).some(
        (key) => !["title", "description"].includes(key),
      )
    ) {
      throw new ApiError(400, "Provide valid task fields to update");
    }

    if (
      (title !== undefined && (typeof title !== "string" || !title.trim())) ||
      (description !== undefined &&
        (typeof description !== "string" || !description.trim()))
    ) {
      throw new ApiError(400, "Task fields cannot be empty");
    }

    const updatedData = {};

    if (title !== undefined) updatedData.title = title.trim();
    if (description !== undefined) {
      updatedData.description = description.trim();
    }

    const updatedTask = updateTaskData(id, updatedData);

    if (!updatedTask) {
      throw new ApiError(404, "Task not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Task updated successfully", updatedTask));
  } catch (error) {
    next(error);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new ApiError(400, "Invalid task ID");
    }

    const deletedTask = deleteTaskData(id);

    if (!deletedTask) {
      throw new ApiError(404, "Task not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Task deleted successfully", deletedTask));
  } catch (error) {
    next(error);
  }
};

export { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };
