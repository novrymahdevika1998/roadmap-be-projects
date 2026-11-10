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
