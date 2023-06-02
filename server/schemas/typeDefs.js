//this file will define the mongoose models to be used by GQL and then export
const { gql } = require('apollo-server-express');

const typeDefs = gql`
// user object 
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  // art object
  type Art {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    userId: ID!
  }
  
  // auth object
  type Auth {
    token: ID!
    user: User
  }

  // login input for user login
  input LoginInput {
    email: String!
    password: String!
  }

  // input for creating a new art object
  input CreateArtInput {
    title: String!
    description: String!
    imageUrl: String!
  }

  // input for updating an existing art object
  input UpdateArtInput {
    id: ID!
    title: String
    description: String
    imageUrl: String
  }

// query to fetch all art objects created by the current user
  type Query {
    me: User
    myArt: [Art!]!
  }
  
  
// mutations for authenticating users, creating, updating and deleting art
  type Mutation {
    login(input: LoginInput!): Auth
    createArt(input: CreateArtInput!): Art!
    updateArt(input: UpdateArtInput!): Art!
    deleteArt(id: ID!): ID!
  }
`;

module.exports = typeDefs;