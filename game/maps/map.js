(function(){

    "use strict";

    var Map = window.Map = function(mapData,spritesheet){

        createjs.EventDispatcher.initialize(Map.prototype);

        this.mapData = mapData;
        this.spritesheet = spritesheet;
        this.viewport = new createjs.Container();
        this.world = new World();

        this.active = false;

        return this;
    };

    Map.events = {
        MAP_LOADED:"mapLoaded"
    };

    Map.prototype.init = function(active){

        this.active = active || this.active;
        this.setupLayers();
        this.setupPlayer();
        this.dispatchEvent(Map.events.MAP_LOADED);
    };

    Map.prototype.setupPlayer = function(){
        this.player = new Player(90,90,this);
        this.viewport.addChild(this.player);
    };

    Map.prototype.update = function(){
        if(this.active){
            this.player.update();
            this.world.update();
        }
    };

    Map.prototype.setupLayers = function(){
        this.layers = {};

        var layerIndex,
            layerLength = this.mapData.layers.length,
            layerData;

        for (layerIndex = 0; layerIndex < layerLength; layerIndex++) {
            layerData = this.mapData.layers[layerIndex];
                console.log(layerData);
            if (layerData.type == 'tilelayer'){
                this.layers[layerData.name] = new Map.Layer(layerData, this.mapData.tilewidth, this.mapData.tileheight, this.spritesheet,this.viewport);
            }else if(layerData.type == 'objectgroup'){
                if(layerData.properties){
                    if(layerData.properties.collisions == "true"){

                        this.layers[layerData.name] = new Map.CollisionLayer(layerData,this.world);
                    }

                }

            }
        }
    };

    Map.CollisionLayer = function(layerData,world){

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
            var collision = world.world.CreateBody(collisionBodyDef);
            collision.CreateFixture(collisionFixture);
        }
    };

    Map.Layer = function(layerData, tilewidth, tileheight, spritesheet, viewport){

        this.layerData = layerData;
        this.viewport = new createjs.Container();

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
                this.viewport.addChild(cell);
            }
        }

        //this.viewport.cache(0,0,this.viewport.width,this.viewport.height);
        this.viewport.cache(0,0,this.layerData.width*tilewidth,this.layerData.height*tileheight)

        viewport.addChild(this.viewport);
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