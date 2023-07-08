import { Router } from "express";

import ActivitiesController from "../controllers/Activity.controllers";
import { Multer } from "multer";
import MulterConfig from "../utils/config/multerConfig";

export default class ActivitiesRoutes {
   public router: Router;
   private activitiesController: ActivitiesController;
   private upload: Multer;

   constructor() {
      this.router = Router();
      this.activitiesController = new ActivitiesController();
      this.upload = new MulterConfig().getMulterConfig();

      this.configureRoutes();
   }

   private configureRoutes() {
      /**
       * @swagger
       * tags:
       *   name: activity
       *   description: Operaciones relacionadas con actividades
       * /api/activities:
       *   get:
       *     summary: Obtener todas las actividades
       *     description: Obtiene todas las actividades disponibles.
       *     tags: [activity]
       *     responses:
       *       200:
       *         description: Retorna un arreglo de actividades.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Activities'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.get("/activities", this.activitiesController.getActivities);

     /**
 * @swagger
 * tags:
 *   name: activity
 *   description: Operaciones relacionadas con actividades
 * /api/activity/{id}:
 *   get:
 *     summary: Obtener actividad por ID
 *     description: Obtiene una actividad específica según su ID.
 *     tags: [activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la actividad a obtener.
 *     responses:
 *       200:
 *         description: Retorna la actividad correspondiente al ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: La actividad no fue encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageError'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
this.router.get(
   "/activity/:idActivity",
   this.activitiesController.getActivityById
 );
 
      /**
       * @swagger
       * tags:
       *   name: activity
       *   description: Operaciones relacionadas con actividades
       * /api/activity/{idUser}/create:
       *   post:
       *     summary: Crear una nueva actividad
       *     description: Crea una nueva actividad.
       *     tags: [activity]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         schema:
       *           type: string
       *         description: ID del usuario propietario de la actividad.
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/CreateActivityRequestBody'
       *     responses:
       *       200:
       *         description: Retorna la nueva actividad creada.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Activity'
       *       403:
       *         description: No tienes permisos de proveedor o administrador.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/MessageError'
       *       404:
       *         description: El destino o el usuario no fueron encontrados.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/MessageError'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */

      this.router.post(
         "/activity/:idUser/create/",
         this.upload.any(),
         this.activitiesController.createActivity
      );
      this.router.get("");
   }

   public getRouter() {
      return this.router;
   }
}
