(function(window) {
	function GlassesMiniGame(tweakers,assetsAtlas,stageRef)
	{
		this.stageRef = stageRef;
		console.log(this.stageRef);
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
	p._currentStamina;
	p._glasses;
	p._currentTrashDragging;
	p._isDragging = false;
	p._bg;
	
	p._timeAtStart;
	
	
	
	p.init = function()
	{
		this.MiniGameBase_init();
		this._timeAtStart = new Date().getTime();
	}
	
	
	p.elementsSetup = function()
	{
		this._currentStamina = this._tweakers.stamina_total;
		this.MiniGameBase_elementsSetup();
		console.log(this._tweakers.stamina_cost_pick_up);
		console.log(this._tweakers.stamina_cost_pick_drag);
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
			tempShape.addEventListener("mousedown",this.onMouseDownTrash.bind(this));
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
		console.log(this._currentStamina);
		
		if(this._currentStamina<this._tweakers.stamina_total&&!this._isDragging)
		{
			this._currentStamina+=this._tweakers.stamina_regen;
			if(this._currentStamina>this._tweakers.stamina_total)
			{
				this._currentStamina = this._tweakers.stamina_total;
			}
		}
		
		if(this._currentStamina<=0)
		{
			this.dispatchEvent("fail");
		}
		
		if(new Date().getTime()-this._timeAtStart >  this._tweakers.time_to_do_the_game)
		{
			this.dispatchEvent("fail");
		}
	}
	
	p.onMouseDownTrash = function(event)
	{
		// console.log(event.type);
		// console.log("YOOOOOOOOOOOOOOOOOOOOO");
		// console.log(this);
		// console.log(this.stageRef);
		this._isDragging = true;
		this._currentStamina -= this._tweakers.stamina_cost_pick_up;
		this._currentTrashDragging = event.target;
		this.stageRef.addEventListener("pressup",this.onMouseUpStage.bind(this));
		this.stageRef.addEventListener("pressmove",this.onMouseMoveStage.bind(this));
		// console.log(event.target);
	}
	
	p.onMouseMoveStage = function(event)
	{
		// console.log(this._currentTrashDragging);
		this.stageRef.update();
		this._currentStamina -= this._tweakers.stamina_cost_pick_drag;
		if(this._currentTrashDragging)
		{
			this._currentTrashDragging.x = event.stageX-50;
			this._currentTrashDragging.y = event.stageY-50;
		}
	}
	
	p.onMouseUpStage = function(event)
	{
		// console.log("mouseUp");
		this._isDragging = false; 
		this.stageRef.removeEventListener("pressup",this.onMouseUpStage.bind(this));
		this.stageRef.removeEventListener("pressmove",this.onMouseMoveStage.bind(this));
		this._currentTrashDragging = null;
		// event.target.visible = false;
		var isStillIntersecting = false;
		var rectOfTrash;
		var rectOfGlasses = new createjs.Rectangle(this._glasses.x,this._glasses.y,100,100);;
		for(var i = 0;i<this._arrayOfTrash.length;i++)
		{
			// if(this._arrayOfTrash[i].visible)
			// {
				rectOfTrash = new createjs.Rectangle(this._arrayOfTrash[i].x,this._arrayOfTrash[i].y,100,100);
				if(rectOfGlasses.intersects(rectOfTrash))
				{
					isStillIntersecting = true;
				}
			// }
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