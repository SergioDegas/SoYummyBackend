# Application - So Yummy

Always appears a question "What to cook?" or "How to cook this dish?"?. So Ypu need to look at this application it is not only an app where You can find cool recipes from all over the World, it is Your best saved cookbook. You can add your own recipes to store them for the future use.

## So Yummy - Back-end

- [Link to docs](https://backend-x5bd.onrender.com/api-docs/)
- [Link to repository](https://github.com/SergioDegas/SoYummyBackend)

The back-end part of the app is built using capabilities of Node.js. The API server developed with use of Express (create endpoints and authorization of the app), Cloudinary (save files/avatar), MongoDB (store information about user and all recipes) with library Mongoose. The back-end supports all necessary operations with recipes collection as well as user registration, login and update using JWT.

## Used technologies:

- Node.js
- Express
- Mongoose
- Joi
- Jsonwebtoken
- Multer
- Yup

The API docs created using [Swagger](https://swagger.io)

## Installation and launch of the project

1. Clone the repository: `git clone https://github.com/SergioDegas/SoYummyBackend`
2. Make sure you have an LTS version of Node.js installed on your computer. [Download and install](https://nodejs.org/en/) if needed.
3. Install the project's base dependencies with the `npm install` command.
4. Scripts: `npm start` - server start in production mode
          `npm run start:dev` - server start in development mode
          `npm run lint` - run an eslint code check
          `lint:fix` - eslint code check with automatic fix for simple errors

Server is deployed using [Render.com](https://render.com)

## So Yummy - Front-end

- [Link to site](https://cookbook-so-yummy.netlify.app/)
- [Link to repository](https://github.com/SergioDegas/SoYummy)

This application saves Your time for finding exact recipe and providing the possibility to learn how to cook and become a Chef






