(function(window) {
	function GlassesMiniGame(tweakers,assetsAtlas,stageRef)
	{
		this.stageRef = stageRef;
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(GlassesMiniGame.prototype);
		createjs.EventDispatcher.initialize(GlassesMiniGame);
		
	}
	
	var p = createjs.extend(GlassesMiniGame, MiniGameBase);
	// p._currentGaugeIncrement;
	// p._currentGaugeValue;
	// p._graphicsTest;
	p.stageRef;
	// p._gaugeBar;
	p._arrayOfTrash = [];
	p._glasses;
	p._bg;
	
	p._timeAtStart;
	
	
	
	p.init = function()
	{
		this.MiniGameBase_init();
		this._timeAtStart = new Date().getTime();
	}
	
	
	p.elementsSetup = function()
	{
		this.MiniGameBase_elementsSetup();
		console.log(this._tweakers.stamina_cost);
		console.log(this._tweakers.stamina_regen);
		console.log(this._tweakers.stamina_total);
		console.log(this._tweakers.time_to_do_the_game);
		console.log(this._tweakers.nb_piece_of_trash);
		var tempShape;
		this._bg = new createjs.Shape();
		this._bg.graphics.beginFill("#000000").drawRect(0, 0, 960,680);
		
		this.addChild(this._bg);
		
		this._glasses = new createjs.Shape();
		this._glasses.graphics.beginFill("#00ff00").drawRect(0, 0, 100, 100);
		this._glasses.x = Math.random()*300;
		this._glasses.y = Math.random()*200;
		this.addChild(this._glasses);
		for(var i = 0;i<this._tweakers.nb_piece_of_trash;i++)
		{
			tempShape = new createjs.Shape();
			tempShape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
			tempShape.x = Math.random()*300;
			tempShape.y = Math.random()*200;
			tempShape.on("click",this.onClickTrash.bind(this));
			this.addChild(tempShape);
			this._arrayOfTrash.push(tempShape);
		}
	}
	
	p.addFocusListener = function()
	{
		this.MiniGameBase_addFocusListener();
		
		// this._glasses.removeEventListener("click",this.onHandleMouse.bind(this));
		// createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	}
	
	p.update = function()
	{
		this.MiniGameBase_update();
		if(new Date().getTime()-this._timeAtStart >  this._tweakers.time_to_do_the_game)
		{
			this.dispatchEvent("fail");
		}
	}
	
	p.onClickTrash = function(event)
	{
		event.target.visible = false;
		var isStillIntersecting = false;
		var rectOfTrash;
		var rectOfGlasses = new createjs.Rectangle(this._glasses.x,this._glasses.y,100,100);;
		for(var i = 0;i<this._arrayOfTrash.length;i++)
		{
			if(this._arrayOfTrash[i].visible)
			{
				rectOfTrash = new createjs.Rectangle(this._arrayOfTrash[i].x,this._arrayOfTrash[i].y,100,100);
				if(rectOfGlasses.intersects(rectOfTrash))
				{
					isStillIntersecting = true;
				}
			}
		}
		
		if(!isStillIntersecting)
		{
			this._glasses.addEventListener("click",this.onHandleMouse.bind(this));
		}
	}
	
	p.onHandleMouse = function(event)
	{
		this.dispatchEvent("success");
	}
	
	p.removeFocusListener = function()
	{
		this.MiniGameBase_removeFocusListener();
		this._glasses.removeEventListener("click",this.onHandleMouse.bind(this));
	}
	
	p.destroy = function(event)
	{ 
		this.MiniGameBase_destroy(event);
		var child;
		while(child = this._arrayOfTrash.pop())
		{
			child.removeAllEventListeners();
			this.removeChild(child);
			
		}
		this.removeChild(this._bg);
		this.removeChild(this._glasses);
		// this.removeChild(this._graphicsTest);
	}
	
	window.GlassesMiniGame = createjs.promote(GlassesMiniGame, "MiniGameBase");
}(window));