import { describe, it, expect } from "@jest/globals";
import * as mongoose from "mongoose";
import request, { Response } from "supertest";
import app from "../../../server"; // Assuming your Express app is exported as 'app'
import { Book } from "../../models/Book";
import { Author } from "../../models/Author";
import { User } from "../../models/User";

describe("Book Private routes", () => {
  let book: Book;
  let author: Author;
  let token: string;
  beforeAll(async () => {
    const response: Response = await request(app)
      .post("/api/auth/v1/register")
      .send({
        email: "Richard@gmail.com",
        password: "Hardwork",
        role: "admin",
      });
    const loginResponse: any = await request(app)
      .post("/api/auth/v1/login")
      .send({
        email: "Richard@gmail.com",
        password: "Hardwork",
      });
    token = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    author = await Author.create({
      name: "Ayodele Falowo",
    });
    book = await Book.create({
      title: "Things Fall Apart",
      authors: [new mongoose.Types.ObjectId(author.id)],
    });
  });

  it("should add a new book", async () => {
    const response: Response = await request(app)
      .post("/api/private/v1/admin/books")
      .send({
        title: "Engineering",
        authors: [new mongoose.Types.ObjectId(author.id)],
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });

  it("should update a book", async () => {
    const response: Response = await request(app)
      .put(`/api/private/v1/admin/books/${book.id}`)
      .send({
        title: "Reader team",
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  it("should delete a book", async () => {
    const response: Response = await request(app)
      .delete(`/api/private/v1/admin/books/${book.id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });
});
