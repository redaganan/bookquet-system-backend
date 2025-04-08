import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";

interface UploadedBody {
	name: string;
	email: string;
	contact: string;
	selectedFlowers: SelectedFlower[];
	totalPrice: number;
}
interface SelectedFlower {
	name: string;
	price: number;
}

export const exampleController = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		return { message: "Hello World" };
		// reply.code(201).send({ message: "Hello World" });
	} catch (error) {
		reply.code(500).send({ message: "Internal Server Error" });
	}
};

export const uploadController = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const data = request.body as UploadedBody;

		// Define the path to save the JSON file
		const filePath = path.join(__dirname, "../database/bookquet.json");
		console.log("File path:", filePath);

		// Read the existing data from the file
		let fileData: UploadedBody[] = [];
		if (fs.existsSync(filePath)) {
			try {
				const fileContent = fs.readFileSync(filePath, "utf-8");
				fileData = JSON.parse(fileContent);

				// Ensure fileData is an array
				if (!Array.isArray(fileData)) {
					console.warn(
						"Invalid data in bookquet.json, resetting to an empty array."
					);
					fileData = [];
				}
			} catch (parseError) {
				console.error(
					"Error parsing bookquet.json, resetting to an empty array:",
					parseError
				);
				fileData = [];
			}
		}

		// Add the new data to the existing data
		fileData.unshift(data);

		// Write the updated data back to the file
		fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");

		console.log("Data saved to bookquet.json:", data);

		// Process the uploaded data here
		return reply.send({ message: "Upload successful", data });
	} catch (error) {
		// Log the error for debugging
		console.error("Error in uploadController:", error);

		// Send a detailed error response
		reply.code(500).send({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
