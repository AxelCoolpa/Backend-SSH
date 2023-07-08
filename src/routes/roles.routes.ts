import { Router } from "express";
import RolesController from "../controllers/Roles.comtollers";

export default class RolesRoutes {
   private router: Router;
   private rolesController: RolesController;

   constructor() {
      this.router = Router();
      this.rolesController = new RolesController();
      this.configureRoutes();
   }

   private configureRoutes() {
      /**
       * Obtener todos los roles
       * @swagger
       * /api/roles:
       *   get:
       *     tags:
       *       - Roles
       *     summary: Obtener todos los roles
       *     description: Obtiene una lista de todos los roles.
       *     responses:
       *       200:
       *         description: OK. Retorna la lista de roles.
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 $ref: '#/components/schemas/Role'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.get("/roles", this.rolesController.getAll);
      /**
       * Obtener un rol por su ID
       * @swagger
       * /api/roles/{idRole}:
       *   get:
       *     tags:
       *       - Roles
       *     summary: Obtener un rol por su ID
       *     description: Obtiene un rol específico por su ID.
       *     parameters:
       *       - name: idRole
       *         in: path
       *         description: ID del rol a obtener
       *         required: true
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: OK. Retorna el rol solicitado.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Role'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.get("/roles/:idRole", this.rolesController.getById);
      /**
       * Crear un nuevo rol
       * @swagger
       * /api/roles:
       *   post:
       *     tags:
       *       - Roles
       *     summary: Crear un nuevo rol
       *     description: Crea un nuevo rol con el nombre especificado.
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               roleName:
       *                 type: string
       *             required:
       *               - roleName
       *     responses:
       *       201:
       *         description: OK. El rol ha sido creado exitosamente.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Role'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.post("/roles", this.rolesController.create);
      /**
       * Actualizar rol
       * @swagger
       * /api/roles/{idRole}:
       *   put:
       *     tags:
       *       - Roles
       *     summary: Actualizar rol
       *     description: Actualiza un rol existente con el ID especificado.
       *     parameters:
       *       - in: path
       *         name: idRole
       *         description: ID del rol a actualizar
       *         required: true
       *         schema:
       *           type: string
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               name:
       *                 type: string
       *             required:
       *               - name
       *     responses:
       *       200:
       *         description: OK. El rol ha sido actualizado exitosamente.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Rol'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.put("/roles/:idRole", this.rolesController.update);
      /**
       * Eliminar rol
       * @swagger
       * /api/roles/{idRole}:
       *   delete:
       *     tags:
       *       - Roles
       *     summary: Eliminar rol
       *     description: Elimina un rol existente con el ID especificado.
       *     parameters:
       *       - in: path
       *         name: idRole
       *         description: ID del rol a eliminar
       *         required: true
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: OK. El rol ha sido eliminado exitosamente.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Rol'
       *       500:
       *         description: Error interno del servidor.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Error'
       */
      this.router.delete("/roles/:idRole", this.rolesController.delete);
   }

   public getRouter() {
      return this.router;
   }
}
