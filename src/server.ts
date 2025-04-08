import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fs from "fs";
import path from "path";

import { PORT } from "./utils/constant";

import dotenv from "dotenv";
dotenv.config();

const fastify = Fastify({ logger: false, trustProxy: true });

fastify.register(cors, {
    origin: true, // put your domain here (change `*` to your domain)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
});

/**
 * Dynamically registers all routes from the routers directory.
 * @param {FastifyInstance} fastify - The Fastify instance to register routes on.
 */
const registerRoutes = (fastify: FastifyInstance) => {
	const routesPath = path.join(__dirname, "./routers");
	fs.readdirSync(routesPath).forEach(async (file) => {
		if (file.endsWith(".ts") || file.endsWith(".js")) {
			const route = await import(path.join(routesPath, file));
			const prefix = { prefix: "/api" };
			fastify.register(route.default, prefix);
		}
	});
};
registerRoutes(fastify);

const main = async () => {
	try {
		await fastify.ready(); // Ensure all plugins are loaded before starting the server
		await fastify.listen({ port: PORT as number, host: "0.0.0.0" }, () => {
			console.log(`Server listening on port http://localhost:${PORT}`);
		});
	} catch (error) {
		fastify.log.error(error);
		console.error("Error starting server:", error);
		process.exit(1);
	}
};

main()