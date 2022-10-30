const UsersModel = require('../models/UsersModel');
const OtpModel = require('../models/OtpModel');
const jwt = require('jsonwebtoken');
const sendEmailUtility = require('../../utility/SendEmailUtility');

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

const profileDetails = (req, res) => {
  let email = req.headers['email'];
  UsersModel.aggregate(
    [
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
          password: 1,
          email: 1,
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(200).json({ status: 'fail', data: err });
      } else {
        res.status(200).json({ status: 'success', data: data });
      }
    }
  );
};

const verifyEmail = async (req, res) => {
  let { email } = req.params;

  let OtpCode = Math.floor(100000 + Math.random() * 900000);

  try {
    let userCount = await UsersModel.aggregate([
      { $match: { email: email } },
      { $count: 'total' },
    ]);

    if (userCount.length === 1) {
      let createOtp = await OtpModel.create({ email: email, otp: OtpCode });
      let sendEmail = await sendEmailUtility(
        email,
        `Your OTP code is ${OtpCode}`,
        'Task Manager OTP Verification'
      );

      res.status(200).json({ status: 'success', data: sendEmail });
    } else {
      res.status(200).json({ status: 'fail', data: 'No user found' });
    }
  } catch (error) {
    res.status(200).json({ status: 'fail', data: error });
  }
};

const verifyOtp = async (req, res) => {
  let { email, otp } = req.params;

  try {
    let otpCount = await OtpModel.aggregate([
      { $match: { email: email, otp: otp, status: 0 } },
      { $count: 'total' },
    ]);

    if (otpCount.length === 1) {
      await OtpModel.updateOne(
        { email: email },
        { email: email, otp: otp, status: 1 }
      );

      res.status(200).json({ status: 'success', data: 'Otp Updated' });
    } else {
      res.status(200).json({ status: 'fail', data: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(200).json({ status: 'fail', data: error });
  }
};

const resetPassword = async (req, res) => {
  let { email, otp, password } = req.body;

  console.log(email, otp, password);

  try {
    let otpCount = await OtpModel.aggregate([
      { $match: { email: email, otp: otp, status: 1 } },
      { $count: 'total' },
    ]);

    if (otpCount.length === 1) {
      await UsersModel.updateOne(
        { email },
        {
          password: password,
        }
      );

      res
        .status(200)
        .json({ status: 'success', data: 'Password Updated Successfully' });
    } else {
      res.status(200).json({ status: 'fail', data: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(200).json({ status: 'fail', data: error });
  }
};

module.exports = {
  registration,
  login,
  profileUpdate,
  profileDetails,
  verifyEmail,
  verifyOtp,
  resetPassword,
};
