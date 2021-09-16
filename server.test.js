const request = require("supertest");
const server = require("./server");
const db = require("./data/db-config");
const exp = require("constants");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("[GET] /api/lessons", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).get("/api/lessons");
  });
  test("responds with a 3 items", async () => {
    expect(res.body.length).toBe(3);
  });
  test("responds with a 200 OK", async () => {
    expect(res.status).toBe(200);
  });
});

describe("[POST] /api/lessons", () => {
  test("responds with the new lesson", async () => {
    const res = await request(server)
      .post("/api/lessons")
      .send({ name: "math" });
    expect(res.body).toMatchObject({ id: 4, name: "math" });
  });
  test("lessons length increases", async () => {
    await request(server).post("/api/lessons").send({ name: "math" });
    const lessons = await db("lessons");
    expect(lessons).toHaveLength(4);
  });
});

describe("[PUT] /api/lessons", () => {
  test("responds with the updated lesson", async () => {
    const res = await request(server)
      .put("/api/lessons/3")
      .send({ name: "bbb" });
    expect(res.body).toMatchObject({ id: 3, name: "bbb" });
  });
  test("lessons length remains the same", async () => {
    const res = await request(server)
      .put("/api/lessons/3")
      .send({ name: "bbb" });
    const lessons = await db("lessons");
    expect(lessons).toHaveLength(3);
  });
});

describe("[DELETE] /api/lessons", () => {
  test("lessons length becomes shorter", async () => {
    const res = await request(server).delete("/api/lessons/3");
    const lessonsLeft = await db("lessons");
    expect(lessonsLeft).toHaveLength(2);
  });
  test("returns deleted lesson", async () => {
    const res = await request(server).delete("/api/lessons/3");

    expect(res.body).toMatchObject({ id: 3, name: "javascript" });
  });
});

test("the environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
