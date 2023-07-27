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
const user_model_1 = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const saltRounds = 5;
(0, dotenv_1.configDotenv)();
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                const newuser = new user_model_1.default({ name, email, password: hash });
                yield newuser.save();
                res.status(200).send({ msg: "User registered" });
            }
        }));
    }
    catch (error) {
        res.status(400).send({ "error": error });
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else if (result) {
                    res.status(200).send({
                        msg: "Login Successful",
                        token: jwt.sign({ pass: password }, process.env.SECRET_KEY),
                    });
                }
                else {
                    res.status(400).send({ msg: "Wrong Credential" });
                }
            });
        }
        else {
            res.status(200).send({ msg: "User does not exist." });
        }
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
}));
exports.default = userRouter;
