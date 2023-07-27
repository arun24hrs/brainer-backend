import {Request, Response, Router} from 'express'
import * as express from 'express'
import ProductModel from '../model/product.model'
const productRouter = express.Router();

//Get Route

productRouter.get("/:page", async (req, res) => {
    const {page} = req.params;
    const pageNo:number = +page || 1
  try {
    const products = await ProductModel.find().limit(8).skip(8*(pageNo-1));

    res.status(200).send({ products });
    
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});


//get by search Route

productRouter.get("/search", async (req, res) => {
    const {category} = req.query;
  try {
    const products = await ProductModel.find({
      category
    });
    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

//get data by sort

productRouter.get("/priceLTH", async (req, res) => {
    const {category} = req.query;
  try {
    const products = await ProductModel.find().sort({price: 1}).limit(8);
    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

productRouter.get("/priceHTL", async (req, res) => {
    const {category} = req.query;
  try {
    const products = await ProductModel.find().sort({price: -1}).limit(8);
    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
export default productRouter