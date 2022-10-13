"use strict";
const Category = require("../model").Category;
var mongoose = require('mongoose');
const Products = require("../model").Product;


const response = (error_code, message, data) => {
    return {
        error_code: error_code,
        message: message,
        data: data
    }
}

async function addCategory(query) {
    console.log("add Category Service", query);

    try {
        let CategoryNew = new Category();
        for (let prop in query) {
            if (query.hasOwnProperty(prop)) {
                CategoryNew[prop] = query[prop];
            }
        }
        if (CategoryNew.name) {
            let data = await CategoryNew.save();
            return response(0, "SUCCESS", data);
        }

    } catch (err) {
        console.log(err, "service error")
        throw response(-11, err.message, {});
    }


}







async function getCategoryList(query) {
    console.log("enter getCategoryList service", query);
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
        var data = await Category.find(newquery).sort({ 'name': -1 }).limit(30).populate('parent_id');

        return response(0, "COMPLETED", data);
    } catch (err) {
        console.log(err, "service error")
        let err_response = response(
            -11,
            "ERROR",
            "");
        throw response(-11, "ERROR", err_response);
    }

}


async function getAllData(query) {
    console.log("enter getAllData service", query);
    try {
        let arry = await Category.find(query);
        let catogoryArray = [];

        let categoryIds = [];
        if (arry.length > 0) {
            for (let item of arry) {
                categoryIds.push(
                    item._id
                );
                let count = await Products.find({ category: item._id }).count();
                // if(count){
                    catogoryArray.push(
                        {
                            _id: item._id,
                            name: item.name,
                            count: count
                        }
                    )
                // }
            }
        }
        console.log("catogoryArray", catogoryArray);
        console.log("categoryIds", categoryIds);




        let productArray = [];
        let productCounts;

        if (categoryIds.length > 0) {
            let newquery = {};
            newquery.status = 1;
            newquery.$or = [{ category: { $in: categoryIds } }];
            productArray = await Products.find(newquery);
            productCounts = await Products.find(newquery).count();

        }

        console.log("productArray", productArray);

        let data = {
            productArray: productArray,
            catogoryArray: catogoryArray,
            productCounts: productCounts,
        }
        return response(0, "COMPLETED", data);
    } catch (err) {
        console.log(err, "service error")
        let err_response = response(
            -11,
            "ERROR",
            "");
        throw response(-11, "ERROR", err_response);
    }

}

module.exports = {
    addCategory, getCategoryList, getAllData
};

