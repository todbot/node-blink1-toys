/**
 * Show how to use multiple blink(1)s in a single program.
 *  Tod E. Kurt, todbot.com / thingm.com
 */

 "use strict";

var Blink1 = require('node-blink1');
var PatternPlayer = require('./patternPlayer');

var devices = Blink1.devices();

var blink1s = [];
var players = [];

devices.map( function(serial) {
    var blink1 = new Blink1(serial);
    blink1s.push( blink1 );
    players.push( new PatternPlayer(blink1) );
});

if( devices.length < 2 ) {
    console.log("not enough blink(1)s");
    process.exit();
}
console.log("Found blink1s: ",devices);

var pattern0 = {
    steps: [
        {color: "#00ff00", time:0.3, led:0},
        {color: "#000000", time:0.3, led:0},
    ],
    repeats: 9
};
var pattern1 = {
    steps: [
        {color: "#ff00ff", time:0.2, led:0},
        {color: "#880000", time:0.5, led:1},
        {color: "#000000", time:0.3, led:0},
    ],
    repeats: 4
};


setTimeout( function() {
    players[0].playPattern( pattern0 );
}, 500);

setTimeout( function() {
    players[1].playPattern( pattern1 );
}, 1000);



// const blink1s = [];
