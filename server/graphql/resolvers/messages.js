const Message = require('../../models/Message');

module.exports = {
  Mutation: {
    async createMessage(_, { messageInput: { text, username } }) {
      const newMessage = new Message({
        text: text,
        createdBy: username,
        createdAt: new Date().toISOString(),
      });

      const res = await newMessage.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteMessage(_, { id }) {
      const messageDeleted = await Message.findByIdAndDelete(id);

      // if not message found
      if (!messageDeleted) {
        throw new Error('Message not found');
      }

      return messageDeleted;
    },

    async updateMessage(_, { id, messageEditInput: { text } }) {
      const messageUpdated = await Message.findByIdAndUpdate(
        id,
        { text },
        { new: true },
      );

      // if not message found
      if (!messageUpdated) {
        throw new Error('Message not found');
      }

      return {
        id: messageUpdated.id,
        ...messageUpdated._doc,
      };
    },
  },

  // Query resolvers for message
  // Query needs to be async because Mongoose return a Promise
  Query: {
    async Message(_, { id }) {
      return await Message.findById(id);
    },

    async allMessages(_, { page, perPage, sortField, sortOrder, filter }) {
      const options = {
        page: page || 1,
        limit: perPage || 10,
        sort: { [sortField]: sortOrder || 'asc' },
        collation: {
          locale: 'en',
        },
      };

      try {
        const messages = await Message.find();
        return messages;
      } catch (err) {
        throw new Error(err);
      }
    },

    async _allMessagesMeta(_, { page, perPage, sortField, sortOrder, filter }) {
      const options = {
        page: page || 1,
        limit: perPage || 10,
        sort: { [sortField]: sortOrder || 'asc' },
        collation: {
          locale: 'en',
        },
      };

      try {
        const messages = await Message.find();
        return {
          count: messages.length,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
