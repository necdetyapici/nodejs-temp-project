const express = require("express");
const userRoutes = require("./modules/user/user.routes");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./modules/auth/auth.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

module.exports = app;
