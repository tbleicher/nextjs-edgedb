import { NextApiRequest, NextApiResponse } from "next";
import { TodoDbEdgeDb } from "../../../adapters/TodoDb/TodoDbEdgeDb";
import { TaskDbInterface } from "../../../types/todo";
import * as UseCases from "../../../useCases/todo";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: TaskDbInterface = new TodoDbEdgeDb()) => {
  // get id and title from request data
  const id: string | undefined = req.query.id?.[0];
  const title: string | undefined = req.body.title;

  // GET /api/todo => list tasks
  if (req.method === "GET" && !id) {
    const useCase = new UseCases.ListTasksUseCase(db);
    const todos = await useCase.execute();

    return res.status(200).json(todos);
  }

  // POST /api/todo => create new task
  if (req.method === "POST" && title) {
    const useCase = new UseCases.CreateTaskUseCase(db);
    const todo = await useCase.execute(title);

    return res.status(200).json(todo);
  }

  // PATCH /api/todo/:id => mark task complete/incomplete
  if (req.method === "PATCH" && id) {
    const useCase = new UseCases.ToggleTaskUseCase(db);
    const updatedTodo = await useCase.execute(id);

    return res.status(200).json(updatedTodo);
  }

  // return error for anything else
  return res.status(400).send("Invalid request");
};

export default handler;
