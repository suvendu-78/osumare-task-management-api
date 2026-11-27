let tasks = [];
let nextId = 1;

export const getTasks = () => tasks;

export const addTask = (task) => {
  const newTask = {
    id: nextId++,
    title: task.title,
    description: task.description,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  return newTask;
};

export const findTask = (id) => {
  return tasks.find((task) => task.id === id);
};

export const updateTaskData = (id, updatedData) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...updatedData,
  };

  return tasks[index];
};

export const deleteTaskData = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  return tasks.splice(index, 1)[0];
};
