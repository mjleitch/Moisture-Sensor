const R = require('ramda');
const { fromEvent, observe, chain, skipRepeats } = require('most');
// const nodemailer = require('nodemailer');
var five = require("johnny-five");
var Raspi = require("raspi-io");

var board = new five.Board({
  io: new Raspi()
});

const ready$ = fromEvent('ready', board);
const moisture$ = ready$.take(1).map(() => new five.Sensor.Digital('GPIO17'))
const data$ = chain(s => fromEvent('data', s), moisture$)
const changes$ = skipRepeats(data$);
observe(console.log, changes$);

// const smtpConfig = require('./smtpConfig.json');
// const sendMailConfig = require('./sendMailConfig.json');

// const transporter = nodemailer.createTransport(smtpConfig);
