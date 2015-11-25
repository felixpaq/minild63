/**
 * Created by Félix on 2015-11-22.
 */
(function(){

    function Player(x,y){
        this.spritesheet = new createjs.SpriteSheet({
            images : [
                game.loader.getResult("player-idle"),
                game.loader.getResult("player-walk")
            ],
            frames : {
                width : 32,
                height : 72
            },
            animations : {
                // start, end, next*, speed*
                idle: [0, 21],
                walk: [22, 37]
            }
        });

        this.Sprite_constructor(this.spritesheet,"idle");

        this.x = x;
        this.y = y;

        this.regX = 32/2;   // important to set origin point to center of your bitmap
        this.regY = 72/2;
        this.snapToPixel = true;
        this.mouseEnabled = false;

        createBody.call(this);
    }

    var p = createjs.extend(Player, createjs.Sprite);

    p.WIDTH = 32;
    p.HEIGHT = 72;

    p.update = function(){
        if(this.actor.moving && this.currentAnimation != "walk"){
            this.gotoAndPlay("walk");
        }else if(!this.actor.moving && this.currentAnimation != "idle"){
            this.gotoAndPlay("idle");
        }
    };

    function createBody(){
        console.log(this);
        var playerFixture = new Box2D.Dynamics.b2FixtureDef;
        playerFixture.density = 1;
        playerFixture.restitution = 0.6;
        playerFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        playerFixture.shape.SetAsBox(this.WIDTH/2 / World.SCALE, this.HEIGHT/2 / World.SCALE);

        var playerBodyDef = new Box2D.Dynamics.b2BodyDef;
        playerBodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        playerBodyDef.position.x = this.x / World.SCALE;
        playerBodyDef.position.y = this.y / World.SCALE;
        playerBodyDef.allowSleep = false;

        this.scaleX = -1;

        this.body = game.world.world.CreateBody(playerBodyDef);
        this.body.CreateFixture(playerFixture);

        this.actor = new Actor(this.body, this,true);
        this.body.SetUserData(this.actor);  // set the actor as user data of the body so we can use it later: body.GetUserData()
        game.world.bodies.push(this.body);

    }
    window.Player = createjs.promote(Player, "Sprite");
}());