const Massages = require("../Models/messageModel");

const addMessage = function (message) {
  return new Promise((resolve, reject) => {
    const newMessage = new Massages(message);
    newMessage.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getAllReceiversMesseges = function (receiver) {
  return new Promise((resolve, reject) => {
    Massages.find({ receiver: receiver }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getAllSenderMesseges = function (sender) {
  return new Promise((resolve, reject) => {
    Massages.find({ sender: sender }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getAllUnreadMesseges = function (receiver) {
  return new Promise((resolve, reject) => {
    Massages.find({ receiver: receiver, isSeen: false }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const deleteMessage = function (id) {
  return new Promise((resolve, reject) => {
    Massages.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("message was deleted");
      }
    });
  });
};

const getMessageById = function (id) {
  return new Promise((resolve, reject) => {
    Massages.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUnseenMessage = function (receiver) {
  return new Promise((resolve, reject) => {
    Massages.find({ receiver: receiver, isSeen: false }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
      .sort({ creationDate: 1 })
      .limit(1);
  });
};

const updateSeenMessage = function (id) {
  return new Promise((resolve, reject) => {
    Massages.findByIdAndUpdate(id, { isSeen: true }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("message was read");
      }
    });
  });
};
module.exports = {
  addMessage,
  getAllReceiversMesseges,
  getAllSenderMesseges,
  deleteMessage,
  getMessageById,
  getAllUnreadMesseges,
  getUnseenMessage,
  updateSeenMessage,
};
