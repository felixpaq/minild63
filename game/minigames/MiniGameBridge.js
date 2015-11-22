
(function(window) 
{
	
	function MiniGameBridge($stage){
		p.stageRef = $stage;	
		createjs.EventDispatcher.initialize(MiniGameBridge.prototype);
		createjs.EventDispatcher.initialize(MiniGameBridge);
        this.EventDispatcher_constructor();
		// this.setGraphics();
	}
	var p = createjs.extend(MiniGameBridge, createjs.EventDispatcher);
	
	MiniGameBridge.READY = "ready";
	
	p.stageRef;
	
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
		p.dispatchEvent(new createjs.Event("tabarnak"));
		var manifest = [
			{src: "./data/minigame/minigames.json", id: "minigames"}
		];
		p.isAssetAtlasLoaded = false;
		p.isTweakerLoaded = false;
		p.manifestLoader = new createjs.LoadQueue(false);
		p.manifestLoader.addEventListener("complete", p.loadMiniGames);
		p.manifestLoader.loadManifest(manifest, true);
		
	};

	
	p.loadMiniGames = function()
	{
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
		p.manifestLoaderTweakers.addEventListener("fileload", p.addEntryInTweakerAtlas);
		p.manifestLoaderTweakers.addEventListener("complete", p.onCompleteTweakerLoad);
		p.manifestLoaderTweakers.loadManifest(p.manifestTweakers, true);
		
		p.manifestLoaderAssets = new createjs.LoadQueue(false);
		p.manifestLoaderAssets.addEventListener("fileload", p.addEntryInMiniGameAssetLoadList);
		p.manifestLoaderAssets.addEventListener("complete", p.onCompleteAssetLoad);
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
		p.miniGameAssetLoader.addEventListener("fileload", p.addMiniGameAssetToAtlas);
		p.miniGameAssetLoader.addEventListener("complete", p.onCompleteminiGameAssetLoad);
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
		p.isAssetAtlasLoaded = true;
		p.checkIfAllLoaded();
	}
	
	p.onCompleteTweakerLoad = function(event)
	{
		p.isTweakerLoaded = true;
		p.checkIfAllLoaded();
	}
	
	p.checkIfAllLoaded = function()
	{
		if(p.isTweakerLoaded&&p.isAssetAtlasLoaded)
		{
			var event = new createjs.Event("test");
			p.dispatchEvent(event);
			this.dispatchEvent(event);
			p.dispatchEvent("test");
			this.dispatchEvent("test");
			event = new createjs.Event("tabarnak");
			globalDispatcher.dispatchEvent(event);
			
		}
	}
	
	p.openMiniGame = function(miniGameID)
	{
		switch(miniGameID)
		{
			case "mini_game_0":
				p._currenMiniGame = new RemoteMiniGame(p.miniGameTweakerAtlas[miniGameID], p.miniGameAssetAtlas,p.stageRef);	
			break;
		}
		p._currenMiniGame.on("test",function(){console.log("should work")});
		// p._currenMiniGame.test();
		p.stageRef.addChild(p._currenMiniGame);
	}
	
	window.MiniGameBridge = createjs.promote(MiniGameBridge, "EventDispatcher");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.