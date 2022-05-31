const express = require('express');
const path = require("path");

const router = express.Router();

// Controllers
const productContAPI = require("../controllers/productControllerAPI");

// Routes
router.get("/products/", productContAPI.productsCount);
router.get("/products/page/:id", productContAPI.productsCountPages);
router.get("/products/:id", productContAPI.productArray);
router.get("/products/image/:id", productContAPI.productImage);
module.exports = router;