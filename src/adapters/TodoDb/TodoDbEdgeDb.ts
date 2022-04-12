import { createClient, Client } from "edgedb";
import { Task, TaskDbInterface } from "../../types/todo";

const TODO_DETAILS = `{
  id,
  title,
  createdAt := .created_at,
  completed,
}`;

const MARK_ALL_TODOS_COMPLETED_QUERY = `
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
with todo := (
  insert Todo {
    title := <str>$title
  }
)
select Todo ${TODO_DETAILS} 
  filter Todo = todo
`;

const DELETE_COMPLETED_TODOS = `
with completed_todos := (
  delete Todo
    filter .completed = true
)
select Todo ${TODO_DETAILS} 
  filter Todo in completed_todos
`;

const DELETE_TODO_BY_ID_QUERY = `
with todo := (
  delete Todo
    filter .id = <uuid>$id
)
select Todo ${TODO_DETAILS} 
  filter Todo = todo
`;

const LIST_TODOS_QUERY = `
select Todo ${TODO_DETAILS}
`;

const GET_TODO_BY_ID_QUERY = `
select Todo ${TODO_DETAILS}
  filter .id = <uuid>$id
`;

const TOGGLE_TASK_COMPLETED_QUERY = `
with updated_todo := (
  update Todo
    filter .id = <uuid>$id
    set { completed := not .completed }
)
select Todo ${TODO_DETAILS} 
  filter Todo = updated_todo
`;

export class TodoDbEdgeDb implements TaskDbInterface {
  private client: Client;

  constructor() {
    this.client = createClient();
  }

  async createTask(title: string): Promise<Task | null> {
    return await this.client.querySingle<Task>(CREATE_TODO_QUERY, {
      title,
    });
  }

  async deleteCompletedTasks(): Promise<Task[]> {
    return await this.client.query<Task>(DELETE_COMPLETED_TODOS);
  }

  async deleteTaskById(id: string): Promise<Task | null> {
    return this.client.querySingle<Task>(DELETE_TODO_BY_ID_QUERY, {
      id,
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.client.querySingle<Task>(GET_TODO_BY_ID_QUERY, {
      id,
    });
  }

  async listTasks(): Promise<Task[]> {
    return this.client.query<Task>(LIST_TODOS_QUERY);
  }

  async markAllTasksCompleted(): Promise<Task[]> {
    return this.client.query<Task>(MARK_ALL_TODOS_COMPLETED_QUERY);
  }

  async toggleTaskCompleted(id: string): Promise<Task | null> {
    return this.client.querySingle<Task>(TOGGLE_TASK_COMPLETED_QUERY, {
      id,
    });
  }
}
