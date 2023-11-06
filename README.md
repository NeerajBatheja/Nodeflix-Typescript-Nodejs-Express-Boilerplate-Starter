# Nodeflix-starter



## Getting started

The Node.js TypeScript Express Boilerplate is a robust and extensible foundation for building web applications using Node.js, TypeScript, and the popular Express.js framework. This boilerplate provides a starting point for your web development projects, offering a well-structured directory layout, essential configurations, and best practices to help you get started quickly and efficiently.
# Node.js TypeScript Boilerplate

![Project Logo](https://miro.medium.com/v2/resize:fit:1000/1*MlzZLEJkVqShgg7xkv0uKA.png)
## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
## Introduction

Web development today demands speed, scalability, and maintainability. This boilerplate is designed to meet these requirements by leveraging the power of TypeScript to catch errors at compile time, Node.js for server-side execution, and Express.js to create robust and flexible RESTful APIs.

- **TypeScript:** Enjoy the benefits of static typing and error checking while writing JavaScript.
- **Express.js:** A powerful, minimal web application framework for Node.js that helps you build efficient and scalable web applications.
- **Well-Organized Structure:** A directory layout that encourages clean code and easy maintenance.
- **Configuration Management:** Easily manage environment-specific configurations and secrets.
- **Validators (Joi):** Utilize Joi for robust validation of incoming data, ensuring the integrity of your application's inputs.
- **Middleware:** Easily implement middleware to handle cross-cutting concerns such as authentication, logging, and more, streamlining your request processing.
- **Database Migration:** Manage your database schema changes effortlessly with built-in database migration support, keeping your application's data structure up-to-date.
- **Logging:** Integrated logging (winston) with options for customization.
- **Testing:** Setup for unit and integration testing using popular testing framework Jest.
- **Dependency Injection:** Dependency Injection: Leverage Inversify for robust and flexible Dependency Injection in your application.
- **Linting:** Pre-configured ESLint rules to maintain code quality.
- **Docker Support:** Easily containerize your application for deployment.
- **Error Handling:** A consistent and structured approach to handling errors.
- **Databases:** Boilerplate includes configurations for both PostgreSQL and Redis.
- **Messaging:** RabbitMQ integration for asynchronous message processing.


## Prerequisites

- **Node.js:** Make sure you have Node.js 18.15.0 installed on your machine. You can download it from nodejs.org.
- **Package Manager:** This project uses npm as the package manager, which comes bundled with Node.js.
- **IDE/Code Editor:** You can use any code editor of your choice. Visual Studio Code (VS Code) is recommended for a seamless development experience.
- **Docker (optional):** If you plan to use Docker for running RabbitMQ, Redis, and PostgreSQL, ensure it's installed. You can download it from Docker's official website.
- **RabbitMQ (optional):** To work with RabbitMQ, you can set up a RabbitMQ server locally or use Docker to run it in a container.
- **Redis (optional):** If you intend to use Redis, you can install it locally or use Docker to run a Redis server in a container.
- **PostgreSQL (optional):** If you need a PostgreSQL database, you can install it locally or use Docker to run a PostgreSQL server in a container.

## Getting Started

Explain how to get started with your project.

### Installation

Provide step-by-step installation instructions.

- Clone the repository:

```bash
 git clone git@artifactory.devcrud.uk:org/nodeflix-starter.git
```
- Install project dependencies:
```
 npm install
```
- Up the docker containers if Posgresql , Redis , RabbitMQ Required
```
 docker-compose up -d
```
### Configuration
- Create an environment variable file (.env) in the project's root directory and configure your environment variables based on the provided .env.example file.
- Perform any necessary database migrations. You can use the following scripts for database management:
 Generate a new migration:

```
 npm run db-create your-migration-name

```
Apply pending migrations:

```
 npm run db-up
```
Rollback the last applied migration:

```
 npm run db-down
```
## Running the Application
- Start the application:

```
 npm run dev
```
Or, if you prefer to use PM2 for process management:

```
 pm2 start ecosystem.config.js
```
## Testing
- Run Unit Tests with jest
```
 npm run test
```
## Contributing

We welcome contributions from the community to help improve this project. If you would like to contribute, please follow these guidelines:

1. **Fork** the repository on GitHub.
2. Create a **branch** for your work: `git checkout -b feature/my-new-feature`.
3. Make your changes and **commit** them with descriptive commit messages.
4. **Push** your changes to your fork: `git push origin feature/my-new-feature`.
5. Submit a **pull request** to the main repository

