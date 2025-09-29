"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dishController_1 = require("../controllers/dishController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const dishRouter = (0, express_1.Router)();
//Ruta para crear el plato
dishRouter.post("/", authMiddleware_1.authMiddleware, dishController_1.createDish);
//Ruta para obtener todos los platos de la base de datos
dishRouter.get("/", authMiddleware_1.authMiddleware, dishController_1.getUserDishes);
//Ruta para actualizar un plato
dishRouter.put("/:id", authMiddleware_1.authMiddleware, dishController_1.updateDish);
//Ruta para eliminar el plato 
dishRouter.delete("/:id", authMiddleware_1.authMiddleware, dishController_1.removeDish);
exports.default = dishRouter;
//# sourceMappingURL=dishRouter.js.map