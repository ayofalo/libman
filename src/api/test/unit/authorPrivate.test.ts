import { describe, it, expect } from "@jest/globals";
import request, { Response } from "supertest";
import app from "../../../server";
import { Author } from "../../models/Author";
import { User } from "../../models/User";

describe(" Author Private routes", () => {
  let author: Author;
  let token: string;

  beforeAll(async () => {
    const response: Response = await request(app)
      .post("/api/auth/v1/register")
      .send({
        email: "johnw@gmail.com",
        password: "Hardwork",
        role: "admin",
      });
    const loginResponse: any = await request(app)
      .post("/api/auth/v1/login")
      .send({
        email: "johnw@gmail.com",
        password: "Hardwork",
      });
    token = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    author = await Author.create({
      name: "Frank",
    });
  });

  afterEach(() => {
    author.deleteOne();
  });

  it("should retrieve authors by ID", async () => {
    const response: Response = await request(app)
      .get(`/api/private/v1/admin/authors/${author.id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  it("should add a new author", async () => {
    const response: Response = await request(app)
      .post("/api/private/v1/admin/authors")
      .send({
        name: "Patrick",
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });
  it("should update an author", async () => {
    const response: Response = await request(app)
      .put(`/api/private/v1/admin/authors/${author.id}`)
      .send({
        name: "Jeremy dean",
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  it("should delete an author", async () => {
    const response: Response = await request(app)
      .delete(`/api/private/v1/admin/authors/${author.id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });
});
