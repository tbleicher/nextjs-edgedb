import { createClient, Client } from "edgedb";
import { NextApiRequest, NextApiResponse } from "next";

const client = createClient();

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const CREATE_TODO_QUERY = `insert Todo {
  title := <str>$title
}`;

const LIST_TODOS_QUERY = `select Todo {
  id,
  title,
  completed,
}`;

const GET_TODO_BY_ID_QUERY = `${LIST_TODOS_QUERY}
  filter .id = <uuid>$id
`;

const TOGGLE_COMPLETED_QUERY = `update Todo
  filter .id = <uuid>$id
  set { completed := not .completed }
`;

async function getTodoById(client: Client, id: string): Promise<Todo | null> {
  return client.querySingle(GET_TODO_BY_ID_QUERY, {
    id,
  }) as Promise<Todo>;
}

async function createTodo(client: Client, title: string): Promise<Todo | null> {
  const createdTodo = (await client.querySingle(CREATE_TODO_QUERY, {
    title,
  })) as { id: string };

  return getTodoById(client, createdTodo.id);
}

async function listTodos(client: Client): Promise<Todo[]> {
  return client.query(LIST_TODOS_QUERY) as Promise<Todo[]>;
}

async function toggleCompleted(client: Client, id: string): Promise<Todo | null> {
  const createdTodo = (await client.querySingle(TOGGLE_COMPLETED_QUERY, {
    id,
  })) as { id: string };

  return getTodoById(client, createdTodo.id);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Three endpoints:
  //   GET /api/todo
  //   POST /api/todo
  //   PATCH /api/todo/:id

  // get id and title
  const id: string | undefined = req.query.id?.[0];
  const title: string | undefined = req.body.title;

  console.log(`${req.method} ${req.url}`);

  if (req.method === "GET" && !id) {
    const todos = await listTodos(client);

    return res.status(200).json(todos);
  }

  if (req.method === "POST" && title) {
    const todo = await createTodo(client, title);

    return res.status(200).json(todo);
  }

  if (req.method === "PATCH" && id) {
    const updatedTodo = await toggleCompleted(client, id);

    return res.status(200).json(updatedTodo);
  }

  return res.status(400).send("Invalid request");
};

export default handler;
