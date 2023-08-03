import { Express } from "express";
import * as express from "express"
import connection from "./connection"
import userRouter from "./routes/User.route"
import productRouter from "./routes/Product.route"
import {configDotenv} from "dotenv";
import * as cors from 'cors'
configDotenv();

const port:string|number = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors())

app.use("/users",userRouter);
app.use("/products",productRouter);


const server = app.listen(port, async()=>{
    try {
        await connection;
        console.log("Connected to DB.")
    } catch (error) {
        console.log("Error connecting to DB.")
        console.log(error)
    }
    console.log(`Server is running on ${port}`)
})

export default server;