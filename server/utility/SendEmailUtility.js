const nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSub) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'ekramullah69@gmail.com',
      pass: 'cosunbvlukikoqpg',
    },
  });

  let mailOptions = {
    from: 'Task Manager <ekramullah69@gmail.com>',
    to: EmailTo,
    subject: EmailSub,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
