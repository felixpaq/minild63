/**
 * Created by Félix on 2015-11-21.
 */
(function(){

    "use strict";


    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

    var debugContext;


    var World = window.World = function(map,debug){
        this.actors = [];
        this.bodies = [];
        this.map = map;
        this.debug = debug || false;
        this.init();

        return this;
    };


    World.SCALE = 30;
    World.STEP = 20;
    World.TIMESTEP = 1/World.STEP;



    World.prototype.init = function(){

        this.world = new b2World(new b2Vec2(0,10), true);

        if(this.debug){
            debugContext = document.getElementById('debugCanvas').getContext('2d');

            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(debugContext);
            debugDraw.SetDrawScale(World.SCALE);
            debugDraw.SetFillAlpha(0.7);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            this.world.SetDebugDraw(debugDraw);

            console.log("this is suposed to do something");
        }
    };

    World.prototype.flush = function(){
        this.actors = [];
        this.bodies = [];
    };

    World.prototype.update = function(){

        if(game.isActive) {
            // update active actors
            for(var i=0, l=this.actors.length; i<l; i++) {
                this.actors[i].update();
            }

            this.world.Step(World.TIMESTEP, 10, 10);

            this.world.ClearForces();

            if(this.debug){
                this.world.m_debugDraw.m_sprite.graphics.clear();
                this.world.DrawDebugData();
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