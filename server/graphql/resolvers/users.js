const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      // see if a user with that email exists
      const oldUser = await User.findOne({ email });

      // throw error if that user exists
      if (oldUser) {
        throw new ApolloError(`User ${email} already exists`, '400');
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Build mongoose model
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      // create JWT token
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email: email.toLowerCase(),
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' },
      );

      // at this point, the user is created, but the token is not saved to the user
      // so we need to save the token to the user
      newUser.token = token;

      //Save user to database
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    // loginUser resolver
    async loginUser(_, { loginInput: { email, password } }) {
      // see if a user with that email exists
      const user = await User.findOne({ email });

      // throw error if that user do not exists
      if (!user) {
        throw new ApolloError('No User exists with this email', '400');
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: '2h',
          },
        );

        // save user token
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }
    },

    // updateUser resolver
    async updateUser(
      _,
      { id, updateUserInput: { username, email, password } },
    ) {
      const userFields = {};
      if (username) userFields.username = username;
      if (email) userFields.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        userFields.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userFields },
        { new: true },
      );

      // throw error if that user do not exists
      if (!updatedUser) {
        throw new ApolloError('No User exists with this id', '400');
      }

      return updatedUser;
    },
  },

  // Query resolvers
  // Query needs to be async because Mongoose return a Promise
  Query: {
    async User(_, { id }) {
      return await User.findById(id);
    },

    async allUsers(_, { page, perPage, sortField, sortOrder, filter }) {
      const options = {
        page: page || 1,
        limit: perPage || 10,
        sort: { [sortField]: sortOrder || 1 },
        populate: 'createdBy',
        select: '-password',
      };

      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    async _allUsersMeta(_, { page, perPage, sortField, sortOrder, filter }) {
      const options = {
        page: page || 1,
        limit: perPage || 10,
        sort: { [sortField]: sortOrder || 1 },
        populate: 'createdBy',
        select: '-password',
      };

      try {
        const users = await User.find();
        return {
          count: users.length,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
