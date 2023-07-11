import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import config from "../utils/config/config";
import { ObjectId } from "mongoose";

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
                  type: "string",
                  required: true
               },
               description: {
                  type: "string",
                  required: true
               },
               categories: {
                  type: "array",
                  required: true,
                  items: {
                     type: "string",
                     required: true
                  }
               },
               location: {
                  type: "string",
                  required: true
               }
            }
         },
         
         Activity: {
            type: "object",
            properties: {
               title: { type: "string" },
               description: { type: "string" },
               location: { type: "string" },
               galleryImage: {
                  type: "array",
                  items: {
                     type: "string",
                  },
               },
               videoLink: { type: "string" },
               category: {
                  type: "array",
                  items: { type: "string" },
               },
               starterPack: {
                  type: "array",
                  items: { type: "string" },
               },
               startTime: { type: "string" },
               endTime: { type: "string" },
               maxPeople: { type: "integer" },
               groupPrice: { type: "string" },
               individualPrice: { type: "string" },
               rating: { type: "number" },
               reviews: { type: "string" },
               providerId: { type: "ObjectId",  $ref: "UserResponse" },
               isDeleted: { type: "boolean" },
            },
         },
         
         ActivityRequestBody: {
            type: "object",
            properties: {
               title: { type: "string" },
               description: { type: "string" },
               location: { type: "string" },
               galleryImage: {
                  type: "array",
                  items: {
                     type: "string",
                  },
               },
               videoLink: { type: "string" },
               category: { type: "array", items: { type: "string" } },
               starterPack: { type: "array", items: { type: "string" } },
               startTime: { type: "string" },
               endTime: { type: "string" },
               maxPeople: { type: "number" },
               groupPrice: { type: "string" },
               individualPrice: { type: "string" },
            },
         },
         
         ErrorMessage: {
            type: "object",
            properties: {
               Message: {
                  type: "string",
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
