var library  = {
	mini_game_id:{
		assets:{
			assetName:"asset"
		},
		tweakers:{
			shizzle:2
		}
	}
};

(function(window) 
{
	
	function MiniGameBridge(){
		
        this.EventDispatcher_constructor();
		// this.setGraphics();
	}
	var p = createjs.extend(MiniGameBridge, createjs.EventDispatcher);
	p.miniGameAssetAtlas = {};
	p.miniGameTweakerAtlas = {};
	p.miniGameInfoList = {};
	p.manifestLoader = {};
	p.manifestLoader = {};
	
	p.loadMiniGamInfo = function()
	{
		var manifest = [
			{src: "./data/minigame/minigames.json", id: "minigames"}
		];

		p.manifestLoader = new createjs.LoadQueue(false);
		p.manifestLoader.addEventListener("complete", p.loadMiniGames);
		p.manifestLoader.loadManifest(manifest, true);
	};

	p.loadMiniGames = function()
	{
		p.miniGameInfoList = p.manifestLoader.getResult("minigames");
		console.log(p.miniGameInfoList);
		for(var miniGameId in p.miniGameInfoList)
		{
			
		}
		
	};
	
	window.MiniGameBridge = createjs.promote(MiniGameBridge, "EventDispatcher");


}(window));


//Line 14 calls promote, which identifies all of the methods in Container that were overridden in Button (including the constructor) 
//and promotes them into Button with a new name in the format prefix_methodName. We specified "Container" as the prefix which results in promoted methods that look like Container_draw.
//This gives you an easy and highly performant way to call super class methods in the instance scope.