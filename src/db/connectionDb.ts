import mongoose from "mongoose"
require('dotenv').config();
import { logger } from "../services/loggerService";

const uri = process?.env?.DB_URI as string

export const dbConnect = async () => {
    try {
        if (!uri) return logger.error("No Database Uri Provided")
        await mongoose.connect(uri) 
        logger.info("Database Connected")
    } catch (error) {
        logger.error("Failed to connect to Database")
        process.exit(1)
    }        
}