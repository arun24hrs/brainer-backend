import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv();
const url: string = process.env.MongoURL || ""

const connection = mongoose.connect(url)

export {connection};