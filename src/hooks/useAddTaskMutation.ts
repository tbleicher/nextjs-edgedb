import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types/todo";

type QueryContext = {
  previousTodos: Task[];
};

function addTaskToCache(newTodo: Task) {
  return function (old: Task[] | undefined) {
    if (!old) return [newTodo];

    return [...old, newTodo];
  };
}

function createTask(title: string) {
  return axios.post("/api/todo", { title });
}

function createTemporaryTask(title: string): Task {
  return {
    id: `__${Math.random()}`,
    title,
    completed: false,
    createdAt: new Date(),
  };
}

function getUpdatedTasksList(
  response: AxiosResponse<Task, any>,
  _title: string,
  context: QueryContext
) {
  const { data: task } = response;
  return [...context.previousTodos, task];
}

export function useAddTaskMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(createTask, {
    onMutate: async (title: string): Promise<QueryContext> => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("todos");

      // snapshot the previous value
      const previousTodos: Task[] =
        queryClient.getQueryData<Task[]>("todos") || [];

      // optimistically add a temporary task object to list
      queryClient.setQueryData<Task[]>(
        "todos",
        addTaskToCache(createTemporaryTask(title))
      );

      // return a context object with the snapshotted value
      return { previousTodos };
    },
    // if the mutation fails, force reload from server by invalidating cache
    onError: (err, title, context) => {
      queryClient.invalidateQueries("todos");
    },
    // add new todo to previous todos list
    onSuccess: (response, title, context) => {
      const todos = getUpdatedTasksList(response, title, context);
      queryClient.setQueryData("todos", todos);
    },
  });

  return mutation;
}
