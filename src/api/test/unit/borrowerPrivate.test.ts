import { describe, it, expect } from "@jest/globals";
import request, { Response } from "supertest";
import mongoose from "mongoose";
import app from "../../../server";
import { User } from "../../models/User";
import { Borrower } from "../../models/Borrowers";
import { Book } from "../../models/Book";
import { Author } from "../../models/Author";

describe("Borrower Private routes", () => {
  let author: Author;
  let book: Book;
  let borrower: Borrower;
  let token: string;
  beforeAll(async () => {
    const response: Response = await request(app)
      .post("/api/auth/v1/register")
      .send({
        email: "Tedbaker@gmail.com",
        password: "Hardwork",
        role: "admin",
      });
    const loginResponse: any = await request(app)
      .post("/api/auth/v1/login")
      .send({
        email: "Tedbaker@gmail.com",
        password: "Hardwork",
      });
    token = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    try {
      borrower = await Borrower.create({
        name: "Fredrick",
        bookBorrowed: [
          {
            bookId: new mongoose.Types.ObjectId("65d9f2d51fc8f167f78ef46f"),
            borrowedAt: new Date("2024-02-24T15:55:15.325Z"),
          },
          {
            bookId: new mongoose.Types.ObjectId("65da1163cd4a14d09018772a"),
            borrowedAt: new Date("2024-02-24T15:55:15.325Z"),
          },
        ],
      });
    } catch (error) {
      console.error("Error creating test data:", error);
    }
  });

  afterEach(async () => {
    try {
      await borrower.deleteOne();
    } catch (error) {
      console.error("Error deleting test data:", error);
    }
  });
  beforeAll(async () => {
    author = await Author.create({
      name: "Ayodele Falowo",
    });
    book = await Book.create({
      title: "Things Fall Apart",
      authors: [new mongoose.Types.ObjectId(author.id)],
    });
  });

  it("should retrieve borrowers by ID", async () => {
    const response: Response = await request(app)
      .get(`/api/private/v1/admin/borrowers/${borrower._id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  it("should add a new borrower", async () => {
    const response: Response = await request(app)
      .post("/api/private/v1/admin/borrowers")
      .send({
        name: "Chidi",
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });

  it("should add a book to borrowed list", async () => {
    const response: Response = await request(app)
      .put(`/api/private/v1/admin/borrowers/${borrower._id}`)
      .send({
        bookId: book.id,
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });

  it("should delete a borrowed book", async () => {
    const response: Response = await request(app)
      .delete(
        `/api/private/v1/borrowers/${borrower._id}/books/65d9f2d51fc8f167f78ef46f`
      )
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
  it("should delete a borrower", async () => {
    const response: Response = await request(app)
      .delete(`/api/private/v1/admin/borrowers/${borrower._id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });
});
