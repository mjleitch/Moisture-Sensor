const R = require('ramda');
const { debounce, filter, fromEvent, merge, map, observe, chain, skipRepeats } = require('most');
const five = require("johnny-five");
const Raspi = require("raspi-io");
const say = require("say");

// Setup the board
const board = new five.Board({
  io: new Raspi()
});

// Create a ready stream
const ready$ = fromEvent('ready', board);

// Map to the sensor
const moisture$ = ready$.take(1).map(() => new five.Sensor.Digital('GPIO17'))

// Capture the data
const data$ = chain(s => fromEvent('data', s), moisture$)

// Skip repeat values
const changes$ = skipRepeats(data$);

// Choose a message
const msg$ = map(R.ifElse(
  R.equals(1),
  R.always('Holy Beep! It\'s dry in here!'),
  R.always('Ahhh! That\'s better')), changes$);

// Speak and Log
// observe(say, msgs$);
observe(console.log, msg$);
