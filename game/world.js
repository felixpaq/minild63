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

    var lastTimestamp = Date.now(),
    fixedTimestepAccumulator = 0,
    bodiesToRemove = [],
    debugContext;


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


        var now = Date.now();
        var dt = now - lastTimestamp;
        fixedTimestepAccumulator += dt;
        lastTimestamp = now;

        while(fixedTimestepAccumulator >= World.STEP && game.isActive) {
            // remove bodies before world timestep
            /*for(var i=0, l=bodiesToRemove.length; i<l; i++) {
                removeActor(bodiesToRemove[i].GetUserData());
                bodiesToRemove[i].SetUserData(null);
                world.DestroyBody(bodiesToRemove[i]);
            }
            bodiesToRemove = [];*/

            // update active actors
            for(var i=0, l=this.actors.length; i<l; i++) {
                this.actors[i].update();
            }

            this.world.Step(World.TIMESTEP, 10, 10);

            fixedTimestepAccumulator -= World.STEP;
            this.world.ClearForces();

            if(this.debug){
                this.world.m_debugDraw.m_sprite.graphics.clear();
                this.world.DrawDebugData();
            }

            /*if(this.bodies.length > 30) {
                bodiesToRemove.push(this.bodies[0]);
                this.bodies.splice(0,1);
            }*/
        }
    };

    World.prototype.translate = function(x,y){
        var _body = this.world.GetBodyList();

        while(_body){
            var _bodyVec2 = new b2Vec2(_body.GetPosition().x  + -x /World.SCALE,_body.GetPosition().y+ -y /World.SCALE);

            console.log(_body.GetPosition(),_bodyVec2);

            //console.log(new b2Vec2(_body.GetPosition().x + _offsetX,_body.GetPosition().y + _offsetY));
            if(_body.GetUserData() == null){
                //_body.SetPosition(_bodyVec2);
            }
            _body = _body.GetNext();
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