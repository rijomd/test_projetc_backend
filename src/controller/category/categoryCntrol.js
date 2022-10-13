"use strict";
const categoryService = require("../../service/categoryService");
var mongoose = require('mongoose');

async function addCategory(req, res) {
    let query = req.body;

    try {
        if (query.parent_id ==1) {
            delete query.parent_id;
            query.parent=true;
        }
        let response = await categoryService.addCategory(query);

        res.status(200).json({
            error_code: 0,
            message: "Succes",
            data: response.data
        });

    } catch (err) {
        res.status(200).json({
            error_code: 11,
            message: err.message,
            data: err
        });
    }

}

async function getCategoryList(req, res) {
    let query = req.body;
    console.log("getCategoryList ctrl", query);
    try {
        let response = await categoryService.getCategoryList(query);
        res.status(200).json({
            error_code: 0,
            message: process.env.SUCCESS,
            data: response.data
        });
    } catch (error) {
        res.status(200).json(
            {
                error_code: 11,
                message: error.message,
                data: error
            }
        )
    }
}

async function getAllData(req, res) {
    let query = req.body;
    console.log("getAllData ctrl", query);
    try {
        let response = await categoryService.getAllData(query);
        res.status(200).json({
            error_code: 0,
            message: process.env.SUCCESS,
            data: response.data
        });
    } catch (error) {
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
    addCategory, getCategoryList,getAllData
}