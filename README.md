# COOL-Backend

# arquitectura

## Quick start

```
.
\---src

|    +---controllers
|    |       auth.controllers.ts
|    |       Auth0.controller.ts
|    |       Profile.controllers.ts
|    |       Provider.controllers.ts
|    |       Roles.comtollers.ts
|    |       Users.controllers.ts
|    |       
|    +---database
|    |   +---manager
|    |   |       ManagerDB.ts
|    |   |       ManagerProfile.ts
|    |   |       ManagerProvider.ts
|    |   |       ManagerRoles.ts
|    |   |       ManagerUsers.ts
|    |   |       
|    |   \---models
|    |           Destinos.ts
|    |           Profile.ts
|    |           ProfileProvider.ts
|    |           Role.ts
|    |           User.ts|
|    |           
|    +---docs
|    |       swagger.docs.ts
|    |       
|    +---routes
|    |       auth.routes.ts
|    |       provider.routes.ts
|    |       prubea.routes.ts
|    |       roles.routes.ts
|    |       user.routes.ts
|    |       
|    +---services
|    |       services.ts
|    |       
|    +---test
|    |       app.test.ts
|    |       
|    \---utils
|    |   |   passwordHash.ts
|    |   |   
|    |   +---config
|    |   |       config.ts
|    |   |       
|    |   +---errors
|    |   |       messageError.ts
|    |   |       
|    |   +---interfaces
|    |   |       CRUD.Interfaces.ts
|    |   |       Destinos.Interfaces.ts
|    |   |       Pofile.Interfaces.ts
|    |   |       ProfileProvider.interces.ts
|    |   |       Roles.Interfaces.ts
|    |   |       User.Interfaces.ts
|    |   |       
|    |   \---middleware
|    |           passport.ts
|    |           passportAuth0.ts
|    |   app.ts
|    |   database.ts
|    |   index.ts
|    |   server.ts
|       
|
|----.gitignore
|----jest.config.ts
|----package.json
|----tsconfig.json 
```
