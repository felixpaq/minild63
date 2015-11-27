(function(window) {
	
	function SweetSpotStep($tweakers,$name)
	{
        this.MiniGameStepBase_constructor($tweakers,$name);
	}
	var p = createjs.extend(SweetSpotStep, MiniGameStepBase);
	p.name;
	p._tweakers;
	p._currentGaugeIncrement;
	p._currentGaugeValue;
	p._gaugeBar;
	p.staminaCost;
	p.elementsSetup = function()
	{
		this.MiniGameStepBase_elementsSetup();
		// console.log(this._tweakers.size_of_sweet_spot_start);
		// console.log(this._tweakers.size_of_sweet_spot_end);
		// console.log(this._tweakers.speed_of_pointer);
		// console.log(this._tweakers.stamina_cost);
		
		this.staminaCost = this._tweakers.stamina_cost;
		this._gaugeBar = new GaugeBar(500,50);
		this._gaugeBar.x = 230;
		this._gaugeBar.y = 610;
		this.addChild(this._gaugeBar);
		this._currentGaugeValue = 0;
		this._currentGaugeIncrement = this._tweakers.speed_of_pointer;
	}	
	
	p.addFocusListener = function()
	{
		window.addEventListener("keypress",this.onKeyPress.bind(this),false);
	}
	
	p.removeFocusListener = function()
	{
		window.removeEventListener("keypress");
	}
	
	p.onKeyPress = function(event)
	{
		if(event.keyCode == 97)
		{
			if(this._gaugeBar.currentPointerPosition<this._tweakers.size_of_sweet_spot_end&&this._gaugeBar.currentPointerPosition>this._tweakers.size_of_sweet_spot_start)
			{
				this.dispatchEvent(MiniGameStepBase.DONE);
			}
			else
			{
				this.dispatchEvent(MiniGameStepBase.TAKE_STAMINA_COST);
			}
		}
	}
	
	p.destroy = function()
	{ 
		this.MiniGameStepBase_destroy();
		this.removeChild(this._gaugeBar);
	}
	
	p.tick = function(event)
	{
		this._currentGaugeValue+=this._currentGaugeIncrement;
		if(this._currentGaugeValue>= 0.99)
		{
			this._currentGaugeIncrement = -this._currentGaugeIncrement;
		}
		if(this._currentGaugeValue<=0.01){
			this._currentGaugeIncrement = -this._currentGaugeIncrement;
		}
		this._gaugeBar.setPointerPosition(this._currentGaugeValue);
	}
	
	window.SweetSpotStep = createjs.promote(SweetSpotStep, "MiniGameStepBase");
}(window));


//Line 14 calls promote, which identifies all of the methods in SweetSpotStep that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.