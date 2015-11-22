(function(){

    "use strict";

    var MapFactory = window.MapFactory = function(maps,spritesheet,stage){

        this.mapsData = maps;
        this.spritesheet = spritesheet;
        this.stage = stage;

        this.init();

        return this;
    };

    MapFactory.prototype.init = function(){

        var mapId,
            mapData,
            map;

        this.maps = {};

        for (mapId in this.mapsData) {

            mapData = this.mapsData[mapId];

            map = new Map(mapData,this.spritesheet);
            map.on(Map.events.MAP_LOADED,function(){
                console.log(this,"maploaded");
            });
            map.init();

            this.maps[mapId] = map;
        }


    };

    MapFactory.prototype.switchMap = function(id){
        console.log(this.maps[id]);
        this.stage.addChild(this.maps[id].viewport);
    };

    function extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    if(arguments[i][key] !== undefined)
                        out[key] = arguments[i][key];
            }
        }

        return out;
    }
})();