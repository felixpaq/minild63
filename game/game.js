
(function(){

    var stage,
        w,
        h,
        manifest,
        mapFactory,
        maps = {},
        tiles = [],
        spritesheet;

    var Game = window.Game = function(){
        this.init();
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
	}
	
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
        console.log(this);
        Controls.getInstance().addEvents();
        this.world = new World(true);
        mapFactory = new MapFactory(maps,spritesheet,stage);

        mapFactory.switchMap("collisions");

        createjs.Ticker.framerate = 24;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    };

    Game.prototype.tick = function(event) {
        stage.update(event);
        this.world.update();

        if(mapFactory.activeMap != null){
            mapFactory.activeMap.update();
        }
    };
})();