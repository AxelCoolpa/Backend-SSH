import { Router } from "express";
import UserController from "../controllers/Users.controllers";

import ProfileProviderController from "../controllers/Provider.controllers";
import MulterConfig from "../utils/config/multerConfig";
import { Multer } from "multer";

export default class UserRoutes {
   private router: Router;
   private userController: UserController;
   private provediderController: ProfileProviderController;

   private upload: Multer;

   constructor() {
      this.router = Router();
      this.userController = new UserController();
      this.provediderController = new ProfileProviderController();

      this.upload = new MulterConfig().getMulterConfig();

      this.configureRoutes();
   }

   private configureRoutes(): void {
      /**
       * Get all users
       * @swagger
       * /api/users:
       *   get:
       *     tags:
       *       - Users
       *     summary: Get all users
       *     description: Retrieves a list of all users
       *     responses:
       *       200:
       *         description: OK
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 $ref: '#/components/schemas/UserResponse'
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message
       */

      this.router.get("/users", this.userController.getAll);
      /**
       * @swagger
       * tags:
       *   name: Users
       *   description: User operations
       *
       * /api/user/{idUser}:
       *   get:
       *     summary: Get user by ID
       *     tags: [Users]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         description: ID of the user
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: User found successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/UserResponse'
       *       404:
       *         description: User not found
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       */

      this.router.get("/user/:idUser", this.userController.getById);
            
      /**
       * Update user profile
       * @swagger
       * /api/user/{idUser}/profile:
       *   put:
       *     tags:
       *       - Users
       *     summary: Update user profile
       *     description: Updates the profile of a specific user
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
       *             $ref: '#/components/schemas/UserResponse'
       *     responses:
       *       200:
       *         description: Profile updated successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/UserResponse'
       *       400:
       *         description: Bad request
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 error:
       *                   type: string
       *                   description: Error message
       */

      this.router.put("/user/:idUser/profile", this.upload.any() ,this.userController.completeProfile);
      /**
       * Delete a user
       * @swagger
       * /api/user/{idUser}:
       *   delete:
       *     tags:
       *       - Users
       *     summary: Delete a user
       *     description: Deletes a specific user by ID
       *     parameters:
       *       - in: path
       *         name: idUser
       *         schema:
       *           type: string
       *         required: true
       *         description: ID of the user to delete
       *     responses:
       *       200:
       *         description: User deleted successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/User'
       *       404:
       *         description: User not found
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message:
       *                   type: string
       *                   description: Error message
       */

      this.router.delete("/user/:idUser/", this.userController.delete);

      /**
       * @swagger
       * tags:
       *   name: Provider
       *   description: Provider operations
       *
       * /api/user/{idUser}/profileProvider:
       *   post:
       *     summary: Create a new provider profile
       *     tags: [Provider]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         description: ID of the user
       *         schema:
       *           type: string
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/Provider'
       *     responses:
       *       201:
       *         description: Provider profile created successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Provider'
       *       400:
       *         description: Invalid provider profile data
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       */

      this.router.post(
         "/user/:idUser/profileProvider/",
         this.provediderController.createProvider
      );
   }

   public getRouter(): Router {
      return this.router;
   }
}
