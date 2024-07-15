// import { Request, Response } from "express";
// import {typeDefs,resolvers} from './graphql/index'
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { User, Address, Product, Order, Category, Review, Transaction } = require('../db/models/index');
// const app = express();
// const port = 3001;
// app.use(cors());

// mongoose
// 	.connect("mongodb://localhost:27017/store-backend", {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log("Connected to MongoDB"))
// 	.catch((err:any) => console.log(err));

// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`);
// });

import express from "express";
import cors from "cors";

import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { readFileSync } from "fs";
import mongoose from "mongoose";

(async function () {
    try {
        const PORT = process.env.PORT || 5050;
        const app = express();

        app.use(cors());
        app.use(express.json());

        const connection = await mongoose.connect(
            "mongodb://localhost:27017/store-backend"
        );

        const server = new ApolloServer({
            schema: buildSubgraphSchema({ typeDefs, resolvers }),
        });
        await server.start();
        app.use("/graphql", cors(), express.json(), expressMiddleware(server));

        app.use("/", (req, res) => {
            res.send("<p>Welcome to the Store Backend API</p>");
        });
        // start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    }catch (error) {
        console.error("Error starting server: ", error);
    }
})();
