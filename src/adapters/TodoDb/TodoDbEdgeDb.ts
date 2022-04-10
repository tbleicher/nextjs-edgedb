import { createClient, Client } from "edgedb";
import { Task, TaskDbInterface } from "../../types/todo";

const CREATE_TODO_QUERY = `insert Todo {
  title := <str>$title
}`;

const LIST_TODOS_QUERY = `select Todo {
  id,
  title,
  created_at,
  completed,
}`;

const GET_TODO_BY_ID_QUERY = `${LIST_TODOS_QUERY}
  filter .id = <uuid>$id
`;

const TOGGLE_COMPLETED_QUERY = `update Todo
  filter .id = <uuid>$id
  set { completed := not .completed }
`;

export class TodoDbEdgeDb implements TaskDbInterface {
  private client: Client;

  constructor() {
    this.client = createClient();
  }

  async createTask(title: string): Promise<Task | null> {
    const createdTodo = (await this.client.querySingle(CREATE_TODO_QUERY, {
      title,
    })) as { id: string };

    return this.getTodoById(createdTodo.id);
  }

  async getTodoById(id: string): Promise<Task | null> {
    return this.client.querySingle(GET_TODO_BY_ID_QUERY, {
      id,
    }) as Promise<Task>;
  }

  async listTasks(): Promise<Task[]> {
    return this.client.query(LIST_TODOS_QUERY) as Promise<Task[]>;
  }

  async toggleCompleted(id: string): Promise<Task | null> {
    const createdTodo = (await this.client.querySingle(TOGGLE_COMPLETED_QUERY, {
      id,
    })) as { id: string };

    return this.getTodoById(createdTodo.id);
  }
}
