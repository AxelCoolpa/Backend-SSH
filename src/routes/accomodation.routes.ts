import { Router } from "express";

import AccomodationController from "../controllers/Accomodation.controllers";
import { Multer } from "multer";
import MulterConfig from "../utils/config/multerConfig";

export default class ActivitiesRoutes {
   public router: Router;
   private accomodationController: AccomodationController;
   private upload: Multer;

   constructor() {
      this.router = Router();
      this.accomodationController = new AccomodationController();
      this.upload = new MulterConfig().getMulterConfig();

      this.configureRoutes();
   }

   private configureRoutes() {
      /**
       * @swagger
       * tags:
       *   name: accomodation
       *   description: Operaciones relacionadas con alojamientos
       * /api/accomodation:
       *   get:
       *     summary: Obtener todas las actividades
       *     description: Obtiene todas las actividades disponibles.
       *     tags: [accomodation]
       *     responses:
       *       200:
       *         description: Retorna un arreglo de alojamientos.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Accomodations'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.get("/accomodation", this.accomodationController.getAccomodations);

     /**
 * @swagger
 * tags:
 *   name: accomodation
 *   description: Operaciones relacionadas con actividades
 * /api/accomodation/{id}:
 *   get:
 *     summary: Obtener alojamiento por ID
 *     description: Obtiene una alojamiento específico según su ID.
 *     tags: [accomodation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del alojamiento a obtener.
 *     responses:
 *       200:
 *         description: Retorna el alojamiento correspondiente al ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accomodation'
 *       404:
 *         description: EL alojamiento no fue encontrado.
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
   "/accomodation/:idAccomodation",
   this.accomodationController.getAccomodationById
 );
 
      /**
       * @swagger
       * tags:
       *   name: accomodation
       *   description: Operaciones relacionadas con alojamientos
       * /api/accomodation/{idUser}/create:
       *   post:
       *     summary: Crear un nuevo alojamiento
       *     description: Crea un nuevo alojamiento
       *     tags: [accomodation]
       *     parameters:
       *       - in: path
       *         name: idUser
       *         required: true
       *         schema:
       *           type: string
       *         description: ID del usuario propietario del alojamiento.
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/CreateAccomodationRequestBody'
       *     responses:
       *       200:
       *         description: Retorna el nuevo alojamiento creado.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Accomodation'
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

      this.router.post('/accomodation/:idUser/create/', this.upload.any(), this.accomodationController.createAccomodation)

     /**
 * @swagger
 * /api/accomodation/:idAccomodation:
 *   post:
 *     summary: Eliminar un alojamiento
 *     description: Elimina un alojamiento por id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteAccomodationRequestBody'
 *     responses:
 *       200:
 *         description: elimina el alojamiento 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accomodation'
 *     
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

     this.router.delete(
        "/accomodation/:idAccomodation",
        this.accomodationController.deleteController
     );

   /**
 * @swagger
 * /accomodation/{idUser}/update/{idAccomodation}:
 *   put:
 *     summary: Actualizar alojamiento
 *     tags: [Accomodation]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idAccomoation
 *         required: true
 *         description: ID del alojamiento
 *         schema:
 *           type: string
 *       - in: formData
 *         name: AccomodationObject
 *         required: true
 *         description: Accomodation object
 *         schema:
 *           $ref: '#/components/schemas/Accomodation'
 *       - in: formData
 *         name: img
 *         required: false
 *         description: Images of the Accomodation
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Accomodation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accomodation'
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
     this.router.put( "/accomodation/:idUser/update/:idAccomodation", this.upload.any(), this.accomodationController.updateAccomodation );
      this.router.get('')
   
   }

   public getRouter() {
      return this.router;
   }
}
