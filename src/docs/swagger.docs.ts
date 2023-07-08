import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import config from "../utils/config/config";

const swaggerDefinition = {
   openapi: "3.0.0",
   info: {
      version: "1.0.0",
      title: "My API",
      description: "This is a sample API",
   },
   servers: [
      {
         url: config.baseURL,
      },
      
   ],
   tags: [
      {
         name: "Users",
         description: "Operations about users",
      },
      {
         name: "Authentication",
         description: "Operations about authentication",
      },
      {
         name: "Roles",
         description: "Operations about destino",
      },
   ],
   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
      schemas: {
         UserRequest: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  required: true,
                  description: "User's username",
               },
               password: {
                  type: "string",
                  required: true,
                  description: "User's password",
               },
               coinfirPassword: {
                  type: "string",
                  required: true,
                  description: "User's password",
               },
               email: {
                  type: "string",
                  required: true,
                  description: "User's email",
               },
              
            },
         },
         UserResponse: {
            type: "object",
            properties: {
               username: {
                  type: "string",
                  required: true,
                  description: "User's username",
               },              
               email: {
                  type: "string",
                  required: true,
                  description: "User's email",
               },
               firstName: {
                  type: "string",
                  required: true,
                  description: "Profile's name",
               },
               lastname: {
                  type: "string",
                  required: true,
                  description: "Profile's lastname",
               },
               avatar: {
                  type: "string",
                  required: true,
                  description: "Profile's avatar",
               },
               location: {
                  type: "string",
                  required: true,
                  description: "Profile's location",
               },

               description: {
                  type: "string",
                  required: false,
                  description: "Profile's description",
               },
               tlf: {
                  type: "string",
                  required: true,
                  description: "Profile's tlf",
               },
               DNI: {
                  type: "string",
                  required: true,
                  description: "Profile's DNI",
               },
              
            },
         },
         Role: {
            type: "object",
            properties: {
               roleName: {
                  type: "string",
                  required: true,
               },
            },
         },       
         Provider: {
            type: "object",
            properties: {
               companyName: {
                  type: "string",
                  required: true,
               },
               companyRepresentative: {
                  type: "string",
                  required: true,
               },
               companyAddress: {
                  type: "string",
                  required: true,
               },
               companyPhone: {
                  type: "string",
                  required: true,
               },
               companyEmail: {
                  type: "string",
                  required: true,
               },
               relatedChannel: {
                  type: "string",
                  required: true,
               },
               descriptionBusiness: {
                  type: "string",
                  required: true,
               },
               isRegistered: {
                  type: "boolean",
                  required: true,
               },
            },
         },
         Destination: {
            type: "object",
            properties: {
               title: {
                  type: String,
                  required: true,
               },
               description: {
                  type: String,
                  required: true,
               },              
               categories: {
                  type: Array,
                  required: true,
                  items: {
                     type: String,
                     required: true,
                  },
               },
               location: {
                  type: String,
                  required: true,
               },               
              
            },
         },
         ErrorMessage: {
            type: "object",
            properties: {
               Message: {
                  type: String,
               },
            },
         },
      },
   },
};

const swaggerOptions = {
   definition: swaggerDefinition,
   apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
