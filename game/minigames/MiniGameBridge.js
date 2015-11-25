
(function(window) 
{
	var MiniGameBridge = window.MiniGameBridge = function($stage){
	// function MiniGameBridge($stage){
		p.stageRef = $stage;	
		createjs.EventDispatcher.initialize(MiniGameBridge.prototype);
		this.Container_constructor();
		// createjs.EventDispatcher.initialize(MiniGameBridge);
		p.that = this;
		// this.setGraphics();
		// return this;
	}
	
	var p = createjs.extend(MiniGameBridge, createjs.Container);
	
	MiniGameBridge.READY = "ready";
	
	p.stageRef;
	p.that;
	
	p.miniGameAssetAtlas = {};
	p.miniGameTweakerAtlas = {};
	p.miniGameInfoList = {};
	
	p.manifestLoader;
	
	p.manifestAssets = [];
	p.manifestLoaderAssets;
	p.miniGameAsseLoadingList = [];
	p.miniGameAssetLoader;
	
	p.manifestTweakers = [];
	p.manifestLoaderTweakers;
	
	p._currenMiniGame;
	p.isTweakerLoaded;
	p.isAssetAtlasLoaded;
	

	
	MiniGameBridge.prototype.loadMiniGamInfo = function()
	{
		// p.dispatchEvent(new createjs.Event("tabarnak"));
		// console.log(p);
		// console.log(this);
		var manifest = [
			{src: "./data/minigame/minigames.json", id: "minigames"}
		];
		p.isAssetAtlasLoaded = false;
		p.isTweakerLoaded = false;
		p.manifestLoader = new createjs.LoadQueue(false);
		p.manifestLoader.addEventListener("complete", p.loadMiniGames.bind(this));
		p.manifestLoader.loadManifest(manifest, true);
		
	};

	
	p.loadMiniGames = function()
	{
		// console.log(p);
		console.log(this);
		p.miniGameInfoList = p.manifestLoader.getResult("minigames");
		for(var miniGameId in p.miniGameInfoList)
		{
			p.manifestTweakers.push({
				id:miniGameId,
				name:miniGameId,
				src:p.miniGameInfoList[miniGameId].tweaker
			});
			
			p.manifestAssets.push({
				id:miniGameId,
				name:miniGameId,
				src:p.miniGameInfoList[miniGameId].assets
			});
		}
		p.manifestLoaderTweakers = new createjs.LoadQueue(false);
		p.manifestLoaderTweakers.addEventListener("fileload", p.addEntryInTweakerAtlas.bind(this));
		p.manifestLoaderTweakers.addEventListener("complete", p.onCompleteTweakerLoad.bind(this));
		p.manifestLoaderTweakers.loadManifest(p.manifestTweakers, true);
		
		p.manifestLoaderAssets = new createjs.LoadQueue(false);
		p.manifestLoaderAssets.addEventListener("fileload", p.addEntryInMiniGameAssetLoadList.bind(this));
		p.manifestLoaderAssets.addEventListener("complete", p.onCompleteAssetLoad.bind(this));
		p.manifestLoaderAssets.loadManifest(p.manifestAssets, true);
	};
	
	
	p.addEntryInMiniGameAssetLoadList = function(event)
	{
		var loadingList = p.manifestLoaderAssets.getResult(event.item.id).asset_list;
		var loops = loadingList.length;
		var temp;
		for(var i = 0;i<loops;i++)
		{
			temp = loadingList[i];			
			temp.miniGameID = event.item.name;
			p.miniGameAsseLoadingList.push(temp);
		}
	}
	
	p.onCompleteAssetLoad = function(event)
	{
		p.miniGameAssetLoader = new createjs.LoadQueue(false);
		p.miniGameAssetLoader.addEventListener("fileload", p.addMiniGameAssetToAtlas.bind(this));
		p.miniGameAssetLoader.addEventListener("complete", p.onCompleteminiGameAssetLoad.bind(this));
		p.miniGameAssetLoader.loadManifest(p.miniGameAsseLoadingList, true);
	}
	
	p.addMiniGameAssetToAtlas = function(event)
	{
		p.miniGameAssetAtlas[event.item.id] = p.miniGameAssetLoader.getResult(event.item.id);
	}
	
	p.addEntryInTweakerAtlas = function(event)
	{
		p.miniGameTweakerAtlas[event.item.name] = p.manifestLoaderTweakers.getResult(event.item.id);
	}
	
	p.onCompleteminiGameAssetLoad = function(event)
	{
		console.log(this)
		p.isAssetAtlasLoaded = true;
		this.checkIfAllLoaded();
	}
	
	p.onCompleteTweakerLoad = function(event)
	{
		p.isTweakerLoaded = true;
		this.checkIfAllLoaded();
	}
	
	p.checkIfAllLoaded = function()
	{
		if(p.isTweakerLoaded&&p.isAssetAtlasLoaded)
		{
			console.log(this);
			// var event = new createjs.Event("test");
			// p.dispatchEvent(event);
			// this.dispatchEvent(event);
			// p.dispatchEvent("test");
			// console.log(p);
			// console.log(this);
			this.dispatchEvent(MiniGameBridge.READY);
			// this.dispatchEvent("test");
			// var event = new createjs.Event("tabarnak");
			// globalDispatcher.dispatchEvent(event);
			
		}
	}
	
	p.update = function()
	{
		
		if(this._currenMiniGame)
		{
			this._currenMiniGame.update();
		}
	}
	
	p.openMiniGame = function(miniGameID)
	{
		switch(miniGameID)
		{
			case "mini_game_0":
				this._currenMiniGame = new GlassesMiniGame(p.miniGameTweakerAtlas[miniGameID], p.miniGameAssetAtlas,p.stageRef);	
			break;
		}
		// console.log(p._currenMiniGame);
		// p._currenMiniGame.on("test",function(){console.log("should work")});
		this._currenMiniGame.on("success",p.onGameEnd.bind(this));
		this._currenMiniGame.on("fail",p.onGameEnd.bind(this));
		p.stageRef.addChild(this._currenMiniGame);
		// p._currenMiniGame.test();
	}
	p.onGameEnd = function(event)
	{
		switch(event.type)
		{
			case "success":
				console.log("success");
			break;
			case "fail":
				console.log("fail");
			break;
		}
		p.stageRef.removeChild(this._currenMiniGame);
		this._currenMiniGame = null;
	}
	
	window.MiniGameBridge = createjs.promote(MiniGameBridge, "Container");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.