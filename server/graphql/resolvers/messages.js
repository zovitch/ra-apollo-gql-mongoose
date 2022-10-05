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
    async message(_, { id }) {
      return await Message.findById(id);
    },

    async messages() {
      try {
        const messages = await Message.find();
        return messages;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
