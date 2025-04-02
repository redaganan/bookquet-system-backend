import { FastifyRequest, FastifyReply } from "fastify";


export const exampleController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        return { message: "Hello World" };
        // reply.code(201).send({ message: "Hello World" });
    } catch (error) {
        reply.code(500).send({ message: "Internal Server Error" });
    }
};