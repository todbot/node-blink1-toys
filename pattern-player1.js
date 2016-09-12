/**
 * Example of making your own color pattern player with node-blink1
 *  Tod E. Kurt, todbot.com / thingm.com
 */

var Blink1 = require('node-blink1');
var tinycolor = require('tinycolor2');

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

var blink1 = new Blink1();

var PatternPlayer = {
    count: 0,
    pos:0,
    pattern:null,
    playStep: function() {
        var step = this.pattern.steps[this.pos];
        console.log("playStep:", this.pos,step);
        var c = tinycolor(step.color).toRgb();
        blink1.fadeToRGB( step.time*1000, c.r,c.g,c.b, step.led );
        this.pos++;
        if( this.pos === this.pattern.steps.length ) { // end of pattern
            this.pos = 0;
            this.count++;
        }
        if( this.count < this.pattern.repeats ) {
            setTimeout( this.playStep.bind(this), step.time*1000 );
        }
    },
    playPattern: function(pattern) {
        this.pos = 0;
        this.count = 0;
        this.pattern = pattern;
        this.playStep();
    }
};

PatternPlayer.playPattern(pattern1);
