import { NextApiRequest, NextApiResponse } from "next";
import { TodoDbEdgeDb } from "../../../adapters/TodoDb/TodoDbEdgeDb";
import { TaskDbInterface } from "../../../types/todo";
import * as UseCases from "../../../useCases/todo";

const handler = async (req: NextApiRequest, res: NextApiResponse, db: TaskDbInterface = new TodoDbEdgeDb()) => {
  // get id and title from request data
  const id: string | undefined = req.query.id?.[0];
  const title: string | undefined = req.body.title;

  // DELETE /api/todo/:id => remove task identified by id
  if (req.method === "DELETE" && id) {
    const useCase = new UseCases.DeleteTaskUseCase(db);
    const deletedTask = await useCase.execute(id);

    return res.status(200).json(deletedTask);
  }

  // DELETE /api/todo/ => remove completed tasks
  if (req.method === "DELETE") {
    const useCase = new UseCases.DeleteCompletedTasks(db);
    const deletedTasks = await useCase.execute();

    return res.status(200).json(deletedTasks);
  }

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

  if (req.method === "PATCH") {
    const useCase = new UseCases.MarkAllTasksCompleted(db);
    const updatedTodos = await useCase.execute();

    return res.status(200).json(updatedTodos);
  }

  // return error for anything else
  return res.status(400).send("Invalid request");
};

export default handler;
