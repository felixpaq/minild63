/**
 * Created by Félix on 2015-11-24.
 */
(function(){
    var Camera = window.Camera = function(map){

        this.map = map;
        this.init();

        return this;
    };

    Camera.prototype.init = function(){
        this.minX = 0;
        this.maxX = (this.map.viewport.getBounds().width) - game.canvas.width;

        this.minY = 0;
        this.maxY = (this.map.viewport.getBounds().height)  - game.canvas.height;

        console.log(this)
    };

    Camera.prototype.update = function(){
        //if(this.map.player.actor.moving){
            this.moveTo(-(game.canvas.width /2 - this.map.player.x),-(game.canvas.height /2 - this.map.player.y));
        //}
    };

    Camera.prototype.moveTo = function(x,y){
        if(x > this.minX && x < this.maxX){
            this.map.viewport.x = -x;
        }
        if(y > this.minY && y < this.maxY){
            this.map.viewport.y = -y;
        }
    };
}());