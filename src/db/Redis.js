import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.URL_REDIS_CONTAINER;
const redisPort = process.env.REDIS_PORT;
const client = createClient({ url: `redis://${redisUrl}:${redisPort}` });

export async function connectRedis() {

    client.on("connect", () =>
        console.log(`Redis Client Connected on port ${redisPort}`)
    );
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("reconnecting", () => console.log("Redis Client Reconnecting"));
    client.on("end", () => console.log("Redis Client Disconnected"));
    await client.connect();
}

export async function redisClient(){
    return client;
}