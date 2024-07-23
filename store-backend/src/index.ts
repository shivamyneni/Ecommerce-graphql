import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
	path:'.env' 
});

(async function () {
	try {
		
		
		const PORT = process.env.PORT || 5050;
		const DB_URL = process.env.DB_URL;

       

		const app = express();

		app.use(cors());
		app.use(express.json());

		// Connect to MongoDB
		const dbconnect = await mongoose.connect(DB_URL as string);
		
		
		const server = new ApolloServer({
			schema: buildSubgraphSchema({ typeDefs, resolvers }),
		});
		await server.start();
		app.use("/graphql", cors(), express.json(), expressMiddleware(server));

		app.use("/", (req, res) => {
			res.send("<p>Welcome to the Store Backend API</p>");
		});

		// Start the Express server
		app.listen(PORT, () => {
			console.log(`Server is running on port: ${PORT}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
})();
