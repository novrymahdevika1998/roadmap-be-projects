import { CommandsRegistry, registerCommand, runCommand } from "./command";
import { handlerAdd, handlerList } from "./handlers/tasks";

async function main() {
  const cmdRegistry: CommandsRegistry = {};

  const cmdName = process.argv[2]
  const cmdArgs = process.argv.slice(3)

  registerCommand(cmdRegistry, "add", handlerAdd)
  registerCommand(cmdRegistry, "list", handlerList)
  
  try {
    await runCommand(cmdRegistry, cmdName, ...cmdArgs)
  } catch (error: unknown) {
    console.error(error);
    process.exit(1)
  }

  process.exit(0)
}

main();
