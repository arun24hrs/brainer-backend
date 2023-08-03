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
//Get Routes
// Pagination
productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req.query);
    const currPage = Number(query.page);
    try {
        const product = yield product_model_1.default.find().limit(4).skip((+currPage - 1) * 4);
        res.status(200).send(product);
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
// Post product route
productRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const product = new product_model_1.default(req.body);
        yield product.save();
        res.status(200).send({ msg: "Product has been added." });
    }
    catch (error) {
        res.status(400).send({ msg: "Product has not been added." });
    }
}));
//get by search Route
productRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    console.log(q);
    try {
        const products = yield product_model_1.default.find({ name: q });
        res.status(200).send({ products });
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
//get data by sort
productRouter.get("/priceLTH", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req.query);
    const currPage = Number(query.page);
    try {
        const products = yield product_model_1.default.find().sort({ price: 1 }).limit(4).skip((+currPage - 1) * 4);
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
productRouter.get("/priceHTL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (req.query);
    const currPage = Number(query.page);
    try {
        const products = yield product_model_1.default.find().sort({ price: -1 }).limit(4).skip((+currPage - 1) * 4);
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ msg: error });
    }
}));
exports.default = productRouter;
