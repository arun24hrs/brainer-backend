import { Request, Response, Router } from 'express';
import * as express from 'express'
import ProductModel from '../model/product.model'
const productRouter = express.Router();

//Get Routes

// Pagination
productRouter.get("/", async (req:Request, res: Response) => {
  const query = (req.query);
  const currPage = Number(query.page)
  try {
    const product = await ProductModel.find().limit(4).skip((+currPage-1)*4);
    res.status(200).send(product);
    
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});


// Post product route

productRouter.post("/add", async(req: Request, res: Response)=> {
  console.log(req.body)
  try {
    const product = new ProductModel(req.body);
    await product.save();
  res.status(200).send({ msg: "Product has been added." });
  } catch (error) {
    res.status(400).send({msg: "Product has not been added."})
  }
})

//get by search Route

productRouter.get("/search", async (req: Request, res: Response) => {
    const {q} = req.query;
    console.log(q)
  try {
    const products = await ProductModel.find({name: q});
    res.status(200).send({ products });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

//get data by sort

productRouter.get("/priceLTH", async (req: Request, res: Response) => {
  const query = (req.query);
  const currPage = Number(query.page)
  try {
    const products = await ProductModel.find().sort({price: 1}).limit(4).skip((+currPage-1)*4);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

productRouter.get("/priceHTL", async (req: Request, res: Response) => {
  const query = (req.query);
  const currPage = Number(query.page)
  try {
    const products = await ProductModel.find().sort({price: -1}).limit(4).skip((+currPage-1)*4);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
export default productRouter