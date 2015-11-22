(function(window) {
	function RemoteMiniGame(tweakers,assetsAtlas,stageRef)
	{
        this.MiniGameBase_constructor(tweakers,assetsAtlas);
		createjs.EventDispatcher.initialize(RemoteMiniGame.prototype);
		createjs.EventDispatcher.initialize(RemoteMiniGame);
		this.stageRef = stageRef;
        this.init();
	}
	var p = createjs.extend(RemoteMiniGame, MiniGameBase);
	p._graphicsTest;
	p.stageRef;
	
	p.init = function()
	{
		this.MiniGameBase_init();
		this._graphicsTest = new createjs.Bitmap(this._assetsAtlas["minigame_0_test_asset"]);
		this.addChild(this._graphicsTest);
		
	}
	p.test = function()
	{		
		this.dispatchEvent("test");
	}
	
	window.RemoteMiniGame = createjs.promote(RemoteMiniGame, "MiniGameBase");


}(window));