//this file will contain resolvers (queries) that will be exported and used on the front end to post, delete, retrieve and edit data
const { AuthenticationError } = require('apollo-server-express');
const { User, Art } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Resolver for the 'me' query
        me: async (parent, args, context) => {
            if (context.user) {
                // If user is logged in, fetch the user data
                return await User.findOne({ _id: context.user._id });
            }
            // If user is not logged in, ask them to do so
            throw new AuthenticationError('Please log in');
        },
        // Resolver for the 'myArt' query
        myArt: async (parent, args, context) => {
            if (context.user) {
                // If user is logged in, fetch their posted art
                return await Art.find({ userId: context.user._id });
            }
            // If user is not logged in, ask them to do so
            throw new AuthenticationError('Please log in');
        },
    },
    Mutation: {
        // Resolver for the 'login' mutation
        login: async (parent, { input: { email, password } }) => {
            const user = await User.findOne({ email });

            if (!user) {
                // If user is not found, say so
                throw new AuthenticationError('Email not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                // If password is incorrect, say so
                throw new AuthenticationError('Incorrect password');
            }
            // If login is successful, generate a token and return it along with the user object
            const token = signToken(user);
            return { token, user };
        },
        // Resolver for the 'createArt' mutation
        createArt: async (parent, { input }, context) => {
            if (context.user) {
                // If user is logged in, create a new art object with the provided input and the user's ID
                const art = await Art.create({ ...input, userId: context.user._id });
                return art;
            }
            // If user is not logged in, say so
            throw new AuthenticationError('Please log in');
        },
        // Resolver for the 'updateArt' mutation
        updateArt: async (parent, { input }, context) => {
            if (context.user) {
                // If user is logged in, update the art object with the provided input and the user's ID
                const { id, ...update } = input;
                const art = await Art.findOneAndUpdate({ _id: id, userId: context.user._id }, update, { new: true });
                if (!art) {
                    // If art is not found, say so
                    throw new Error('Art not found');
                }
                return art;
            }
            // If user is not logged in, say so
            throw new AuthenticationError('Please log in');
        },
        // Resolver for the 'deleteArt' mutation
        deleteArt: async (parent, { id }, context) => {
            if (context.user) {
                // If user is logged in, find and delete the art object with the provided ID and the user's ID
                const art = await Art.findOneAndDelete({ _id: id, userId: context.user._id });
                if (!art) {
                    // If art is not found, say so
                    throw new Error('Art not found');
                }
                return id;
            }
            // If user is not logged in, say so
            throw new AuthenticationError('Please log in');
        },
    },
};

module.exports = resolvers;
