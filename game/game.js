
(function(){

    var stage,
        w,
        h,
        manifest,
        mapFactory,
        maps = {},
        tiles = [],
        spritesheet;

    var isActive = true;

    window.onfocus = function () {
        isActive = true;
    };

    window.onblur = function () {
        isActive = false;
    };

    var Game = window.Game = function(){
        this.init();
        Controls.getInstance().addEvents();

        return this;
    };

	Game.prototype.isMiniGameBridgeReady = false;
	Game.prototype.miniGamBridge = false;
	
    Game.prototype.init = function (){
        stage = new createjs.Stage("canvas");
        w = stage.canvas.width;
        h = stage.canvas.height;

        manifest = [
            {src: "assets/assets.json", type:"manifest"}
        ];

        this.loader = new createjs.LoadQueue(false);
        this.loader.addEventListener("complete", this.handleComplete.bind(this));
        this.loader.loadManifest(manifest, true);
		
		this.miniGamBridge = new MiniGameBridge(stage);
		this.miniGamBridge.on(MiniGameBridge.READY,this.onMiniGameBridgeReady.bind(this));
		this.miniGamBridge.loadMiniGamInfo();
	};

	
	Game.prototype.onMiniGameBridgeReady = function(event)
	{
		this.isMiniGameBridgeReady = true
	};

    Game.prototype.changeState = function(state){
        if(this.currentState != null && this.currentState != undefined){
            stage.removeChild(this.currentState.viewport);
        }

        this.currentState = state;
        stage.addChild(this.currentState.viewport);
    };
	
    Game.prototype.handleComplete = function(){
        var loadedItemIdx = 0,
            loadedItems = this.loader.getItems(),
            loadedItem,
            itemTag;


        for (var len = loadedItems.length; loadedItemIdx < len; loadedItemIdx++) {
            loadedItem = loadedItems[loadedItemIdx];
            itemTag = loadedItem.item.tag || null;

            switch(itemTag){
                case "map":
                    maps[loadedItem.item.id] = loadedItem.result;
                    break;
                case "tile":
                    tiles.push(loadedItem.result);
                    break;
            }

        }


        spritesheet = new createjs.SpriteSheet({
            images : tiles,
            frames : {
                width : 32,
                height : 32
            }
        });

        this.states = {
            MAIN_MENU:new StateMainMenu(stage),
            INTRO:"intro",
            GAME:new StateGame(maps,spritesheet,stage),
            ENDING:"ending"
        };

        this.changeState(this.states.MAIN_MENU);


        console.log(this);

        createjs.Ticker.framerate = 24;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    };

    Game.prototype.tick = function(event) {
        if(isActive){
            stage.update(event);
            this.currentState.update();
            this.miniGamBridge.update();
        }
    };
})();