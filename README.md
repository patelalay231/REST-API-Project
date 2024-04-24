# Creating REST API using Express

This repository contains code for creating a REST API using Express. Follow the steps below to set up the project:

### Setup Steps

1. **Install Node.js**: If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Fetch the GitHub Repository**: Clone or download this GitHub repository to your local machine.

    ```bash
    git clone https://github.com/patelalay231/REST-API-Project.git
    ```

3. **Install npm Dependencies**: Navigate to the project directory and install the required npm dependencies.

    ```bash
    cd BreadcrumbsREST-API-Project
    npm install
    ```

4. **Start the Server**: Once all dependencies are installed, start the server.

    ```bash
    npm start
    ```

### Available Endpoints

- `GET /users`: Renders an HTML document. (Done)
- `GET /api/users`: Retrieves a list of all users in JSON format. (Done)
- `GET /api/users/:id`: Retrieves the user with the specified ID.
- `POST /api/users`: Creates a new user.
- `PATCH /api/users/:id`: Edits the user with the specified ID.
- `DELETE /api/users/:id`: Deletes the user with the specified ID.

### Dynamic Path Routes

- `GET /api/users/:id`: Retrieves the user with the specified ID. (Done)

### Additional Information

- For generating fake data, I am using [Mockaroo](https://www.mockaroo.com/). This allows us to generate realistic test data for our application.

---

Feel free to reach out with any questions or suggestions. Happy coding! 😊
