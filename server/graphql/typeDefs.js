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
    confirmPassword: String
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

  input UserFilter {
    q: String
    id: ID
    username: String
    email: String
  }

  input MessageFilter {
    q: String
    id: ID
    text: String
    text_contains: String
    text_startsWith: String
    text_endsWith: String
    text_not: String
    text_in: [String]
    text_not_in: [String]
    createdAt: String
    createdAt_lt: String
    createdAt_lte: String
    createdAt_gt: String
    createdAt_gte: String
    createdBy: String
    createdBy_contains: String
    createdBy_startsWith: String
    createdBy_endsWith: String
    createdBy_not: String
    createdBy_in: [String]
    createdBy_not_in: [String]
  }

  type ListMetadata {
    count: Int!
  }

  scalar Date

  type Query {
    Message(id: ID!): Message!

    allMessages(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: MessageFilter
    ): [Message]

    _allMessagesMeta(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: MessageFilter
    ): ListMetadata

    User(id: ID!): User!

    allUsers(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: UserFilter
    ): [User]

    _allUsersMeta(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: UserFilter
    ): ListMetadata
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
