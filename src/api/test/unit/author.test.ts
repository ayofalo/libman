import { describe, it, expect } from "@jest/globals";
import request, { Response } from "supertest";
import app from "../../../server"; // Assuming your Express app is exported as 'app'
import { Author } from "../../models/Author";

describe(" Author Public routes", () => {
  let author: Author;

  beforeEach(async () => {
    author = await Author.create({
      name: "Ayodele Falowo",
    });
  });

  afterEach(() => {
    author.deleteOne();
  });

  it("should retrieve all authors", async () => {
    const response: Response = await request(app).get("/authors");
    expect(response.status).toBe(200);
  });

  it("should retrieve paginated authors", async () => {
    const page = 1; // Specify the page number you want to test
    const limit = 1; // Specify the limit per page
    const response: Response = await request(app).get(
      `/api/public/v1/authors?page=${page}&limit=${limit}`
    );

    expect(response.status).toBe(200);
    const books = response.body.length;

    expect(books).toHaveLength(1);
  });
});

describe(" Author Private routes", () => {
  let author: Author;

  beforeEach(async () => {
    author = await Author.create({
      name: "Frank",
    });
  });

  afterEach(() => {
    author.deleteOne();
  });
  it("should retrieve authors by ID", async () => {
    const response: Response = await request(app).get(`/authors/${author.id}`);
    expect(response.status).toBe(200);
  });

  it("should add a new author", async () => {
    const response: Response = await request(app).post("/authors").send({
      name: "Patrick",
    });
    expect(response.status).toBe(201);
  });
  it("should update an author", async () => {
    const response: Response = await request(app)
      .put(`/authors/${author.id}`)
      .send({
        name: "Jeremy dean",
      });
    expect(response.status).toBe(200);
  });

  it("should delete an author", async () => {
    const response: Response = await request(app).delete(
      `/authors/${author.id}`
    );
    expect(response.status).toBe(200);
  });
});
