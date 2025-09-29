"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
//Ruta para crear un nuevo usuario
userRouter.post("/", userController_1.createUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map