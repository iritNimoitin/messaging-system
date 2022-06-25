const express = require("express");
const res = require("express/lib/response");
const userBL = require("../BL/userBL");
const { ValidateBody, UserSchemas } = require("../configs/validations");

const router = express.Router();

/**
 * add new user to database
 */
router
  .route("/register")
  .post(ValidateBody(UserSchemas.signupSchema), async (req, resp) => {
    const user = req.body;
    try {
      const result = await userBL.addNewUser(user);
      return resp.json(result);
    } catch (err) {
      return resp.json(err);
    }
  });

/**
 * login to system
 */
router
  .route("/login")
  .post(ValidateBody(UserSchemas.loginSchema), async (req, resp) => {
    const user = req.body;
    const result = await userBL.login(user);
    try {
      return resp.json(result);
    } catch (err) {
      return resp.json(err);
    }
  });
module.exports = router;
