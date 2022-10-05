const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    id: ID!
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
    id: ID!
    username: String
    email: String
    password: String
    token: String
  }

  input MessageInput {
    text: String!
    username: String!
  }

  input MessageEditInput {
    text: String!
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  type Query {
    message(id: ID!): Message!
    messages: [Message]
    user(id: ID!): User!
    users: [User]
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    updateMessage(id: ID!, messageEditInput: MessageEditInput): Message!
    deleteMessage(id: ID!): Message!

    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
    updateUser(id: ID!, updateUserInput: UpdateUserInput): User!
  }
`;
