/**
 * Example of making your own color pattern player with node-blink1
 *  Tod E. Kurt, todbot.com / thingm.com
 */
 "use strict";

var Blink1 = require('node-blink1');
var tinycolor = require('tinycolor2');

function PatternPlayer(blink1) {
    this.count = 0;
    this.pos = 0;
    this.pattern = null;
    this.blink1 = blink1;

    this.playPattern = function(pattern) {
        this.pattern = pattern;
        this.pos = 0;
        this.count = 0;
        this.pattern = pattern;
        this._playStep();
    };

    this._playStep = function() {
        var step = this.pattern.steps[this.pos];
        console.log("playStep:", this.pos,step);
        var c = tinycolor(step.color).toRgb();
        this.blink1.fadeToRGB( step.time*1000, c.r,c.g,c.b, step.led );
        this.pos++;
        if( this.pos === this.pattern.steps.length ) { // end of pattern
            this.pos = 0;
            this.count++;
        }
        if( this.count < this.pattern.repeats ) {
            setTimeout( this._playStep.bind(this), step.time*1000 );
        }
    };
}

// for demo when called with "node ./patternPlayer.js"
if (require.main === module) {

    var blink1 = new Blink1();
    var player = new PatternPlayer(blink1);

    // the pattern you want to play
    var pattern1 = {
        steps: [
            {color: "#ff00ff", time:0.3, led:0},
            {color: "#0000ff", time:0.5, led:0},
            {color: "#ff0000", time:0.5, led:0},
            {color: "#00ff00", time:0.5, led:1},
            {color: "#000000", time:0.5, led:1},
            {color: "#00ff00", time:0.5, led:2},
            {color: "#000000", time:0.5, led:2},
        ],
        repeats: 3
    };

    player.playPattern(pattern1);
}

module.exports = PatternPlayer;
