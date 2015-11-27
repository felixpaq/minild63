(function(window) {
	
	function MiniGameStepBase($tweakers,$name)
	{
        this.UIBase_constructor();
		p.name = $name;
		p._tweakers = $tweakers;
	}
	MiniGameStepBase.DONE = "done";
	MiniGameStepBase.TAKE_STAMINA_COST = "take_stamina_cost";
	var p = createjs.extend(MiniGameStepBase, UIBase);
	p.name;
	p._tweakers;
	p.tick = function()
	{
		
	}
	window.MiniGameStepBase = createjs.promote(MiniGameStepBase, "UIBase");


}(window));


//Line 14 calls promote, which identifies all of the methods in MiniGameStepBase that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.