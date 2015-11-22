var stage, w, h, loader;
// var sky, grant, ground, hill, hill2;
var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
var shape = new createjs.Shape(graphics);
var speed = 15;
//var loader;
var miniGamBridge;
function init() {
	
	stage = new createjs.Stage("testCanvas");

	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;

	// manifest = [
		// {src: "spritesheet_grant.png", id: "grant"},
		// {src: "sky.png", id: "sky"},
		// {src: "ground.png", id: "ground"},
		// {src: "hill1.png", id: "hill"},
		// {src: "hill2.png", id: "hill2"}
	// ];

	// loader = new createjs.LoadQueue(false);
	// loader.addEventListener("complete", handleComplete);
	// loader.loadManifest(manifest, true, "../_assets/art/");
	
	// var manifest = [
		// {src: "./data/minigame/minigames.json", id: "minigames"}
	// ];
	
	// loader = new createjs.LoadQueue(false);
	// loader.addEventListener("complete", handleComplete);
	// loader.loadManifest(manifest, true);
	
	Controls.getInstance().addEvents();
	stage.addChild(shape);
    // var test = new JoyStick();
    // test.x = 15;
    // test.y = 15;
    // stage.addChild(test);
    miniGamBridge  = new MiniGameBridge();
	miniGamBridge.loadMiniGamInfo();
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
}

function handleComplete(event)
{
	var test = loader.getResult("minigames");
	console.log(test);
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
          console.log("RIGHT");
        shape.x+=speed;
    }
    stage.update(event);
}