(function(window) {
	
	function DDRSlot(barWidth,barheight)
	{
		this._barWidth = barWidth;
		this._barheight = barheight;	
        this.UIBase_constructor();
	}
	
	var p = createjs.extend(DDRSlot, UIBase);
	
	p._barWidth;
	p._barheight;
	// p._asset;
	p._arrow_shape;
	p._background_shape;
	
	
	p.elementsSetup = function()
	{
		this.UIBase_elementsSetup();
		this._background_shape = new createjs.Shape();
		this._background_shape.graphics.beginFill("#838383").drawRect(0, 0, this._barWidth, this._barheight);
		this._background_shape.x = 0;
		this._background_shape.y = 0;
		this.addChild(this._background_shape);
		
		this._arrow_shape = new createjs.Shape();
		this._arrow_shape.graphics.beginFill("#ff0000").drawRect(0, 0, this._barWidth, this.this._barWidth);
		this._arrow_shape.x = 0;
		this._arrow_shape.y = 0;
		this.addChild(this._arrow_shape);
	}
	
	p.setProgress = function($value)
	{
		// this._bar_shape.scaleX = $value;
	}
	
	p.tick = function()
	{
		
	}
	// p.addFocusListener = function()
	// {
		
	// }
	
	// p.removeFocusListener = function()
	// {
		
	// }
	
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