const userDAL = require("../DAL/userDAL");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const addNewUser = async function (user) {
  const email = user.email;

  //check if the user already exists in the database
  const userFromDB = await userDAL.getUserByEmail(email);
  if (userFromDB) {
    throw `User with email : ${email} already exists in the system.`;
  }
  //hash passwords
  const salt = await bcrypt.genSaltSync(10);
  const hashedPaasword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPaasword;
  return await userDAL.addUserToDB(user);
};

const login = async function (user) {
  const email = user.email;

  //check if the user exists in the database
  const userFromDB = await userDAL.getUserByEmail(email);
  if (!userFromDB) {
    throw `Email: ${email}, does not exists in the system.`;
  }
  //check if password valid
  const validPassword = await bcrypt.compareSync(
    user.password,
    userFromDB.password
  );
  if (!validPassword) return "invalid password";

  //create jwt token
  const token = jwt.sign(
    { _id: userFromDB._id, email: userFromDB.email },
    process.env.ENV_JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  return token;
};
module.exports = { addNewUser, login };
