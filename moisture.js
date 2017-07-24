const R = require('ramda');
const $ = require('sanctuary-def');
const Z = require('sanctuary-type-classes');
const nodemailer = require('nodemailer');
const { combine, runEffects, createDefaultScheduler } = require('@most/core');
const { input } = require('@most/dom-event');
const Gpio = require('onoff').Gpio
const smtpConfig = require('./smtpConfig.json');
const sendMailConfig = require('./sendMailConfig.json');

const def = $.create({checkTypes: true, env: $.env});

// Define the sensor pin
const sensor = new Gpio(17, 'in', 'both');

const transporter = nodemailer.createTransport(smtpConfig);

sensor.watch(function (err, value) {
  if (err) {
    throw err;
  }
	console.log(value);
	transporter.sendMail(sendMailConfig.alive, (err, info) => {
	  console.log(err)
	  console.log(info)
	    // console.log(info.envelope);
	    // console.log(info.messageId);
	});
});
