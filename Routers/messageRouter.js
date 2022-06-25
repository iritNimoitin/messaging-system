const express = require("express");
const messageBL = require("../BL/messageBL");
const verify = require("../configs/verifyToken");
const { ValidateBody, messagesSchemas } = require("../configs/validations");
const router = express.Router();

/**
 * add message to database
 */
router
  .route("/sendMessage")
  .post(
    verify,
    ValidateBody(messagesSchemas.sendMessage),
    async (req, resp) => {
      const senderemail = req.user.email;
      const message = req.body;
      try {
        const result = await messageBL.sendMessage(message, senderemail);
        return resp.json(result);
      } catch (err) {
        return resp.json(err);
      }
    }
  );

/**
 * get all messages received by the user connected to the system
 */
router.route("/getReciverMessages").get(verify, async (req, resp) => {
  const reciverEmail = req.user.email;
  try {
    const result = await messageBL.getAllReceiversMesseges(reciverEmail);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});

/**
 * get all messages sent by the user connected to the system
 */
router.route("/getSenderMessages").get(verify, async (req, resp) => {
  const senderEmail = req.user.email;
  try {
    const result = await messageBL.getAllSenderMesseges(senderEmail);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});

/**
 * get all unread messages received by the user connected to the system
 */
router.route("/getUnreadMassages").get(verify, async (req, resp) => {
  const reciverEmail = req.user.email;
  try {
    const result = await messageBL.getAllUnreadMesseges(reciverEmail);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});

/**
 * get reciver's unread message by id and change isSeen field to true
 */
router.route("/readMessage").get(verify, async (req, resp) => {
  const id = req.headers.id;
  try {
    const result = await messageBL.readMessageByID(id);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});

/**
 * get reciver's first message that wasn't read yet and change isSeen field to true
 */
router.route("/readFirstMessage").get(verify, async (req, resp) => {
  const reciverEmail = req.user.email;
  try {
    const result = await messageBL.readMessage(reciverEmail);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});

/**
 * delete message from database by id
 */
router.route("/deleteMessage").delete(verify, async (req, resp) => {
  const currUserEmail = req.user.email;
  const id = req.headers.messageid;
  try {
    const result = await messageBL.deleteMessage(id, currUserEmail);
    return resp.json(result);
  } catch (err) {
    return resp.json(err);
  }
});
module.exports = router;
