// const { combine, runEffects, createDefaultScheduler } = require('@most/core');
// const { input } = require('@most/dom-event');
const nodemailer = require('nodemailer');
const smtpConfig = require('./smtpConfig.json');
const sendMailConfig = require('./sendMailConfig.json');

const transporter = nodemailer.createTransport(smtpConfig);

transporter.sendMail(sendMailConfig.alive, (err, info) => {
  console.log(err)
  console.log(info)
    // console.log(info.envelope);
    // console.log(info.messageId);
});
