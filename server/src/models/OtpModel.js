const { Schema, model } = require('mongoose');

const OtpSchema = Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdOn: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const OtpModel = model('otps', OtpSchema);
module.exports = OtpModel;
