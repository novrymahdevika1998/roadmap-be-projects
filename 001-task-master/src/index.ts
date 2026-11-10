import { CommandsRegistry, registerCommand, runCommand } from "./command";
import { handlerAdd, handlerDelete, handlerList, handlerUpdate } from "./handlers/tasks";

async function main() {
  const cmdRegistry: CommandsRegistry = {};

  const cmdName = process.argv[2]
  const cmdArgs = process.argv.slice(3)

  registerCommand(cmdRegistry, "add", handlerAdd)
  registerCommand(cmdRegistry, "list", handlerList)
  registerCommand(cmdRegistry, "delete", handlerDelete)
  registerCommand(cmdRegistry, "update", handlerUpdate)
  
  try {
    await runCommand(cmdRegistry, cmdName, ...cmdArgs)
  } catch (error: unknown) {
    console.error(error);
    process.exit(1)
  }

  process.exit(0)
}

main();
