const gql = require("graphql-tag");

const typeDefs = gql`
	scalar DateTime

	enum TransactionType {
		payment
		refund
	}

	enum TransactionStatus {
		success
		pending
		failed
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		password: String!
		address: [Address]
		orders: [Order]
		savedAddresses: [Address]
	}

	type Address {
		_id: ID
		street: String
		city: String
		state: String
		zip: String
		country: String
	}

	type Order {
		_id: ID!
		user: User!
		products: [ProductOrder!]!
		totalAmount: Float!
		shippingAddress: Address
		status: String
		transactionId: Transaction!
		timestamps: Timestamp
	}

	type Timestamp {
		createdAt: DateTime!
		updatedAt: DateTime
	}

	type ProductOrder {
		product: Product!
		quantity: Int!
	}

	type Product {
		_id: ID!
		name: String!
		description: String!
		price: Float!
		category: Category!
		inventoryCount: Int!
		images: [String!]!
		reviews: [Review]
	}

	type Category {
		_id: ID!
		name: String!
		description: String!
		products: [Product]
	}

	type Transaction {
		_id: ID!
		orderId:Order!
		type: TransactionType!
		status: TransactionStatus!
		timestamps: Timestamp!
	}

	type Review {
		_id: ID!
		user: User!
		product: Product!
		comment: String!
		rating: Int!
		timestamps: Timestamp!
	}

	type Query {
		getUsers: [User]
        getAddresses: [Address]
        getCategories:[Category]
        getOrders:[Order]
        getProducts:[Product]
        getReviews:[Review]
        getTransactions:[Transaction]
		getUserById(_id: ID!): User
        getAddressById(_id: ID!): Address
        getCategoryById(_id: ID!): Category
        getOrderById(_id: ID!): Order
        getProductById(_id: ID!): Product
        getReviewById(_id: ID!): Review
        getTransactionById(_id: ID!): Transaction
		getUserByEmail(email: String!): User
        
	}

	type Mutation {
		createUser(name: String!, email: String!, password: String!): User,
        updateUserAddress(userid:ID!,addressId:ID!):User
	}
`;

export default typeDefs;
