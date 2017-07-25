const R = require('ramda');
const { debounce, filter, fromEvent, merge, map, observe, chain, skipRepeats } = require('most');
// const nodemailer = require('nodemailer');
var five = require("johnny-five");
var Raspi = require("raspi-io");
const say = require("say");

var board = new five.Board({
  io: new Raspi()
});

const ready$ = fromEvent('ready', board);
const moisture$ = ready$.take(1).map(() => new five.Sensor.Digital('GPIO17'))
const data$ = chain(s => fromEvent('data', s), moisture$)
const changes$ = skipRepeats(data$);
const msg$ = map(R.ifElse(
  R.equals(1),
  R.always('Holy Beep! It\'s dry in here!'),
  R.always('Ahhh! That\'s better')), changes$);
// observe(say, msgs$);
observe(console.log, msg$);
// const smtpConfig = require('./smtpConfig.json');
// const sendMailConfig = require('./sendMailConfig.json');

// const transporter = nodemailer.createTransport(smtpConfig);
