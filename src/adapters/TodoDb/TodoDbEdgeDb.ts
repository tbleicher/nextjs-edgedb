import { createClient, Client } from "edgedb";
import { Task, TaskDbInterface } from "../../types/todo";

const TODO_DETAILS = `{
  id,
  title,
  createdAt := .created_at,
  completed,
}`;

const MARK_ALL_TASKS_COMPLETED_QUERY = `
with updated_todos := (
  with 
    todos_to_update := ( 
      select Todo 
      filter .completed = false
    ) 
    update Todo 
      filter Todo in todos_to_update
      set { completed := true }
)
select Todo ${TODO_DETAILS} 
  filter Todo in updated_todos
`;

const CREATE_TODO_QUERY = `
insert Todo {
  title := <str>$title
}`;

const DELETE_COMPLETED_TASKS = `
delete Todo
  filter .completed = true
`;

const DELETE_TODO_BY_ID_QUERY = `
delete Todo
  filter .id = <uuid>$id
`;

const LIST_TODOS_QUERY = `
select Todo ${TODO_DETAILS}
`;

const GET_TODO_BY_ID_QUERY = `
select Todo ${TODO_DETAILS}
  filter .id = <uuid>$id
`;

const TOGGLE_COMPLETED_QUERY = `
update Todo
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

  async deleteCompletedTasks(): Promise<boolean> {
    await this.client.query(DELETE_COMPLETED_TASKS);

    return true;
  }

  async deleteTaskById(id: string): Promise<boolean> {
    await this.client.querySingle(DELETE_TODO_BY_ID_QUERY, {
      id,
    });

    return true;
  }

  async getTodoById(id: string): Promise<Task | null> {
    return this.client.querySingle<Task>(GET_TODO_BY_ID_QUERY, {
      id,
    });
  }

  async listTasks(): Promise<Task[]> {
    return this.client.query<Task>(LIST_TODOS_QUERY);
  }

  async markAllTasksCompleted(): Promise<Task[]> {
    const updated = await this.client.query<Task>(MARK_ALL_TASKS_COMPLETED_QUERY);

    return updated;
  }

  async toggleCompleted(id: string): Promise<Task | null> {
    const updatedTodo = await this.client.querySingle<Task>(TOGGLE_COMPLETED_QUERY, {
      id,
    });

    return this.getTodoById(updatedTodo?.id || "");
  }
}
