import { createMocks } from "node-mocks-http";
import { TodoDbMemory } from "../../../src/adapters/TodoDb/TodoDbMemory";
import handleRequest from "../../../src/pages/api/todo/[[...id]]";
import { TaskDbInterface } from "../../../src/types/todo";
import { TaskType } from "../../helpers/objectTypes";

const createTodo = async (db: TaskDbInterface, title = "A todo item") => {
  const { req, res } = createMocks({
    method: "POST",
    body: { title },
  });

  await handleRequest(req, res, db);
};

describe("/api/todo/[[...id]]", () => {
  describe("GET", () => {
    let db: TaskDbInterface;

    beforeAll(async () => {
      db = new TodoDbMemory();

      await createTodo(db, "First todo");
      await createTodo(db, "Second todo");
    });

    it("returns a list of Task objects", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: {},
      });

      await handleRequest(req, res, db);

      expect(res._getStatusCode()).toBe(200);

      const data = JSON.parse(res._getData());
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBe(2);
      expect(data[0]).toMatchObject(TaskType);
    });

    it("returns a 400 error when an 'id' query parameter is provided", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { id: ["abc"] },
      });

      await handleRequest(req, res, db);

      expect(res._getStatusCode()).toBe(400);
    });
  });
});
