// import { describe, it, expect } from "@jest/globals";
// import request from "supertest";
// import app from "../../../server"; // Assuming your Express app is exported as 'app'

// describe("Authorization", () => {
//   let token: string;

//   beforeAll(async () => {
//     // Authenticate user and get token (replace with your authentication method)
//     const loginResponse = await request(app).post("/login").send({
//       email: "testuser@example.com",
//       password: "password",
//     });
//     token = loginResponse.body.token;
//   });

//   it("should allow access to protected route with valid token and role", async () => {
//     // Attempt to access a protected route with valid authentication token and role
//     const response = await request(app)
//       .get("/protected-route")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.status).toBe(200); // Expecting status code 200 for successful access
//     // Add more assertions as needed
//   });

//   it("should deny access to protected route with invalid token", async () => {
//     // Attempt to access a protected route with invalid authentication token
//     const response = await request(app)
//       .get("/protected-route")
//       .set("Authorization", "Bearer invalidToken");
//     expect(response.status).toBe(401); // Expecting status code 401 for unauthorized access
//     // Add more assertions as needed
//   });

//   it("should deny access to protected route with insufficient permissions", async () => {
//     // Attempt to access a protected route with valid authentication token but insufficient permissions
//     const response = await request(app)
//       .get("/protected-route")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.status).toBe(403); // Expecting status code 403 for forbidden access
//     // Add more assertions as needed
//   });
// });
// function beforeAll(arg0: () => Promise<void>) {
//   throw new Error("Function not implemented.");
// }
