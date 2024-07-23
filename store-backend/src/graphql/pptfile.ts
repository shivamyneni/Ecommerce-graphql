Query: {
    getUsers: async () => {
        try {
            const users = await UserModel.find();
            return users;
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }
}

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
    }
}
