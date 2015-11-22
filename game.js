var stage, w, h, loader;
// var sky, grant, ground, hill, hill2;
var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
var shape = new createjs.Shape(graphics);
var speed = 15;
//var loader;
var miniGamBridge;
var globalDispatcher = new createjs.EventDispatcher();
function init() {
	
	stage = new createjs.Stage("canvas");

	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;

	
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
	
	Controls.getInstance().addEvents();
	stage.addChild(shape);
    
    miniGamBridge  = new MiniGameBridge(stage);
	
	
	createjs.EventDispatcher.initialize(globalDispatcher);
	globalDispatcher.addEventListener("tabarnak",onMiniGameBridgeReady);
	this.miniGamBridge.on("test",onMiniGameBridgeReady);
	this.miniGamBridge.on("test",function(){console.log("ridicule");});
	miniGamBridge.on("test",onMiniGameBridgeReady.bind(this));
	miniGamBridge.on("test",createjs.proxy(onMiniGameBridgeReady, this));
	miniGamBridge.addEventListener("test",onMiniGameBridgeReady);
	miniGamBridge.addEventListener("test",onMiniGameBridgeReady.bind(this));
	miniGamBridge.addEventListener("test", createjs.proxy(onMiniGameBridgeReady, this));
	miniGamBridge.loadMiniGamInfo();
}

function onMiniGameBridgeReady(event)
{
	console.log("I GET HERE");
	miniGamBridge.openMiniGame("mini_game_0");
}

function tick(event) {
    
    if(Controls.KEYB_BUTTON[Controls.UP]||Controls.KEYB_BUTTON[Controls.W])
    {
        //console.log("UP");
        shape.y-=speed;
        
    }
    
    if(Controls.KEYB_BUTTON[Controls.DOWN]||Controls.KEYB_BUTTON[Controls.S])
    {
        //console.log("DOWN");
        shape.y+=speed;
    }
    if(Controls.KEYB_BUTTON[Controls.LEFT]||Controls.KEYB_BUTTON[Controls.A])
    {
       // console.log("LEFT");
        shape.x-=speed;
    }
    
    if(Controls.KEYB_BUTTON[Controls.RIGHT]||Controls.KEYB_BUTTON[Controls.D])
    {
          // console.log("RIGHT");
        shape.x+=speed;
    }
    stage.update(event);
}