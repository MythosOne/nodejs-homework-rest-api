const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const { DB_HOST } = process.env;

describe("login user", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "mythos@email.com",
      password: "1234567",
    });

    expect(response.status).toBe(200);
    const { user } = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
    console.log(`status: ${response.status}\n`, response.body);
  });
});
