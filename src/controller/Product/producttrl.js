"use strict";
const productservice = require("../../service/productService");
var mongoose = require('mongoose');


async function addProduct(req, res) {
    let query = req.body;
    try {
        query.status = 1;
       let response = await productservice.addProduct(query);
        res.status(200).json({
            error_code: 0,
            message: "Success",
            data: response.data
        });

    } catch (err) {
        console.log(err)
        res.status(200).json({
            error_code: 11,
            message: err.message,
            data: err
        });
    }

}




async function getProductlist(req, res) {
    let query = req.body;
    try {
        let response = await productservice.getProductlist(query);
        res.status(200).json({
            error_code: 0,
            message: "Success",
            data: response.data
        });
    } catch (error) {
        console.log(error, "error");
        res.status(200).json(
            {
                error_code: 11,
                message: error.message,
                data: error
            }
        )
    }
}



module.exports = {
    addProduct, getProductlist,
}