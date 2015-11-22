var game = (function(){
    var stage,
        w,
        h,
        manifest,
        loader,
        mapFactory,
        maps = {},
        tiles = [],
        spritesheet;

    function init(){
        stage = new createjs.Stage("canvas");
        w = stage.canvas.width;
        h = stage.canvas.height;

        manifest = [
            {src: "assets/maps.json", type:"manifest"}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleComplete);
        loader.loadManifest(manifest, true);

    }

    function handleComplete(){
        var loadedItemIdx = 0,
            loadedItems = loader.getItems(),
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

        mapFactory = new MapFactory(maps,spritesheet,stage);

        mapFactory.switchMap("basicMap");

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);
    }

    function tick(event) {
        stage.update(event);
    }

    return {
        init:function(){
            init();
        },
        switchMap:function(id){
            mapFactory.switchMap(id);
        }
    }
})();