(function(window) {
	
	function DDRSlot(speed,treshHold,barWidth,barheight,keyCode)
	{
		this._treshHold = treshHold;
		this._speed = speed;
		this._keyCode = keyCode;	
		this._barWidth = barWidth;
		this._barheight = barheight;	
		this.isActive = false;
        this.UIBase_constructor();
	}
	DDRSlot.FAIL = "fail";
	DDRSlot.SUCCESS = "success";
	var p = createjs.extend(DDRSlot, UIBase);
	
	p.isActive;
	p.currentPos;
	p._treshHold;
	p._speed;
	p._barWidth;
	p._barheight;
	p._keyCode;
	p._arrow_shape;
	p._background_shape;
	p._keyboardEventHandler;
	
	
	p.elementsSetup = function()
	{
		this.UIBase_elementsSetup();
		this.currentPos = 0;
		this._background_shape = new createjs.Shape();
		this._background_shape.graphics.beginFill("#838383").drawRect(0, 0, this._barWidth, this._barheight);
		this._background_shape.x = 0;
		this._background_shape.y = 0;
		this.addChild(this._background_shape);
		
		this._arrow_shape = new createjs.Shape();
		this._arrow_shape.graphics.beginFill("#ffff00").drawRect(0, 0, this._barWidth, this._barWidth);
		this._arrow_shape.x = 0;
		this._arrow_shape.y = 0;
		this.addChild(this._arrow_shape);
		this._arrow_shape.visible = false;
	}
	
	p.start = function()
	{
		this.currentPos = 0;
		this.isActive = true;
		this._arrow_shape.visible = true;
		this._keyboardEventHandler = this.onKeyPress.bind(this);
		document.addEventListener("keydown",this._keyboardEventHandler);
	}
	
	p.removeKeyboardHandler = function()
	{
		if(this._keyboardEventHandler)
		{
			document.removeEventListener("keydown",this._keyboardEventHandler);
			this._keyboardEventHandler = null
		}
	}
	
	p.sleep = function()
	{
		this.removeKeyboardHandler();
		this.isActive = false;
		this._arrow_shape.visible = false;
	}
	
	p.onKeyPress = function(event)
	{
		// console.log(event.keyCode);
		// console.log("this._treshHold");
		// console.log(this._treshHold);
		// console.log("this.currenPos");
		// console.log(this.currenPos);
		// console.log("this._keyCode");
		// console.log(this._keyCode);
		// console.log("event.keyCode");
		// console.log(event.keyCode);
		if(this._keyCode == event.keyCode&&this.currentPos>this._treshHold)
		{
			this.sleep();
			this.dispatchEvent(DDRSlot.SUCCESS);			
		}
		// document.onKeyPress = null;
	}
	
	p.setProgress = function($value)
	{
		// this._bar_shape.scaleX = $value;
	}
	
	p.tick = function()
	{	
		// console.log("I TICK FOR VON ",this._keyCode);
		this.currentPos+=this._speed;
		if(this.currentPos>=1)
		{
			this.sleep();
			this.dispatchEvent(DDRSlot.FAIL);
			
		}
		// console.log(this.currentPos*(this._barHeight-this._barWidth));
		this._arrow_shape.y = this.currentPos*(this._barheight-this._barWidth);
	}
	// p.addFocusListener = function()
	// {
		
	// }
	
	p.removeFocusListener = function()
	{
		this.removeKeyboardHandler();
	}
	
	p.destroy = function()
	{ 
		this.UIBase_destroy();
		this.removeChild(this._background_shape);
		this.removeChild(this._bar_shape);
	}
	
	window.DDRSlot = createjs.promote(DDRSlot, "UIBase");


}(window));


//Line 14 calls promote, which identifies all of the methods in ProgressBar that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.