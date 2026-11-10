import { readFile, writeFile } from "node:fs/promises"
import path from "node:path";

type Task = {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done",
  createdAt: Date,
  updatedAt: Date,
}

type TaskData = {
  tasks: Task[]
}

export async function handlerAdd(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Task name is required")
  } 
  const dataPath = path.join(process.cwd(), "data.json");
  let tasks: Task[] = [];

  try {
    const contents = await readFile(dataPath, "utf8")

    const data: TaskData = JSON.parse(contents)

    tasks = data.tasks
  } catch (e) {
    tasks = []

    await writeFile(dataPath, `${JSON.stringify({ tasks }, null, 2)}\n`, "utf-8")
  }

  const nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

  const taskName = args[0];
  const newTask: Task = { id: nextId, description: taskName, status: "todo", createdAt: new Date(), updatedAt: new Date() }
  tasks.push(newTask)

  await writeFile(dataPath, `${JSON.stringify({ tasks }, null, 2)}\n`, "utf-8");

  console.log(`Task added successfully: (ID: ${nextId})`)
}

export async function handlerList(cmdName: string, ...args: string[]) {
  const dataPath = path.join(process.cwd(), "data.json");

  let tasks: Task[] = [];

  try {
    const contents = await readFile(dataPath, "utf-8");

    const data = JSON.parse(contents)

    tasks = data.tasks;
  } catch (e) {
    tasks = []
  }
  const filterStatus = args[0]

  if (!filterStatus) {
    tasks.forEach((data) => {
      console.log(`ID ${data.id}: ${data.description} - ${data.status} - ${data.createdAt} - ${data.updatedAt}`)
    })
    return;
  }

  if (!["todo", "in-progress", "done"].includes(filterStatus)) {
    throw new Error("Invalid status filter")
  }

  tasks = tasks.filter(task => task.status == filterStatus)

  tasks.forEach((data) => {
    console.log(`ID ${data.id}: ${data.description} - ${data.status} - ${data.createdAt} - ${data.updatedAt}`)
  })

  return;
}

export async function handlerUpdate(cmdName: string, ...args: string[]) {
  const dataPath = path.join(process.cwd(), "data.json");

  let tasks: Task[] = [];

  try {
    const contents = await readFile(dataPath, "utf-8");
    const data: TaskData = JSON.parse(contents)
    tasks = data.tasks;    
  } catch (error) {
    tasks = []
  }

  if (tasks.length === 0) {
    console.log("No tasks found")
    return;
  }

  const taskId = args[0];
  const newDescription = args[1];

  const taskIndex = tasks.findIndex(task => task.id == +taskId)

  if (taskIndex === -1) {
    console.log("Task not found")
    return;
  }

  tasks[taskIndex].description = newDescription;
  tasks[taskIndex].updatedAt = new Date();

  await writeFile(dataPath, `${JSON.stringify({ tasks }, null, 2)}\n`, "utf-8");

  console.log("Task updated successfully")
}

export async function handlerDelete(cmdName: string, ...args: string[]) {
  const dataPath = path.join(process.cwd(), "data.json");

  let tasks: Task[] = [];

  try {
    const contents = await readFile(dataPath, "utf-8");
    const data: TaskData = JSON.parse(contents)
    tasks = data.tasks;    
  } catch (error) {
    tasks = []
  }

  if (tasks.length === 0) {
    console.log("No tasks found")
    return;
  }

  const taskId = args[0];

  const taskIndex = tasks.findIndex(task => task.id == +taskId)

  if (taskIndex === -1) {
    console.log("Task not found")
    return;
  }

  tasks.splice(taskIndex, 1);

  await writeFile(dataPath, `${JSON.stringify({ tasks }, null, 2)}\n`, "utf-8");

  console.log("Task deleted successfully")
}
