(function(window) {
	function BingoMiniGame(tweakers,assetsAtlas,stageRef)
	{
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(BingoMiniGame.prototype);
		createjs.EventDispatcher.initialize(BingoMiniGame);
		this.stageRef = stageRef;
        this.init();
	}
	var p = createjs.extend(BingoMiniGame, MiniGameBase);
	p._graphicsTest;
	p.stageRef;
	
	p.init = function()
	{
		this.MiniGameBase_init();
		this._graphicsTest = new createjs.Bitmap(this._assetsAtlas["minigame_1_test_asset"]);
		this.addChild(this._graphicsTest);
		
	}
	p.test = function()
	{ 
		this.dispatchEvent("test");
	}
	
	window.BingoMiniGame = createjs.promote(BingoMiniGame, "MiniGameBase");


}(window));