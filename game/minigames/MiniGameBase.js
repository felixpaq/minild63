
(function(window) {
	MiniGameBase.prototype._assetsAtlas;
	MiniGameBase.prototype._tweakers;
	function MiniGameBase(tweakers,assetsAtlas)
	{
        this.Container_constructor();
		p._assetsAtlas = assetsAtlas;
		p._tweakers = tweakers;
		// this.scaleX = this.scaleY = 0.65;
		this.on("added",this.init);
	}
	var p = createjs.extend(MiniGameBase, createjs.Container);
		
	p.init = function()
	{		
		this.on("removed",this.destroy);
		this.elementsSetup();
		this.addFocusListener();
	}
	
	p.elementsSetup = function()
	{
		
	}
	
	p.update = function()
	{
		
	}
	
	p.addFocusListener = function()
	{
		
	}
	
	p.removeFocusListener = function()
	{
		
	}
	
	p.destroy = function()
	{ 
		this.removeFocusListener();
	}
	
	window.MiniGameBase = createjs.promote(MiniGameBase, "Container");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.