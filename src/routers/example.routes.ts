import { FastifyInstance } from "fastify";

import * as exampleController from "../controllers/example.controller";

export default async (fastify: FastifyInstance) => {
    fastify.get("/", exampleController.exampleController);
    fastify.post("/upload", exampleController.uploadController);
};
