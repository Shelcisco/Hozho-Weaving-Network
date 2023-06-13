const { gql } = require("apollo-server-express");

// create the typedefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Thought {
    _id: ID
    image: String
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!, image: String): Thought
    editThought(thoughtId: ID!, thoughtText: String!, image: String): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    removeThought(thoughtId: ID!): Thought
    removeReaction(thoughtId: ID!, reactionId: ID!): Thought
  }
`;

module.exports = typeDefs;
