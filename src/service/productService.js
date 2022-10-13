"use strict";
const Products = require("../model").Product;
var mongoose = require('mongoose');

const response = (error_code, message, data) => {
    return {
        error_code: error_code,
        message: message,
        data: data
    }
}


async function addProduct(querys) {
    let query = JSON.parse(JSON.stringify(querys));
    console.log("add addProduct Service", query);

    try {
        let ProductsNew = new Products();
        for (let prop in query) {
            if (query.hasOwnProperty(prop)) {
                ProductsNew[prop] = query[prop];
            }
        }
        if (ProductsNew.name) {
            // save datas in product table
            let data = await ProductsNew.save();
            return response(0, "Succes", data);
        }
        else {
            throw response(-11, "Error", {});
        }
    } catch (err) {
        throw response(-11, err.message, {});
    }
}



async function getProductlist(query) {
    console.log("add getProductlist Service", query);

    let newquery = {};
    for (let key in query) {
        if (query.hasOwnProperty(key)) {
            if (typeof query[key] !== "object") {
                newquery[key] = query[key];
            }
        }
    }
    if (query._id) {
        let _id = mongoose.Types.ObjectId(query._id);
        newquery._id = _id;
    }



    try {
        console.log("newquery", newquery);
        var data = await Products.find(newquery).sort({ 'name': -1 }).limit(30);
        return response(0, "Success", data);
    } catch (err) {
        console.log("err", err);
        let err_response = response(
            -11,
            "Error",
            "");
        throw response(-11, "Error", err_response);
    }

}









module.exports = {
    addProduct, getProductlist,
};

