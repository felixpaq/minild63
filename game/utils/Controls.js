(function(window) {


function Controls() {
	if (arguments.callee.instance)
		return arguments.callee.instance;
	arguments.callee.instance = this;
}


Controls.KEYB_BUTTON = {};
Controls.UP = 38;
Controls.DOWN = 40;
Controls.LEFT = 37;
Controls.RIGHT = 39;
Controls.SPACE = 32;
Controls.W = 87;
Controls.A = 65;
Controls.S = 83;
Controls.D = 68;
/**
 * Singleton instance getter
 * @static
 * @public
 * @return {Controls}
 */
Controls.getInstance = function() {
	return new Controls();
}

/**
 * @static
 * @public
 * @return void
 */
Controls.initialize = function() {
	var _this = new Controls();
}

Controls.prototype.onKeyPress = function(event) {
    var keyEvent = new Event("keyPress");
    keyEvent.keyCode = event.keyCode;
    this.dispatchEvent(keyEvent);
}

Controls.prototype.onKeyboard = function(event) {
    if(event.type == "keydown")
    {
        Controls.KEYB_BUTTON[event.keyCode] = true;    
    }
    else
    {
        Controls.KEYB_BUTTON[event.keyCode] = false;
    }
    
  /*  console.log(Controls.KEYB_BUTTON);
    console.log(Controls.D);
    console.log(event.keyCode);*/
}

Controls.prototype.addEvents = function() {
    var that = this;
	window.addEventListener("keydown", that.onKeyboard, false);
    window.addEventListener("keypress", this.onKeyPress, false);
    window.addEventListener("keyup", that.onKeyboard, false);
}





window.Controls = Controls;

}(window));