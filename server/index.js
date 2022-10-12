const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');

const connectDB = require('./config/db');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers'); //using the index.js file in the resolvers folder

const port = process.env.PORT || 4000;

// Connect to database
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cors: {
    origin: '*',
    credentials: true,
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server listening on ${url}`.bgMagenta);
});
