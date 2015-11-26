(function(){

    "use strict";

    var StateGame = window.StateGame = function(maps,spritesheet,stage){

        this.mapsData = maps;
        this.spritesheet = spritesheet;
        this.stage = stage;

        this.activeMap = null;

        this.init();

        return this;
    };

    StateGame.prototype.init = function(){

        var mapId,
            mapData,
            map;

        this.maps = {};

        for (mapId in this.mapsData) {

            mapData = this.mapsData[mapId];

            map = new Map(mapData,this.spritesheet);

            map.init(false);

            if(mapData.properties.start == "true"){
                this.activeMap = map;
                this.viewport = map.viewport;
                map.setActive(true);
            }

            this.maps[mapId] = map;
        }

    };

    StateGame.prototype.update = function(){
        this.activeMap.update();
    };

    StateGame.prototype.switchMap = function(id){
        this.activeMap = this.maps[id];
        this.viewport = this.maps[id].viewport;
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