(function(window) {
	
	function DDRStep($tweakers,$name)
	{
        this.MiniGameStepBase_constructor($tweakers,$name);
		// this._currentCounter = 0;
	}
	var p = createjs.extend(DDRStep, MiniGameStepBase);
	// p.name;
	// p._tweakers;
	// p._currentGaugeIncrement;
	// p._currentGaugeValue;
	// p._gaugeBar;
	p.staminaCost;
	p._currentNbOfGoodArrow;
	p._lastArrowTime;
	p._slot_array;
	p._ddrSlot0;
	p._ddrSlot1;
	p._ddrSlot2;
	p._ddrSlot3;
	p.elementsSetup = function()
	{
		this.MiniGameStepBase_elementsSetup();
		console.log(this._tweakers.stamina_cost);
		console.log(this._tweakers.speed_of_arrow);
		console.log(this._tweakers.arrow_success_treshold);
		console.log(this._tweakers.time_between_arrow);
		console.log(this._tweakers.nb_to_complete);
		this._slot_array = [];
		
		this.staminaCost = this._tweakers.stamina_cost;
		this._ddrSlot0 = new DDRSlot(this._tweakers.speed_of_arrow,this._tweakers.arrow_success_treshold,50,300,81);
		this.addChild(this._ddrSlot0);
		this._slot_array.push(this._ddrSlot0);
		
		this._ddrSlot1 = new DDRSlot(this._tweakers.speed_of_arrow,this._tweakers.arrow_success_treshold,50,300,87);
		this._ddrSlot1.x = 60;
		this.addChild(this._ddrSlot1);
		this._slot_array.push(this._ddrSlot1);
		
		this._ddrSlot2 = new DDRSlot(this._tweakers.speed_of_arrow,this._tweakers.arrow_success_treshold,50,300,69);
		this._ddrSlot2.x = 120;
		this.addChild(this._ddrSlot2);
		this._slot_array.push(this._ddrSlot2);
		
		this._ddrSlot3 = new DDRSlot(this._tweakers.speed_of_arrow,this._tweakers.arrow_success_treshold,50,300,82);
		this._ddrSlot3.x = 180;
		this.addChild(this._ddrSlot3);
		this._slot_array.push(this._ddrSlot3);
		
		this._lastArrowTime = new Date().getTime();
		this._currentNbOfGoodArrow = 0;
		
		
		// this._gaugeBar = new GaugeBar(500,50);
		// this._gaugeBar.x = 230;
		// this._gaugeBar.y = 610;
		// this.addChild(this._gaugeBar);
		// this._currentGaugeValue = 0;
		// this._currentGaugeIncrement = this._tweakers.speed_of_pointer;
	}	
	
	p.addFocusListener = function()
	{
		this._ddrSlot0.addEventListener(DDRSlot.FAIL,this.onSlotFail.bind(this));
		this._ddrSlot0.addEventListener(DDRSlot.SUCCESS,this.onSlotSucess.bind(this));
		this._ddrSlot1.addEventListener(DDRSlot.FAIL,this.onSlotFail.bind(this));
		this._ddrSlot1.addEventListener(DDRSlot.SUCCESS,this.onSlotSucess.bind(this));
		this._ddrSlot2.addEventListener(DDRSlot.FAIL,this.onSlotFail.bind(this));
		this._ddrSlot2.addEventListener(DDRSlot.SUCCESS,this.onSlotSucess.bind(this));
		this._ddrSlot3.addEventListener(DDRSlot.FAIL,this.onSlotFail.bind(this));
		this._ddrSlot3.addEventListener(DDRSlot.SUCCESS,this.onSlotSucess.bind(this));
		// window.addEventListener("keypress",this.onKeyPress.bind(this),false);
	}
	
	p.onSlotFail = function(event)
	{
		console.log("I HEPPEN FAIL");
		this.dispatchEvent(MiniGameStepBase.TAKE_STAMINA_COST);
	}
	
	p.onSlotSucess = function(event)
	{
		this._currentNbOfGoodArrow++;
		console.log("I HEPPEN")
		if(this._currentNbOfGoodArrow>=this._tweakers.nb_to_complete)
		{
			this.dispatchEvent(MiniGameStepBase.DONE);
		}
	}
	
	p.removeFocusListener = function()
	{
		// window.removeEventListener("keypress");
	}

	p.startRandomSlot = function()
	{
		var slotÌndex = Math.floor(Math.random()*4);
		var slot = this._slot_array[slotÌndex];
		while(slot.isActive)
		{
			slotÌndex = Math.floor(Math.random()*4);
			slot = this._slot_array[slotÌndex];
		}
		slot.start();
	}
	p.checkToStart = function()
	{
		
		var timer = new Date().getTime();
		if(timer-this._lastArrowTime>this._tweakers.time_between_arrow)
		{
			this.startRandomSlot();
			this._lastArrowTime = timer; 
		}
	}
	
	p.destroy = function()
	{ 
		this.MiniGameStepBase_destroy();
		// this.removeChild(this._ddrSlot0);
	}
	
	p.tick = function(event)
	{
		this.checkToStart();
		for(var i = 0;i<this._slot_array.length;i++)
		{
			if(this._slot_array[i].isActive)
			{
				this._slot_array[i].tick();
			}
		}
	}
	
	window.DDRStep = createjs.promote(DDRStep, "MiniGameStepBase");
}(window));


//Line 14 calls promote, which identifies all of the methods in DDRStep that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.