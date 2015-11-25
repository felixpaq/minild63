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
        this.setupPlayer();
        this.dispatchEvent(Map.events.MAP_LOADED);
    };

    Map.prototype.setupPlayer = function(){
        this.player = new Player(90,90);
        this.viewport.addChild(this.player);
    };

    Map.prototype.update = function(){
        this.player.update();
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
            }else if(layerData.type == 'objectgroup' && layerData.properties.collisions == 'true'){
                this.layers[layerData.name] = new Map.CollisionLayer(layerData);
            }
        }
    };

    Map.CollisionLayer = function(layerData){

        this.layerData = layerData;

        var objectIndex,
            object,
            cell;

        for ( objectIndex = 0; objectIndex < this.layerData.objects.length; objectIndex++) {

            object = this.layerData.objects[objectIndex];
            var collisionFixture = new Box2D.Dynamics.b2FixtureDef;
            collisionFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape;
            collisionFixture.shape.SetAsBox(object.width / World.SCALE, (object.height/2) / World.SCALE);
            var collisionBodyDef = new Box2D.Dynamics.b2BodyDef;
            collisionBodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            collisionBodyDef.position.x = object.x / World.SCALE;
            collisionBodyDef.position.y = (object.y + object.height/2) / World.SCALE;
            var collision = game.world.world.CreateBody(collisionBodyDef);
            collision.CreateFixture(collisionFixture);
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