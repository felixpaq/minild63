
(function(window) {
	MiniGameBase.prototype._assets;
	MiniGameBase.prototype._tweakers;
	function MiniGameBase(tweakers,assets)
	{
        this.Container_constructor();
        this._assets = assets;
        this._tweakers = tweakers;
	}
	var p = createjs.extend(MiniGameBase, createjs.Container);
		
	p.init = function()
	{
		// console.log("DO I GET CALLED");
		// console.log("this");
		// console.log(this);
		// this._bg_graphics = new createjs.Graphics().beginFill("#bb162b").drawRect(0, 0, 100, 100);
		// this._bg_shape = new createjs.Shape(this._bg_graphics);
		// this.addChild(this._bg_shape);
		
		// this._fg_graphics = new createjs.Graphics().beginFill("#0000FF").drawRect(0, 0, 50, 50);
		// this._fg_shape = new createjs.Shape(this._fg_graphics);
		// this.addChild(this._fg_shape);
	}
	
	window.MiniGameBase = createjs.promote(MiniGameBase, "Container");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.