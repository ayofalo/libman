import { describe, it, expect } from "@jest/globals";
import request, { Response } from "supertest";
import app from "../../../server"; // Assuming your Express app is exported as 'app'
import { User } from "../../models/User";
import mongoose from "mongoose";

let server: any;
describe("User routes", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect(); // Close the MongoDB connection
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  });

  it("should register a new user", async () => {
    const response: Response = await request(app)
      .post("/api/auth/v1/register")
      .send({
        email: "johnw@gmail.com",
        password: "Hardwork",
        role: "admin",
      });
    expect(response.status).toBe(201);
  });

  it("should login a user", async () => {
    const response: any = await request(app).post("/api/auth/v1/login").send({
      email: "johnw@gmail.com",
      password: "Hardwork",
    });

    expect(response.status).toEqual(200);
  });
});

// describe("Public routes", () => {
//   let book: Book, author: Author;

//   beforeEach(async () => {
//     author = await Author.create({
//       name: "Ayodele Falowo",
//     });
//     book = await Book.create({
//       title: "Things Fall Apart",
//       authors: [new mongoose.Types.ObjectId(author.id)],
//     });
//   });

//   afterEach(() => {
//     author.deleteOne();
//     book.deleteOne();
//   });

//   it("should retrieve books by book ID", async () => {
//     const response: Response = await request(app).get(
//       `/api/public/v1/books/${author.id}`
//     );
//     expect(response.status).toBe(200);

//     const authorResponse = response.body;

//     expect(authorResponse.length).toBe(1);
//     expect(authorResponse[0].title).toBe("Things Fall Apart");
//   });

//   it("should retrieve all books", async () => {
//     const response: Response = await request(app).get("/api/public/v1/books");
//     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
//     // Add more assertions as needed
//   });

//   it("should retrieve paginated books", async () => {
//     const page = 1; // Specify the page number you want to test
//     const limit = 1; // Specify the limit per page
//     const response: Response = await request(app).get(
//       `/api/public/v1/books?page=${page}&limit=${limit}`
//     );

//     expect(response.status).toBe(200);
//     const books = response.body.length;

//     expect(books).toHaveLength(1);
//   });

//   it("should retrieve all authors", async () => {
//     const response: Response = await request(app).get("/authors");
//     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
//     // Add more assertions as needed
//   });

//   it("should retrieve all borrowers", async () => {
//     const response: Response = await request(app).get("/borrowers");
//     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
//     // Add more assertions as needed
//   });

//   it("should retrieve borrowed books by borrower ID", async () => {
//     const response: Response = await request(app).get(
//       "/:borrowerId/borrowed-books"
//     ); // Replace :borrowerId with a valid borrower ID
//     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
//     // Add more assertions as needed
//   });
// });

// // describe("Private routes", () => {
// //   it("should retrieve authors by ID", async () => {
// //     const response: Response = await request(app).get("/authors/:id"); // Replace :id with a valid author ID
// //     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should retrieve borrowers by ID", async () => {
// //     const response: Response = await request(app).get("/borrowers/:id"); // Replace :id with a valid borrower ID
// //     expect(response.status).toBe(200); // Assuming successful retrieval returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should add a new book", async () => {
// //     const response: Response = await request(app).post("/books").send({
// //       /* provide book data */
// //     });
// //     expect(response.status).toBe(201); // Assuming successful creation returns status code 201
// //     // Add more assertions as needed
// //   });

// //   it("should add a new author", async () => {
// //     const response: Response = await request(app).post("/authors").send({
// //       /* provide author data */
// //     });
// //     expect(response.status).toBe(201); // Assuming successful creation returns status code 201
// //     // Add more assertions as needed
// //   });

// //   it("should add a new borrower", async () => {
// //     const response: Response = await request(app).post("/borrowers").send({
// //       /* provide borrower data */
// //     });
// //     expect(response.status).toBe(201); // Assuming successful creation returns status code 201
// //     // Add more assertions as needed
// //   });

// //   it("should update a book", async () => {
// //     const response: Response = await request(app).put("/books/:bookId").send({
// //       /* provide updated book data */
// //     });
// //     expect(response.status).toBe(200); // Assuming successful update returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should update an author", async () => {
// //     const response: Response = await request(app)
// //       .put("/authors/:authorId")
// //       .send({
// //         /* provide updated author data */
// //       });
// //     expect(response.status).toBe(200); // Assuming successful update returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should add a book to borrowed list", async () => {
// //     const response: Response = await request(app)
// //       .put("/borrowers/:borrowerId")
// //       .send({
// //         /* provide book data to be added */
// //       });
// //     expect(response.status).toBe(200); // Assuming successful addition returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should delete a book", async () => {
// //     const response: Response = await request(app).delete("/books/:bookId");
// //     expect(response.status).toBe(200); // Assuming successful deletion returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should delete an author", async () => {
// //     const response: Response = await request(app).delete("/authors/:authorId");
// //     expect(response.status).toBe(200); // Assuming successful deletion returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should delete a borrower", async () => {
// //     const response: Response = await request(app).delete(
// //       "/borrowers/:borrowerId"
// //     );
// //     expect(response.status).toBe(200); // Assuming successful deletion returns status code 200
// //     // Add more assertions as needed
// //   });

// //   it("should delete a borrowed book", async () => {
// //     const response: Response = await request(app).delete(
// //       "/borrowers/:borrowerId/books/:bookId"
// //     );
// //     expect(response.status).toBe(200); // Assuming successful deletion returns status code 200
// //     // Add more assertions as needed
// //   });
// // });
