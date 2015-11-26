(function(window) {
	
	function ProgressBar(barWidth,barheight)
	{
		this._barWidth = barWidth;
		this._barheight = barheight;	
        this.UIBase_constructor();
	}
	
	var p = createjs.extend(ProgressBar, UIBase);
	
	// p._background_graphics;
	
	p._barWidth;
	p._barheight;
	;
	
	p._bar_shape;
	p._background_shape;
	// p.pointer_graphics;
	
	p.elementsSetup = function()
	{
		this.UIBase_elementsSetup();
		this._background_shape = new createjs.Shape();
		this._background_shape.graphics.beginFill("#838383").drawRect(0, 0, this._barWidth, this._barheight);
		this._background_shape.x = 0;
		this._background_shape.y = 0;
		this.addChild(this._background_shape);
		
		this._bar_shape = new createjs.Shape();
		this._bar_shape.graphics.beginFill("#ffffff").drawRect(0, 0, this._barWidth, this._barheight);
		this._bar_shape.x = 0;
		this._bar_shape.y = 0;
		this.addChild(this._bar_shape);
	}
	
	p.setProgress = function($value)
	{
		this._bar_shape.scaleX = $value;
		// *this._barWidth
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
	
	window.ProgressBar = createjs.promote(ProgressBar, "UIBase");


}(window));


//Line 14 calls promote, which identifies all of the methods in ProgressBar that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.