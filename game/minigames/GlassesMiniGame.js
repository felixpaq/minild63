(function(window) {
	function GlassesMiniGame(tweakers,assetsAtlas,stageRef)
	{
		this.stageRef = stageRef;
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(GlassesMiniGame.prototype);
		createjs.EventDispatcher.initialize(GlassesMiniGame);
	}
	
	var p = createjs.extend(GlassesMiniGame, MiniGameBase);
	p.stageRef;
	p._staminaBar;
	
	p.tf_time_left;
	p._arrayOfTrash = [];
	p._currentStamina;
	p._glasses;
	p._currentTrashDragging;
	p._isDragging = false;
	p._baseOffsetX;
	
	p._baseOffsetY;
	p._isDragging = false;
	p._bg;
	p._graphicsTest;	
	
	p._timeAtStart;	
	p._timeLeft;	
	p._globalScale;	
	p.init = function()
	{
		this.MiniGameBase_init();
		this._timeAtStart = new Date().getTime();
	}
	
	p.elementsSetup = function()
	{
		this.MiniGameBase_elementsSetup();
		this._currentStamina = this._tweakers.stamina_total;
		
		
		// console.log(this._tweakers.stamina_cost_pick_up);
		// console.log(this._tweakers.stamina_cost_pick_drag);
		// console.log(this._tweakers.stamina_regen);
		// console.log(this._tweakers.stamina_total);
		// console.log(this._tweakers.time_to_do_the_game);
		// console.log(this._tweakers.nb_piece_of_trash);
		this._globalScale = 4;

		this._bg = new createjs.Bitmap(this._assetsAtlas["background_table"].src);
		this._bg.scaleX = this._bg.scaleY = 4;
		this.addChild(this._bg);
		
		// this._glasses = new createjs.Shape();
		this._glasses = new createjs.Bitmap(this._assetsAtlas["lunette"].src);
		// this._glasses.graphics.beginFill("#00ff00").drawRect(0, 0, 100, 100);
		this._glasses.x = 250+Math.random()*100;
		this._glasses.y = 250+Math.random()*100;
		this._glasses.scaleX = this._glasses.scaleY = this._globalScale;
		this.addChild(this._glasses);
		
		var array_items = ["verre_avec_dentier","assiette_vide_miette","boite_de_mouchoir","assiette_vide_miette","cactus","cendrier","lampe","loupe","mots_croise","paparman","peigne","photo","pots_de_pillules","tv_hebdo"];
		var array_for_depth = [];
		
		// for(var i = 0;i<this._tweakers.nb_piece_of_trash;i++)
		for(var i = 0;i<array_items.length;i++)
		{
			tempShape = new createjs.Bitmap(this._assetsAtlas[array_items[i]].src);
			tempShape.scaleX = tempShape.scaleY = this._globalScale;
			tempShape.addEventListener("mousedown",this.onMouseDownTrash.bind(this));
			this.addChild(tempShape);
			tempShape.x = (200+Math.random()*200)-tempShape.getBounds().width*this._globalScale;
			tempShape.y = (210+Math.random()*210)-tempShape.getBounds().height*this._globalScale;
			array_for_depth.push({value:tempShape.y+tempShape.getBounds().height*this._globalScale,target:tempShape});
			this._arrayOfTrash.push(tempShape);
		}		
		
		array_for_depth.sort(function(a,b){
			if(a.value>b.value){
				return 1;
			}
			if(a.value<b.value){
				return -1;
			}
			return 0;
		});
		for (var k = 0;k<array_for_depth.length;k++)
		{
			this.addChild(array_for_depth[k].target);
		}
		this._arrayOfTrash
		this._staminaBar = new ProgressBar(500,20);
		this._staminaBar.x = 230;
		this._staminaBar.y = 640;
		this.addChild(this._staminaBar);
		this._staminaBar.setProgress(this._currentStamina/this._tweakers.stamina_total);
		
		this.tf_time_left = new createjs.Text(this._currentStamina, "20px Arial", "#ffffff");
		this.addChild(this.tf_time_left);
	}
	
	// p.onAddedTrash = function(event)
	// {
		// console.log(event.target.width);
		// event.target.x = (80+Math.random()*200)-event.target.width*this._globalScale;
		// event.target.y = (160+Math.random()*160)-event.target.height*this._globalScale;
	// }
	
	p.addFocusListener = function()
	{
		this.MiniGameBase_addFocusListener();
	}
	
	p.update = function()
	{
		this.MiniGameBase_update();
		
		if(this._currentStamina<this._tweakers.stamina_total&&!this._isDragging)
		{
			this._currentStamina+=this._tweakers.stamina_regen;
			if(this._currentStamina>this._tweakers.stamina_total)
			{
				this._currentStamina = this._tweakers.stamina_total;
			}
		}
		this._staminaBar.setProgress(this._currentStamina/this._tweakers.stamina_total);
		if(this._currentStamina<=0)
		{
			this.dispatchEvent("fail");
		}
		this._timeLeft = new Date().getTime()-this._timeAtStart;
		this.tf_time_left.text = Math.round((this._tweakers.time_to_do_the_game-this._timeLeft)/100);
		if(this._timeLeft >  this._tweakers.time_to_do_the_game)
		{
			// this.dispatchEvent("fail");
		}
	}
	
	p.onMouseDownTrash = function(event)
	{
		// console.log(event.target.y);
		// console.log(event.target.getBounds().height);
		this.addChild(event.target);
		this._isDragging = true;
		this._currentStamina -= this._tweakers.stamina_cost_pick_up;
		this._currentTrashDragging = event.target;
		this.stageRef.addEventListener("pressup",this.onMouseUpStage.bind(this));
		this.stageRef.addEventListener("pressmove",this.onMouseMoveStage.bind(this));
		this._baseOffsetX = event.target.x-event.stageX;
		this._baseOffsetY = event.target.y-event.stageY;
	}
	
	p.onMouseMoveStage = function(event)
	{
		this.stageRef.update();
		this._currentStamina -= this._tweakers.stamina_cost_pick_drag;
		if(this._currentTrashDragging)
		{
			this._currentTrashDragging.x = event.stageX+this._baseOffsetX;
			this._currentTrashDragging.y = event.stageY+this._baseOffsetY;
		}
	}
	
	p.onMouseUpStage = function(event)
	{
		this._isDragging = false; 
		this.stageRef.removeAllEventListeners();
		this.stageRef.removeEventListener("pressup");
		this.stageRef.removeEventListener("pressmove");
		this._currentTrashDragging = null;
		
		var isStillIntersecting = this.checkIfStillIntersecting();
		// var rectOfTrash;
		// var rectOfGlasses = new createjs.Rectangle(this._glasses.x,this._glasses.y,this._glasses.width*this._glasses.scaleX,this._glasses.height*this._glasses.scaleY);
		// new createjs.Rectangle(this._glasses.x,this._glasses.y,100,100);;
		// for(var i = 0;i<this._arrayOfTrash.length;i++)
		// {
			// rectOfTrash = new createjs.Rectangle(this._arrayOfTrash[i].x,this._arrayOfTrash[i].y,this._arrayOfTrash[i].width*this._arrayOfTrash[i].scaleX,this._arrayOfTrash[i].height*this._arrayOfTrash[i].scaleY);
			// if(rectOfGlasses.intersects(rectOfTrash))
			// {
				// isStillIntersecting = true;
			// }
		// }
		
		
		if(!isStillIntersecting)
		{
			this._glasses.addEventListener("click",this.onHandleMouse.bind(this));
		}
	}
	
	p.checkIfStillIntersecting = function()
	{
		var isStillIntersecting = false;
		var rectOfTrash;
		var rectOfGlasses = new createjs.Rectangle(this._glasses.x,this._glasses.y,this._glasses.width*this._glasses.scaleX,this._glasses.height*this._glasses.scaleY);
		// new createjs.Rectangle(this._glasses.x,this._glasses.y,100,100);;
		for(var i = 0;i<this._arrayOfTrash.length;i++)
		{
			rectOfTrash = new createjs.Rectangle(this._arrayOfTrash[i].x,this._arrayOfTrash[i].y,this._arrayOfTrash[i].width*this._arrayOfTrash[i].scaleX,this._arrayOfTrash[i].height*this._arrayOfTrash[i].scaleY);
			if(rectOfGlasses.intersects(rectOfTrash))
			{
				isStillIntersecting = true;
			}
		}
		return isStillIntersecting;
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
		this.removeChild(this._staminaBar);
		this.removeChild(this.tf_time_left);
	}
	
	window.GlassesMiniGame = createjs.promote(GlassesMiniGame, "MiniGameBase");
}(window));