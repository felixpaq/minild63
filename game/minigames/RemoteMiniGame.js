(function(window) {
	function RemoteMiniGame(tweakers,assetsAtlas,stageRef)
	{
		this.stageRef = stageRef;
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(RemoteMiniGame.prototype);
		createjs.EventDispatcher.initialize(RemoteMiniGame);
		
	}
	
	var p = createjs.extend(RemoteMiniGame, MiniGameBase);
	p._currentGaugeIncrement;
	p._currentGaugeValue;
	p._graphicsTest;
	p.stageRef;
	p._gaugeBar;
	
	p.init = function()
	{
		this.MiniGameBase_init();
	}
	
	p.elementsSetup = function()
	{
		this.MiniGameBase_elementsSetup();
		this._graphicsTest = new createjs.Bitmap(this._assetsAtlas["minigame_0_test_asset"]);
		this.addChild(this._graphicsTest);
		
		this._gaugeBar = new GaugeBar(500,50);
		this._gaugeBar.x = 230;
		this._gaugeBar.y = 610;
		console.log("p.stageRef.width");
		console.log(this.stageRef.width);
		console.log("this._gaugeBar");
		console.log(this._gaugeBar.getBounds());
		this.addChild(this._gaugeBar);
		console.log("DO I EVEN HAPPEN");
		this._currentGaugeValue = 0;
		this._currentGaugeIncrement = 0.015;
		// shape.addEventListener("mousedown",function(event){
			// console.log("BREH BREH BREH");
			// console.log(event);
		// });
		// shape.addEventListener("click",function(event){
			// console.log("BREH BREH BREH");
			// console.log(event);
		// });
		// shape.addEventListener("mouseup",function(event){
			// console.log("BREH BREH BREH");
			// console.log(event);
		// });
		// shape.on("click", function(evt) {
			// alert("type: "+evt.type+" target: "+evt.target+" stageX: "+evt.stageX);
		// });
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
	p.handleMouseEvent = function(event)
	{
		console.log("WAAAAAAAAAAAAAA IS HAPPENING");
		console.log(event);
	}
	p.addFocusListener = function()
	{
		this.MiniGameBase_addFocusListener();
		this._graphicsTest.addEventListener("click",this.onHandleMouse.bind(this));	
		
		console.log(this._graphicsTest);
		createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	}
	
	p.onHandleMouse = function(event)
	{
		if(this._gaugeBar.currentPointerPosition<0.7&&this._gaugeBar.currentPointerPosition>0.3)
		{
			this.dispatchEvent("success");
		}
		else
		{
			this.dispatchEvent("fail");
		}
	}
	p.removeFocusListener = function()
	{
		this.MiniGameBase_removeFocusListener();
		this._graphicsTest.removeEventListener("click",this.onHandleMouse);	
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