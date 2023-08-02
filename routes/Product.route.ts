import * as express from 'express'
import ProductModel from '../model/product.model'
const productRouter = express.Router();

//Get Route

productRouter.get("/", async (req, res) => {

  try {
    const product = await ProductModel.find().limit(8);
    res.status(200).send(product);
    
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Post product route

productRouter.post("/add", async(req, res)=> {
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