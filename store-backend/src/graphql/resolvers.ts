const { GraphQLScalarType, Kind } = require("graphql");

import { trace } from "console";
import {
	UserModel,
	AddressModel,
	CategoryModel,
	OrderModel,
	ProductModel,
	TransactionModel,
	ReviewModel,
} from "../db/models/index";
const { ObjectId } = require("mongoose").Types;
const { ApolloError } = require("apollo-server-express");

const resolvers = {
	DateTime: new GraphQLScalarType({
		name: "DateTime",
		description: "A valid date-time value.",
		serialize(value: any) {
			return value instanceof Date ? value.toISOString() : null; // Convert outgoing Date to ISOString for the client
		},
		parseValue(value: any) {
			return new Date(value); // Convert incoming ISOString to Date for the server
		},
		parseLiteral(ast: any) {
			return ast.kind === Kind.STRING ? new Date(ast.value) : null; // Convert hard-coded AST string to Date for the server
		},
	}),

	//##################################################################################################################
	//######################################## Resolvers for sub-graph population ######################################
	//##################################################################################################################

	User: {
		address: async (parent: any) => {
			try {
				const user = await UserModel.findById(parent._id).populate("address");
				return user?.address;
			} catch (err) {
				console.error("Error fetching user addresses:", err);
			}
		},
		orders: async (parent: any) => {
			try {
				const user = await UserModel.findById(parent._id).populate("orders");
				return user?.orders;
			} catch (err) {
				console.error("Error fetching user orders:", err);
			}
		},
		savedAddresses: async (parent: any) => {
			try {
				const user = await UserModel.findById(parent._id).populate({
					path: "savedAddresses",
					populate: { path: "address" },
				});
				return user?.savedAddresses;
			} catch (err) {
				console.error("Error fetching user addresses:", err);
			}
		},
	},
	Category: {
		products: async (parent: any) => {
			try {
				const category = await CategoryModel.findById(parent._id).populate(
					"products"
				)
				return category?.products;
			} catch (err) {
				console.error("Error fetching category products:", err);
			}
		},
	},
    Order: {
        user: async (parent: any) => {
            try {
                const order = await OrderModel.findById(parent._id).populate(
					"user"
				);
				return order?.user;
            }catch (err) {
				console.error("Error fetching order users:", err);
			}
        },
		products: async (parent: any) => {
			try {
				const order = await OrderModel.findById(parent._id).populate(
                    { path:"products.product",model:'Product'}
				);
				return order?.products;
			} catch (err) {
				console.error("Error fetching order products:", err);
			}
		},
		shippingAddress: async (parent: any) => {
			try {
				const order = await OrderModel.findById(parent._id).populate(
					"shippingAddress"
				);
				return order?.shippingAddress;
			} catch (err) {
				console.error("Error fetching order shipping address:", err);
			}
		},
		transactionId: async (parent: any) => {
			try {
				const order = await OrderModel.findById(parent._id).populate(
					"transactionId"
				);
				return order?.transactionId;
			} catch (err) {
				console.log("Error fetching order transaction ID:", err);
			}
		},
	},
	Product: {
		category: async (parent: any) => {
			try {
				const products = await ProductModel.findById(parent._id).populate(
					"category"
				);
				return products?.category;
			} catch (err) {
				console.log("Error fetching categories:", err);
			}
		},
		reviews: async (parent: any) => {
			try {
				const products = await ProductModel.findById(parent._id).populate(
					"reviews"
				);
				return products?.reviews;
			} catch (err) {
				console.log("Error Fetching reviews", err);
			}
		},
	},
	Review: {
		user: async (parent: any) => {
			try {
				const reviews = await ReviewModel.findById(parent._id).populate(
					"user"
				);
				return reviews?.user;
			} catch (err) {
				console.log("Error getting user details");
			}
		},
		product: async (_: any) => {
			try {
                const reviews = await ReviewModel.findById(_._id).populate("product");
                return reviews?.product
			} catch (err) {
				console.error("Error getting product details");
			}
		},
	},
	Transaction: {
		orderId: async (parent: any) => {
			try {
				const transaction = await TransactionModel.findById(
					parent._id
				).populate("orderId");
				return transaction?.orderId;
			} catch (err) {
				console.error("Error fetching user details", err);
			}
		},
	},

	//######################################################################################################################
	//########################################  Resolvers for Queries ######################################################
	//######################################################################################################################
	Query: {
		getUsers: async () => {
			try {
				const users = await UserModel.find();
				return users;
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		},
		getAddresses: async () => {
			try {
				const addresses = await AddressModel.find();
				return addresses;
			} catch (err) {
				console.error("Error fetching addresses:");
			}
		},
		getCategories: async () => {
			try {
				const categories = await CategoryModel.find();
				return categories;
			} catch (err) {
				console.error("Error fetching categories:");
			}
        },
        getOrders: async () => {
			try {
				const orders = await OrderModel.find();
				return orders;
			} catch (err) {
				console.error("Error fetching categories:");
			}
        },
        getProducts: async () => {
			try {
				const products = await ProductModel.find();
				return products;
			} catch (err) {
				console.error("Error fetching categories:");
			}
        },
        getReviews: async () => {
			try {
				const reviews = await ReviewModel.find();
				return reviews;
			} catch (err) {
				console.error("Error fetching categories:");
			}
        },
        getTransactions: async () => {
			try {
				const transactions = await TransactionModel.find();
				return transactions;
			} catch (err) {
				console.error("Error fetching categories:");
			}
		},

		getUserById: async (_: any, args: any) => {
			try {
				const user = await UserModel.findById(args._id);
				return user;
			} catch (err) {
				console.error("Error fetching user:", err);
			}
        },
        getAddressById: async (_: any, args: any)=>{
            try {
                const address = await AddressModel.findById(args._id);
                return address;
            } catch (err) {
                console.error("Error Fetching Address ")
            }
        },
        getCategoryById: async (_: any, args: any)=>{
            try {
                const category = await CategoryModel.findById(args._id);
                return category;
            } catch (err) {
                console.error("Error Fetching Category ")
            }
        },
        getOrderById: async (_: any, args: any) => {
			try {
				const order = await OrderModel.findById(args._id);
				return order;
			} catch (err) {
				console.error("Error fetching order:", err);
			}
        },
        getProductById: async (_: any, args: any) => {
			try {
				const product = await ProductModel.findById(args._id);
				return product;
			} catch (err) {
				console.error("Error fetching product:", err);
			}
        },
        getReviewById: async (_: any, args: any) => {
			try {
				const review = await ReviewModel.findById(args._id);
				return review;
			} catch (err) {
				console.error("Error fetching review:", err);
			}
        },
        getTransactionById: async (_: any, args: any) => {
			try {
				const transaction = await TransactionModel.findById(args._id);
				return transaction;
			} catch (err) {
				console.error("Error fetching transaction:", err);
			}
        },
		getUserByEmail: async (_: any, args: any) => {
			try {
				const user = await UserModel.findOne({ email: args.email });
				return user;
			} catch (err) {
				console.log("Error getting user by email:", err);
			}
		},
	},

	//######################################################################################################################
	//########################################  Resolvers for Mutations ####################################################
	//######################################################################################################################

	Mutation: {
		createUser: async (_: any, args: any) => {
			try {
				const user = await UserModel.findOne({ email: args.email });
				if (user) {
					throw new ApolloError("User already exists", "USER_ALREADY_EXISTS");
				} else {
					const newUser = await UserModel.create({
						_id: new ObjectId(),
						...args,
					});
					return user;
				}
			} catch (err) {
				console.error("Error creating user:", err);
			}
		},
		updateUserAddress: async (_any: any, args: any) => {
			try {
				const user = await UserModel.findById(args.userid);
				if (!user) {
					throw new ApolloError("User not found", "USER_NOT_FOUND");
				} else {
					const addressdata = await AddressModel.findById(args.addressId);

					if (addressdata) {
						if (!user.address.includes(args.addressId)) {
							user.address.push(args.addressId);
							await user.save();
							return user;
						}
					}
				}
			} catch (err) {
				console.error("Error updating user address:", err);
			}
		},
	},
};

export default resolvers;
