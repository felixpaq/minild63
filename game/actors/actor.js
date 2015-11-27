/**
 * Created by Félix on 2015-11-22.
 */
(function(){
    var Actor = window.Actor = function(body,skin,controllable,world){

        this.body = body;
        this.skin = skin;
        this.controllable = controllable || false;
        this.moving = false;

        world.actors.push(this);
        console.log(this.body);
    };

    Actor.prototype.update = function(){
        this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
        this.skin.x = this.body.GetWorldCenter().x * World.SCALE;
        this.skin.y = this.body.GetWorldCenter().y * World.SCALE;

        if(this.controllable){

            if(Controls.KEYB_BUTTON[Controls.LEFT]||Controls.KEYB_BUTTON[Controls.A]){

                this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(-1,0));
                //this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(-(1/World.SCALE),0),this.body.GetWorldCenter());

                if(this.skin.scaleX != -1){
                    this.skin.scaleX = -1;
                }
                this.moving = true;

            }else if(Controls.KEYB_BUTTON[Controls.RIGHT]||Controls.KEYB_BUTTON[Controls.D]){

                this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(1,0));
                //this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2((1/World.SCALE),0),this.body.GetWorldCenter());

                if(this.skin.scaleX != 1){
                    this.skin.scaleX = 1;
                }
                this.moving = true;

            }else{
                this.moving = false;
            }
        }
    }
}());