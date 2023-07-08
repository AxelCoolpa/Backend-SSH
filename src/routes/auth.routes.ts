import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers";
import Auth0Controller from "../controllers/Auth0.controller";

export default class AuthRoutes {
   public router: Router;
   private authControllers: AuthControllers;
   private auth0Controller: Auth0Controller

   constructor() {
      this.router = Router();
      this.authControllers = new AuthControllers();
      this.auth0Controller = new Auth0Controller();
      this.configureRoutes();
   }

   private configureRoutes() {
      /**
       * Sign Up
       * @swagger
       * /api/signUp:
       *   post:
       *     tags:
       *       - Authentication
       *     summary: Sign Up
       *     description: Create a new user
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               email:
       *                 type: string
       *               username:
       *                 type: string
       *               password:
       *                 type: string
       *               confirPassword:
       *                 type: string
       *             required:
       *               - email
       *               - username
       *               - password
       *               
       *     responses:
       *       201:
       *         description: OK. El Usuario ha sido registrado exitosamente.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/UserResponse'
       *       400:
       *         description: Bad request
       */
      
      this.router.post("/signUp", this.authControllers.signUp);
      /**
       * Sign In
       * @swagger
       * /api/signIn:
       *   post:
       *     tags:
       *       - Authentication
       *     summary: Sign In
       *     description: Sign in to obtain JWT token
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               email:
       *                 type: string
       *               password:
       *                 type: string
       *             required:
       *               - email
       *               - password
       *     responses:
       *       200:
       *         description: Sign In successful, returns JWT token
       *       400:
       *         description: Bad request
       *       401:
       *         description: Unauthorized
       */
      
      this.router.post("/signIn", this.authControllers.signIn);
      /**
       * Registrar administrador
       * @swagger
       * /api/registerAdmin:
       *   post:
       *     tags:
       *       - Administrador
       *     summary: Registrar administrador
       *     description: Registra un nuevo administrador con las credenciales proporcionadas.
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               email:
       *                 type: string
       *               username:
       *                 type: string
       *               password:
       *                 type: string
       *               confirPassword:
       *                 type: string
       *             required:
       *               - email
       *               - username
       *               - password
       *               - confirPassword
       *     responses:
       *       201:
       *         description: OK. El administrador ha sido registrado exitosamente.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/UserResponse'
       *       400:
       *         description: Error de solicitud.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */

      this.router.post("/registerAdmin", this.authControllers.registerAdmin);
      /**
       * Update User Credentials
       * @swagger
       * /api/update/{idUser}/credentials:
       *   put:
       *     tags:
       *       - Authentication
       *     summary: Update User Credentials
       *     description: Update the credentials (e.g., username, password) of a user
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: idUser
       *         schema:
       *           type: string
       *         required: true
       *         description: ID of the user
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/User'
       *     responses:
       *       200:
       *         description: User credentials updated successfully
       *       400:
       *         description: Bad request
       *       401:
       *         description: Unauthorized
       *       404:
       *         description: User not found
       *       500:
       *         description: Internal Server Error
       */

      this.router.put(
         "/changeCredencial",
         this.authControllers.updateCredentials
      );

      this.router.get("/login",this.auth0Controller.login)
   }

   public getRoutes() {
      return this.router;
   }
}
