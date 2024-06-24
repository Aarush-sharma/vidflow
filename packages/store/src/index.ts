import { randomUUID } from "crypto";
import { createClient } from "redis";
import type { RedisClientType } from "redis";

export class RoomManager {
    private static instance: RoomManager
    private redisclient: RedisClientType
    private constructor() {
        this.redisclient = createClient()
        this.redisclient.connect()
    }               

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        return this.instance = new RoomManager()
    }

    createId(userId: string) {
        const value = randomUUID()
        this.redisclient.set(userId, value)
        return value
    }

    getId(userId: string) {
        const value = this.redisclient.get(userId);
        if (value) return value;
        return null;
    }

    async deleteId(userId: string) {
        const isDeleted = await this.redisclient.del(userId)
        if (isDeleted === 1) return "deleted succesfully";
        return null;
    }
}

export class Pubsub {

    private static instance: Pubsub;
    private redisclient: RedisClientType;
    private publisher: RedisClientType;

    private constructor() {
        this.redisclient = createClient()
        this.redisclient.connect()
        this.publisher = createClient()
        this.publisher.connect()

    };

    static getInstance() {
        if (Pubsub.instance) {
            return Pubsub.instance;
        }
        Pubsub.instance = new Pubsub();
        return Pubsub.instance;
    };

    Subscribe(channel: string) {
        return new Promise<string>((resolve, reject) => {
            if (channel === "") {
                reject("null string cannot be a channel")
            }
            this.redisclient.subscribe(channel, (message) => {
                resolve(message)
            })
        })
    }

    async unSubscribe(channel: string) {
        if (channel === "") {
            return new Error("empty string is not allowed");
        }
        try {
            await this.redisclient.unsubscribe(channel)
            return true;
        } catch (e) {
            return null;
        }
    }

    Publish(channel: string, data: string) {
        return new Promise<string>((resolve, reject) => {
            if (channel === "" || data === "") {
                reject("empty string is not valid")
            }
            try {
                this.publisher.publish(channel, data)
                resolve("published successfully")
            } catch (e) {
                reject("something went wrong")
            }
        })
    }

    async disconnect() {
        await this.redisclient.quit();
        await this.publisher.quit();
    }
};
