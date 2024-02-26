# Library Management System  Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the web application](#running-the-web-application)
  - [Running tests](#running-test)
  - [Serverless Deployment](#Serverless-deployment)
- [Rest API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

RESTFUL API for a Fictional Library Management System

A node appliaction that allows users to manage books, authors, and borrowers. The API provides functionality for adding,
retrieving, updating, and deleting records. 

The system provides JWT-based authentication to secure access to private endpoints. Pagination was used to optimize backend performance. 

Users are assigned roles and access to some endpoints is based on registered role. The roles include Admin and Borrower roles. 

Documented the API using the OpenAPI specification. Utilized Swagger. 

Cookie based authenication was used because they are provide automatic handling functionality and are less susceptible to certain types of attacks like Cross-Site Request Forgery (CSRF).

Application was deployed serverless on AWS Lambda and API Gateway


Technologies used

- Backend: NodeJS & RestAPI & Expressjs using Typescript
- Database: MongoDB
- Cloud services: AWS Lambda and API Gateway for serverless deployment
- Authentication: JWT-based authentication
- API documentation: Swagger
- Testing: Jest
- CI - Github Actions

## Features

The service has four major endpoints implemented

- Public Routes

- GET "/api/public/v1/books/": This endpoint returns all book records. Pagination was implemented

- GET "/api/public/v1/books/{authorId}": This endpoint returns books written by an author

- GET "/api/public/v1/authors": This endpoint returns all authors 

- GET "/api/public/v1/authors/{id}" : This endpoint returns all authors by id

- GET "/api/public/v1/api/public/v1/borrowers": This endpoint returns all borrowers

- GET  "/api/public/v1/api/public/v1/{borrowerId}/borrowed-books": This endpoint returns all books borrowed by borrower's id 

- Protected Routes

- Author Routes

- POST "/api/private/v1/admin/authors/": This endpoint is used to create an author and to database

- PUT "/api/private/v1/admin/authors/{authorId}",: This endpoint is used to update author details

- DELETE  "/api/private/v1/admin/authors/{authorId}" : This endpoint is used to delete an author 

- Book Routes

- POST "/api/private/v1/admin/books" : This endpoint is used to create a book and add to database

- PUT "/api/private/v1/admin/books/{bookId}",: This endpoint is used to update book details

- DELETE  "/api/private/v1/admin/books/{bookId}" : This endpoint is used to delete a book by id 

- Borrowers Routes

- GET "/api/private/v1/admin/borrowers/{id}": This endpoint returns all borrowers details. The borrowers Id is used to implement it. 

- POST "/api/private/v1/admin/borrowers": This endpoint is used to create a borrower 

- PUT "/api/private/v1/admin/borrowers/:borrowerId": This endpoint is used to update record of borrowed books by a borrower. Admin user access

- PUT "/api/private/v1/borrowers/:borrowerId": This endpoint is used to update record of borrowed books by a borrower. Borrower user access

- DELETE  "/api/private/v1/admin/borrowers/:borrowerId": This endpoint is used to delete a borrower. 

- DELETE  "/api/private/v1/admin/borrowers/:borrowerId/books/:bookId": This endpoint is used to delete a borrowered book from a borrowers record. Admin 

user access

- DELETE   "/api/private/v1/borrowers/:borrowerId/books/:bookId": This endpoint is used to delete a borrowered book from a borrowers record. Borrower user access
 
security mechanisms in use (cors)

## Getting Started

To run this web application on your local machine, follow the steps below:

### Prerequisites

Before getting started, ensure that you have the following software installed on your machine:

- Node.js, typescript, mongodb, aws cli

Before you start the application, you need to set up an environment variable to with the MongoURI within the express-backend directory. Here's how you can do it:

```bash

MONGO_URI="YOUR KEY"
ACCESS_TOKEN_SECRET="YOUR KEY"
JWT_SECRET="YOUR KEY"
```

Create a file called `.env` in express-backend folder of the project with the environmental variables above.

To run your test environment, create a file called  `.env.test` and input the code below in the file 

```bash

MONGO_URI="KEY FOR Test DB"
ACCESS_TOKEN_SECRET="YOUR KEY"
JWT_SECRET="YOUR KEY"

```

### Installation

Step-by-step guide on how to install the project and its dependencies.

1. Clone the repository to your local machine using Git:

```bash
git clone https://github.com/ayofalo/libman.git
```

2. Navigate to the project directory

```bash
cd libman

```

3. Install the project dependencies using NPM(Node Package Manager):

```bash
npm install
```

### Running the web application

Once you have installed the dependencies, build the application then you can start the web application using the command below


```bash
npm run build

npm run start

```

This should be done from the root directory 

### Running Tests

To run tests, ensure you have created your test .env file with the details mentioned above. Once successfully dont use the command below 
to run your test 

```bash
npm run test
```
### Serverless deployment

Used AWS Lambda and API Gateway for serverless deployment,

For serverless deployment, the express application was wrapped in serverless provided by the 'serverless-http' from npm.
To deploy the application using serverless framework follow the steps 

complete aws configuration use 

```bash

aws configure

```
add your serverless.yml file with the necessary configuration

To deploy to AWS lambda use the command below 

```bash

serverless deploy 

```


### API documentation

Access API documentation via Swagger UI using the link below after starting up the application

```
http://localhost:3001/api-docs/v1/

```
### Usage

- Troubleshooting
  If you encounter any issues or have questions, please feel free to reach out to us by creating an issue on our GitHub repository: https://github.com/ayofalo/libman/issues.

### License

This project is licensed under the MIT License.

### Authors

Contributors names and contact info

Ayo Falowo
```
