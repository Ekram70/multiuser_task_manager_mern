const UsersModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');

const registration = (req, res) => {
  let reqBody = req.body;

  UsersModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: 'fail', data: err });
    } else {
      let { email, firstName, lastName, mobile, photo } = reqBody;
      let payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: email,
      };
      let token = jwt.sign(payload, 'Sekret');
      res.status(200).json({
        status: 'success',
        token: token,
        data: {
          email,
          firstName,
          lastName,
          mobile,
          photo,
        },
      });
    }
  });
};

const login = (req, res) => {
  let reqBody = req.body;
  UsersModel.aggregate(
    [
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(200).json({
          status: 'fail',
          data: data,
        });
      } else {
        if (data.length > 0) {
          let payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: data[0]['email'],
          };
          let token = jwt.sign(payload, 'Sekret');
          res.status(200).json({
            status: 'success',
            token: token,
            data: data[0],
          });
        } else {
          res.status(401).json({
            status: 'unauthorized',
          });
        }
      }
    }
  );
};

const profileUpdate = (req, res) => {
  const email = req.headers['email'];
  const reqBody = req.body;
  UsersModel.updateOne({ email }, reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: 'fail', data: err });
    } else {
      res.status(200).json({ status: 'success', data: data });
    }
  });
};

module.exports = {
  registration,
  login,
  profileUpdate,
};
