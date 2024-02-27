import { describe, it, expect } from "@jest/globals";
import request, { Response } from "supertest";
import mongoose from "mongoose";
import app from "../../../server";
import { User } from "../../models/User";

let server: any;
describe("User routes", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const response: Response = await request(app)
      .post("/api/auth/v1/register")
      .send({
        email: "fredw@gmail.com",
        password: "Hardwork",
        role: "admin",
      });
    expect(response.status).toBe(201);
  });

  it("should login a user", async () => {
    const response: any = await request(app).post("/api/auth/v1/login").send({
      email: "fredw@gmail.com",
      password: "Hardwork",
    });

    expect(response.status).toEqual(200);
  });
});
