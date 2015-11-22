
(function(window) {
	MiniGameBase.prototype._assetsAtlas;
	MiniGameBase.prototype._tweakers;
	function MiniGameBase(tweakers,assetsAtlas)
	{
        this.Container_constructor();
		p._assetsAtlas = assetsAtlas;
		p._tweakers = tweakers;
	}
	var p = createjs.extend(MiniGameBase, createjs.Container);
		
	p.init = function()
	{		
		
	}
	
	window.MiniGameBase = createjs.promote(MiniGameBase, "Container");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.