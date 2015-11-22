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
            mapData;

        this.maps = {};

        for (mapId in this.mapsData) {

            mapData = this.mapsData[mapId];

            this.maps[mapId] = new Map(mapData,this.spritesheet);
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