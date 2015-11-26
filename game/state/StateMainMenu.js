/**
 * Created by Félix on 2015-11-24.
 */
(function(){
    var StateMainMenu = window.StateMainMenu = function(){

        console.log(this);
        this.viewport = new createjs.Container();

        this.init();

        return this;
    };

    StateMainMenu.prototype.init = function(){
        this.viewport.addChild(new createjs.Text("pRESS SPACE TO STAAAAAAAAART THE ADVENTURE OF YOUR LIFE", "20px Arial", "#ff7700"));
    }

    StateMainMenu.prototype.update = function(){
        if(Controls.KEYB_BUTTON[Controls.SPACE]){
            console.log("switching to game");
            game.changeState(game.states.GAME);
        }
    }
}());