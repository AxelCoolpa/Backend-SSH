import { Router } from "express";
import DestinationsController from "../controllers/Destinations.Controllers";
import { Multer } from "multer";
import MulterConfig from "../utils/config/multerConfig";

export default class DestinationsRoutes {
   public router: Router;
   private destinationsControllers: DestinationsController;
   private upload: Multer;

   constructor() {
      this.router = Router();
      this.destinationsControllers = new DestinationsController();
      this.upload = new MulterConfig().getMulterConfig();
      this.routesConfiger();
   }

   private routesConfiger(): void {
      /**
       * @swagger
       * tags:
       *   name: Destinations
       *   description: Destination operations
       *
       * /api/destinations:
       *   get:
       *     summary: Get all destinations
       *     tags: [Destinations]
       *     responses:
       *       200:
       *         description: Successful operation
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 $ref: '#/components/schemas/Destination'
       *       500:
       *         description: Internal server error
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       */

      this.router.get("/destinations", this.destinationsControllers.getAll);
      /**
       * @swagger
       * tags:
       *   name: Destinations
       *   description: Destination operations
       *
       * /api/destinations/{id}:
       *   get:
       *     summary: Get a destination by ID
       *     tags: [Destinations]
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         description: ID of the destination
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: Successful operation
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Destination'
       *       404:
       *         description: Destination not found
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

      this.router.get(
         "/destination/:idDestination",
         this.destinationsControllers.getById
      );
      /**
       * @swagger
       * /destination/{idUser}/create:
       *   post:
       *     summary: Create a new destination
       *     tags: [Destinations]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         description: ID of the user
       *         schema:
       *           type: string
       *       - in: formData
       *         name: destinationObjet
       *         required: true
       *         description: Destination object
       *         schema:
       *           $ref: '#/components/schemas/Destination'
       *       - in: formData
       *         name: img
       *         required: false
       *         description: Images of the destination
       *         schema:
       *           type: array
       *           items:
       *             type: string
       *             format: binary
       *     responses:
       *       201:
       *         description: Destination created successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Destination'
       *       400:
       *         description: Invalid destination data
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
         "/destination/:idUser/create",
         
         this.destinationsControllers.createController
      );
      /**
 * @swagger
 * /destination/{idUser}/update/{idDestination}:
 *   put:
 *     summary: Update a destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idDestination
 *         required: true
 *         description: ID of the destination
 *         schema:
 *           type: string
 *       - in: formData
 *         name: destinationObjet
 *         required: true
 *         description: Destination object
 *         schema:
 *           $ref: '#/components/schemas/Destination'
 *       - in: formData
 *         name: img
 *         required: false
 *         description: Images of the destination
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destination'
 *       400:
 *         description: Invalid destination data
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
      this.router.put(
         "/destination/:idUser/update/:idDestination",
         this.upload.any(),
         this.destinationsControllers.updateController
      );

      this.router.delete(
         "/destination/:idDestination",
         this.destinationsControllers.deleteController
      );
   }

   public getRouter(): Router {
      return this.router;
   }
}
