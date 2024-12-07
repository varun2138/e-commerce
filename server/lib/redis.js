import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config({});

const redis = new Redis(process.env.REDIS_SECRET_KEY);

export default redis;
