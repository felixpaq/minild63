(function(window) {
	function RemoteMiniGame(tweakers,assetsAtlas,stageRef)
	{
		this.stageRef = stageRef;
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(RemoteMiniGame.prototype);
		createjs.EventDispatcher.initialize(RemoteMiniGame);
		this._currentAction = this.bret;
	}
	
	var p = createjs.extend(RemoteMiniGame, MiniGameBase);
	
	p._graphicsTest;
	p.stageRef;
	
	p._currentstep;
	
	p.init = function()
	{
		this.MiniGameBase_init();
	}
	
	p.elementsSetup = function()
	{
		console.log(this._tweakers);
		
		
		this.MiniGameBase_elementsSetup();
		this._graphicsTest = new createjs.Bitmap(this._assetsAtlas["minigame_0_test_asset"]);
		this.addChild(this._graphicsTest);
		// this._currentstep = new SweetSpotStep(this._tweakers.sweet_spot,"");
		this._currentstep = new DDRStep(this._tweakers.ddr,"test");
		this.addChild(this._currentstep);
		// this.removeChild(this._currentstep);
	}
	
	p.tick = function(event)
	{
		if(this._currentstep)
		{
			this._currentstep.tick();
		}
	}
	
	p.addFocusListener = function()
	{
		this.MiniGameBase_addFocusListener();
		this._currentstep.addEventListener(MiniGameStepBase.DONE,this.onStepDone.bind(this))
		this._currentstep.addEventListener(MiniGameStepBase.TAKE_STAMINA_COST,this.onTakeStaminaCost.bind(this));
		createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	}

	p.removeFocusListener = function()
	{
		this.MiniGameBase_removeFocusListener();
		if(this._currentstep)
		{
			this._currentstep.removeEventListener(MiniGameStepBase.DONE)
			this._currentstep.removeEventListener(MiniGameStepBase.TAKE_STAMINA_COST);
		}
	}
	
	p.onStepDone = function(event)
	{
		this.removeChild(this._currentstep);
		this._currentstep = null;
		this.dispatchEvent("success");
	}
	p.onTakeStaminaCost = function(event)
	{
		console.log(event.target.staminaCost);
	}
	p.test = function()
	{ 
		
		
	}
	
	p.destroy = function()
	{ 
		this.MiniGameBase_destroy();
		this.removeChild(this._graphicsTest);
	}
	
	window.RemoteMiniGame = createjs.promote(RemoteMiniGame, "MiniGameBase");
}(window));