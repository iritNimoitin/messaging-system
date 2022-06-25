const messageDAL = require("../DAL/messageDAL");

const sendMessage = async function (message, senderemail) {
  const messageToSend = {
    sender: senderemail,
    receiver: message.receiver,
    message: message.message,
    subject: message.subject,
  };
  return await messageDAL.addMessage(messageToSend);
};

const getAllReceiversMesseges = async function (reciverEmail) {
  return await messageDAL.getAllReceiversMesseges(reciverEmail);
};

const getAllSenderMesseges = async function (senderEmail) {
  return await messageDAL.getAllSenderMesseges(senderEmail);
};

const getAllUnreadMesseges = async function (reciverEmail) {
  return await messageDAL.getAllUnreadMesseges(reciverEmail);
};

const readMessage = async function (reciverEmail) {
  const response = await messageDAL.getUnseenMessage(reciverEmail);
  if (response.length === 0) {
    throw "there are no unread messages";
  }
  const id = response[0]._id;
  await messageDAL.updateSeenMessage(id);
  return response;
};

const readMessageByID = async function (id) {
  const response = await messageDAL.getMessageById(id);
  // if (Object.entries(response).length === 0) {
  throw `${response}, ${Object.entries(response).length}`; //"this message doesn't exists";
  // }
  if (!response.isSeen) {
    await messageDAL.updateSeenMessage(id);
  }
  return response;
};

const deleteMessage = async function (id, currUserEmail) {
  const message = await messageDAL.getMessageById(id);
  if (!message) {
    throw `Message with id: ${id}, do not exists in the system`;
  }
  if (message.receiver !== currUserEmail && message.sender !== currUserEmail) {
    throw `Message with id: ${id}, does not belong to user with email: ${currUserEmail}`;
  }
  return await messageDAL.deleteMessage(id);
};

module.exports = {
  sendMessage,
  getAllReceiversMesseges,
  getAllSenderMesseges,
  deleteMessage,
  getAllUnreadMesseges,
  readMessage,
  readMessageByID,
};
