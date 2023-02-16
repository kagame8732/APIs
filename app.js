const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const db = require("./db/db");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      blogSchema:
 *        type: object
 *        properties:
 *          image:
 *            type: string
 *          title:
 *            type: string
 *          description:
 *            type: string
 *      contactSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          message:
 *            type: string
 *      loginSchema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      signupSchema:
 *        type: object
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      commentSchema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            message:
 *              type: string
 */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API Documentation",
      version: "1.0.0",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./app.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Post a Blog
/**
 * @swagger
 * /blogs:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: To add blog
 *    description: Used to add blog
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/blogSchema"
 *    responses:
 *      200:
 *          description: Blog added successfully
 */

//Get all Blog
/**
 * @swagger
 * /blogs:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */

//Get one Blog

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */
/**
 * @swagger
 * /blogs/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Used for editing blog
 *    description: This API is used to edit a blog
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/blogSchema"
 *    responses:
 *      200:
 *          description: Blog updated successfully
 */
//Delete Blog

/**
 * @swagger
 * /blogs/{id}:
 *  delete:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Data deleted successfully
 */

/**
 * @swagger
 * /blogs/comments/{id}:
 *  post:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/commentSchema"
 *    responses:
 *      200:
 *          description: comment addeed successfully
 */

/**
 * @swagger
 * /blogs/comments/{id}:
 *  get:
 *      summary: This API is used to check if get method on comments is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * /blogs/likes/{id}:
 *  post:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    responses:
 *      200:
 *          description: like addeed successfully
 */

/**
 * @swagger
 * /blogs/likes/{id}:
 *  get:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    responses:
 *      200:
 *          description: like addeed successfully
 */

//Add message
/**
 * @swagger
 * /contacts:
 *  post:
 *    summary: To add Message
 *    description: Used to add message
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/contactSchema"
 *    responses:
 *      200:
 *          description: Message added successfully
 */

//Get all messages

/**
 * @swagger
 * /contacts:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * /contacts/{id}:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */
/**
 * @swagger
 * /contacts/{id}:
 *  delete:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Data deleted successfully
 */

//login for a user
/**
 * @swagger
 * /login:
 *  post:
 *    summary: To enter verified user
 *    description: Used for authorized users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/loginSchema"
 *    responses:
 *      200:
 *          description: User logged in
 */

//register for a new user
/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Register for a new user
 *    description: Used to register a new users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/signupSchema"
 *    responses:
 *      200:
 *          description: User registered successfully
 */

//Get a list of users

/**
 * @swagger
 * /signup:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */

//Get one user
/**
 * @swagger
 * /signup/{id}:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */
//Delete Blog

/**
 * @swagger
 * /signup/{id}:
 *  delete:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Data deleted successfully
 */

app.use(express.json());
app.use("/api", routes);
const PORT = 5000;
mongoose.connect(db.dbUrl).then(() => {
  app.listen(PORT, () => {
    console.log("Server in running on port 5000...");
  });
});

module.exports = app;
