# Backend Service - Express.js

### Connecting to the database
- Use `database.js` file to connect to the database
- follow the examples of the existing controllers and models

### API Endpoints
- when creating endpoints utilize `app.use(...)` within the `index.js` file to handle specified routes
- following this any routes in their respective controllers will be prefixed with the given route
- View implementation of `customerController.js` & `index.js` for reference
- **NOTE:** must use the `router.*` in any controller files, `app.*` should only be used within `index.js`
