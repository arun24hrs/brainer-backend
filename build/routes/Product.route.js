"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const product_model_1 = require("../model/product.model");
const productRouter = express.Router();
//Get Route
productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {page} = req.params;
    // const pageNo:number = +page || 1
    try {
        const products = yield product_model_1.default.find().limit(8);
        console.log(products);
        res.status(200).send({ products });
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
//get by search Route
productRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const products = yield product_model_1.default.find({
            category
        });
        res.status(200).send({ products });
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
//get data by sort
productRouter.get("/priceLTH", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const products = yield product_model_1.default.find().sort({ price: 1 }).limit(8);
        res.status(200).send({ products });
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
productRouter.get("/priceHTL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const products = yield product_model_1.default.find().sort({ price: -1 }).limit(8);
        res.status(200).send({ products });
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
exports.default = productRouter;
