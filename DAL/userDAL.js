const Users = require("../Models/usersModel");

const getUserById = function (id) {
  return new Promise((resolve, reject) => {
    Users.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addUserToDB = function (user) {
  return new Promise((resolve, reject) => {
    const newUser = new Users(user);

    newUser.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserByEmail = function (email) {
  return new Promise((resolve, reject) => {
    Users.findOne(
      {
        email: email,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = { addUserToDB, getUserByEmail, getUserById };
