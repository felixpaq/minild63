(function(){

    "use strict";

    var Map = window.Map = function(mapData,spritesheet){

        createjs.EventDispatcher.initialize(Map.prototype);

        this.mapData = mapData;
        this.spritesheet = spritesheet;
        this.viewport = new createjs.Container();

        //this.init();

        return this;
    };

    Map.events = {
        MAP_LOADED:"mapLoaded"
    };

    Map.prototype.init = function(){
        this.setupLayers();
        this.dispatchEvent(Map.events.MAP_LOADED);
    };

    Map.prototype.setupLayers = function(){
        this.layers = {};

        var layerIndex,
            layerLength = this.mapData.layers.length,
            layerData;

        for (layerIndex = 0; layerIndex < layerLength; layerIndex++) {
            layerData = this.mapData.layers[layerIndex];

            if (layerData.type == 'tilelayer'){
                this.layers[layerData.name] = new Map.Layer(layerData, this.mapData.tilewidth, this.mapData.tileheight, this.spritesheet,this.viewport);
            }
        }
    };

    Map.Layer = function(layerData, tilewidth, tileheight, spritesheet, viewport){

        this.layerData = layerData;

        var layerY,
            layerX,
            cell;

        for ( layerY = 0; layerY < this.layerData.height; layerY++) {
            for ( layerX = 0; layerX < this.layerData.width; layerX++) {
                // create a new Bitmap for each cell
                var idx = layerX + layerY * this.layerData.width;
                cell = new createjs.Sprite(spritesheet);
                cell.gotoAndStop(this.layerData.data[idx] - 1);
                cell.x = layerX * tilewidth;
                cell.y = layerY * tileheight;

                // add bitmap to stage
                viewport.addChild(cell);
            }
        }
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