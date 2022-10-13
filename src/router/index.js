var express = require('express');
var router = express.Router(); //for routing or can use directly from express

//category
let categoryRouter = require("../router/categoryRouter");
router.use(categoryRouter);


module.exports = router



