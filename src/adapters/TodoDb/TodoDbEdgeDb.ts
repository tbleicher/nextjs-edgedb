import { createClient, Client } from "edgedb";
import { Task, TaskDbInterface } from "../../types/todo";

const TODO_DETAILS = `{
  id,
  title,
  createdAt := .created_at,
  completed,
}`;

const MARK_ALL_TODOS_COMPLETED_QUERY = `
select (
  with 
    todos_to_update := ( 
      select Todo 
      filter .completed = false
    ) 
    update Todo 
      filter Todo in todos_to_update
      set { completed := true }
) ${TODO_DETAILS}`;

const CREATE_TODO_QUERY = `
select (
  insert Todo {
    title := <str>$title
  }
) ${TODO_DETAILS}`;

const DELETE_COMPLETED_TODOS = `
select (
  delete Todo
    filter
      .completed = true
) ${TODO_DETAILS}`;

const DELETE_TODO_BY_ID_QUERY = `
select (
  delete Todo
    filter
      .id = <uuid>$id
) ${TODO_DETAILS}`;

const LIST_TODOS_QUERY = `
select Todo ${TODO_DETAILS}
`;

const GET_TODO_BY_ID_QUERY = `
select Todo ${TODO_DETAILS}
  filter .id = <uuid>$id
`;

const TOGGLE_TASK_COMPLETED_QUERY = `
select (
  update Todo
    filter 
      .id = <uuid>$id
    set { 
      completed := not .completed
    }
) ${TODO_DETAILS}`;

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
