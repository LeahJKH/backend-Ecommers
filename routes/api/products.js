//imports
const path = require("path");
const express = require("express");
const router = express.Router();
//internal imports
const productController = require("../../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

// router.route("/:id").get(userController.getSingleUser);

module.exports = router;
