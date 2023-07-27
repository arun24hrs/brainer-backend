import {Request, Response, Router} from 'express'
import * as express from 'express'
import UserModel from "../model/user.model"
const userRouter:Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {configDotenv} from "dotenv";

const saltRounds: number = 5;
configDotenv();

userRouter.post("/register", async (req:Request, res:Response) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, saltRounds, async (err:Error, hash:string) => {
      if (err) {
        console.log(err);
      } else {
        const newuser = new UserModel({ name, email, password: hash });
        await newuser.save();
        res.status(200).send({ msg: "User registered" });
      }
    });
  } catch (error:unknown) {
    res.status(400).send({ "error": error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err:Error, result: Response) => {
        if (err) {
          console.log(err);
        } else if(result) {
          res.status(200).send({
            msg: "Login Successful",
            token: jwt.sign({ pass: password }, process.env.SECRET_KEY),
          });
        }
        else {
            res.status(400).send({ msg: "Wrong Credential" });
          }
      });
    } else {
      res.status(200).send({ msg: "User does not exist." });
    }
  } catch (error:unknown) {
    res.status(400).send({ error: error });
  }
});

export default userRouter;
