(function(window) {
	
	function GaugeBar(barWidth,barheight)
	{
		this._barWidth = barWidth;
		this._barheight = barheight;
		
		console.log("YEAT")
        this.UIBase_constructor();
	}
	
	var p = createjs.extend(GaugeBar, UIBase);
	
	// p._background_graphics;
	
	p._barWidth;
	p._barheight;
	p._green_shape;
	p._green_shape;
	p._green_shape;
	p._yellow_shape;
	
	p.pointer_shape;
	p.currentPointerPosition;
	// p.pointer_graphics;
	
	p.elementsSetup = function()
	{
		this.UIBase_elementsSetup();
		
		this._background_shape = new createjs.Shape();
		this._background_shape.graphics.beginFill("#ff0000").drawRect(0, 0, this._barWidth*1, this._barheight);
		this._background_shape.x = 0;
		this._background_shape.y = 0;
		this.addChild(this._background_shape);
		
		this._yellow_shape = new createjs.Shape();
		this._yellow_shape.graphics.beginFill("#eeee2b").drawRect(-(this._barWidth*0.20), 0, this._barWidth*0.40, this._barheight);
		this._yellow_shape.x = this._barWidth/2;
		this._yellow_shape.y = 0;
		this.addChild(this._yellow_shape);
		
		this._green_shape = new createjs.Shape();
		this._green_shape.graphics.beginFill("#16ee2b").drawRect(-(this._barWidth*0.075), 0, this._barWidth*0.15, this._barheight);
		this._green_shape.x = this._barWidth/2;
		this._green_shape.y = 0;
		this.addChild(this._green_shape);
		// this.pointer_shape.graphics.beginFill("#16ee2b").drawRect(0, 0, 10, 25);
		
		this.pointer_shape = new createjs.Shape();
		this.pointer_shape.graphics.beginFill("#ffffff").drawRect(-(this._barWidth*0.0125), 0, this._barWidth*0.025, this._barheight);
		this.pointer_shape.x = this._barWidth/2;
		this.pointer_shape.y = 0;
		this.addChild(this.pointer_shape);
	}
	
	p.setPointerPosition  = function($value)
	{
		this.currentPointerPosition = $value;
		this.pointer_shape.x = $value*this._barWidth;
		
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
	}
	
	window.GaugeBar = createjs.promote(GaugeBar, "UIBase");


}(window));


//Line 14 calls promote, which identifies all of the methods in GaugeBar that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.