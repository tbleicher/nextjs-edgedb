import { createMocks } from "node-mocks-http";
import { TodoDbMemory } from "../../../src/adapters/TodoDb/TodoDbMemory";
import handleRequest from "../../../src/pages/api/todo/[[...id]]";
import { TaskDbInterface } from "../../../src/types/todo";
import { TaskType } from "../../helpers/objectTypes";

describe("/api/todo/[[...id]]", () => {
  describe("POST", () => {
    let db: TaskDbInterface;

    beforeAll(async () => {
      db = new TodoDbMemory();
    });

    it("returns a new Task object", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: { title: "A test task" },
      });

      await handleRequest(req, res, db);

      expect(res._getStatusCode()).toBe(200);

      const data = JSON.parse(res._getData());
      expect(data).toMatchObject(TaskType);
      expect(data.title).toBe("A test task");
    });
  });
});
