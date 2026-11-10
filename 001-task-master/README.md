# Task Master

A TypeScript command-line task manager. Tasks are stored in a JSON file in the current working directory.

## Requirements

- Node.js
- npm

## Setup

Install dependencies from this directory:

```sh
npm install
```

## Usage

Run commands from the `001-task-master` directory. The `--` separates npm arguments from the CLI command.

```sh
npm run start add "Belanja"
npm run start list
npm run start list todo
npm run start update 1 "Belanja bulanan"
npm run start delete 1
npm run start mark-in-progress 1
npm run start mark-done 1
npm run start mark-todo 1
```

Available task statuses are `todo`, `in-progress`, and `done`. The `list` command optionally accepts one of these statuses as a filter. The `update` command takes a task ID and a new description; `delete` and the `mark-*` commands take a task ID.

## Data storage

The application reads and writes `data.json` in the directory where the command is run. When run from this project directory, the file is `001-task-master/data.json`. The file is created when a task is added if it does not exist. It is excluded from version control so each user keeps their own task data.

The JSON file contains a `tasks` array. Each task has an ID, description, status, and creation/update timestamps, for example:

```json
{
  "tasks": [
    {
      "id": 1,
      "description": "Belanja",
      "status": "todo",
      "createdAt": "2026-11-10T12:00:00.000Z",
      "updatedAt": "2026-11-10T12:00:00.000Z"
    }
  ]
}
```
