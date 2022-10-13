var express = require('express')
var router = express.Router(); //for routing or can use directly from express

let categoryCtrl = require("../controller/category/categoryCntrol");
let productCtrl = require("../controller/Product/producttrl");

router.post("/categoryAdd",  categoryCtrl.addCategory);
router.post("/categoryList", categoryCtrl.getCategoryList);

router.post("/getAlldata", categoryCtrl.getAllData);

router.post("/productsAdd",  productCtrl.addProduct);
router.post("/productsList", productCtrl.getProductlist);

module.exports = router;

