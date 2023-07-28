const categoryController = require("../controllers/category_controller");
const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.getAll);
router.get("/category/:id", categoryController.getById);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

module.exports = router;