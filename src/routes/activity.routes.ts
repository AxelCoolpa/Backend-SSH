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
       *               $ref: '#/components/schemas/Activity'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
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
       *               $ref: '#/components/schemas/ErrorMessage'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
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
       *             $ref: '#/components/schemas/ActivityRequestBody'
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
       *               $ref: '#/components/schemas/ErrorMessage'
       *       404:
       *         description: El destino o el usuario no fueron encontrados.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/ErrorMessage'
       */

      this.router.post(
         "/activity/:idUser/create/",
         this.upload.any(),
         this.activitiesController.createActivity
      );

      /**
       * @swagger
       * tags:
       *   name: activity
       *   description: Operaciones relacionadas con actividades
       * /api/activities:
       *   post:
       *     summary: Filtrar actividades
       *     description: Filtra las actividades segun los datos que ingresa el usuario
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/CreateActivityRequestBody'
       *     responses:
       *       200:
       *         description: Retorna la actividad filtrada
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Activity'
       *
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */

      this.router.post(
         "/activity/filter",
         this.activitiesController.filterActivity
      );

      /**
       * @swagger
       * /api/activity/{idUser}/update/{idActivity}:
       *   put:
       *     summary: Update a activity
       *     tags: [activity]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         description: ID of the user
       *         schema:
       *           type: string
       *       - in: path
       *         name: idActivity
       *         required: true
       *         description: ID of the activity
       *         schema:
       *           type: string
       *       - in: formData
       *         name: ActivityObject
       *         required: true
       *         description: Activity object
       *         schema:
       *           $ref: '#/components/schemas/ActivityRequestBody'
       *       - in: formData
       *         name: img
       *         required: false
       *         description: Images of the Activity
       *         schema:
       *           type: array
       *           items:
       *             type: string
       *             format: binary
       *     responses:
       *       200:
       *         description: Activity updated successfully
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Activity'
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
         "/activity/:idUser/update/:idActivity",
         this.upload.any(),
         this.activitiesController.updateActivity
      );
      /**
 * @swagger
 * /api/activity/{idActivity}:
 *   delete:
 *     summary: Elimina una actividad por su ID.
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la actividad a eliminar.
 *     responses:
 *       200:
 *         description: Actividad eliminada exitosamente.
 *       400:
 *         description: Error al eliminar la actividad.
 *       500:
 *         description: Error interno del servidor.
 */

      this.router.delete("/activity/:idActivity", this.activitiesController.deleteActivity);
   }

   public getRouter() {
      return this.router;
   }
}
