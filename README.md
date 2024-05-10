# Creating REST API using Express

This project is a simple REST API built using Express. It provides endpoints for managing users including creating, reading, updating, and deleting user data. Additionally, it incorporates authentication features using sessions and Passport.js.

## Setup Instructions:

1. **Install Node.js**: If you haven't already, install Node.js from [nodejs.org](https://nodejs.org/).
   
2. **Fetch the GitHub Repository**: Clone or download the GitHub repository to your local machine.

3. **Install Dependencies**: Navigate to the project directory in your terminal and run the following command to install dependencies:
   ```
   npm install
   ```

4. **Start the Server**: Once the dependencies are installed, start the server using:
   ```
   npm start
   ```

## Endpoints:

- **GET /users** - Renders an HTML document.
- **GET /api/users** - Returns a list of all users in JSON format.
- **GET /api/users/:id** - Returns the user with the specified ID.
- **POST /api/users** - Creates a new user.
- **PATCH /api/users/:id** - Edits the user with the specified ID.
- **DELETE /api/users/:id** - Deletes the user with the specified ID.

## Authentication:

- **/auth/login** - Endpoint for user login.
- **/auth/register** - Endpoint for user registration.

## OAuth2 Integration:

- **/auth/discord/** - Endpoint for Discord redirection to sign in.
- **/auth/discord/redirect** - Endpoint for Discord redirection to sign in.

User passwords are encrypted using the bcrypt module to enhance security.

## Session Management:

Session management is employed to store user authentication data securely on the server-side rather than in cookies.

## Additional Features:

- **Mockaroo Integration**: Fake data is generated using Mockaroo for testing purposes.

## Testing:

Unit testing has been implemented for the Discord strategy and the endpoint - `auth/register` using Jest. Contributions to unit testing other functions are welcome.

Feel free to explore and contribute to this project. For any issues or suggestions, please open an issue on GitHub. 

## Resources:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mockaroo](https://www.mockaroo.com/)
- [Passport.js](http://www.passportjs.org/)