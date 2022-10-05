const messageResolvers = require('./messages');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...messageResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
