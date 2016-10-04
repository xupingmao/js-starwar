

function init(){	
	container = Q.getDOM("container");
	//container.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from(#00889d), to(#58B000), color-stop(0.5,#94d7e1))"
	//container.style.background = "url(img/start.png)";



	canvas = Quark.createDOM("canvas",{ width: GameStage.getWidth() ,height: GameStage.getHeight()});
	container.appendChild(canvas);
	context = new Quark.CanvasContext({canvas:canvas});
	//context = new Q.DOMContext({canvas:container});

	stage = new GameStage({
		context: context, 
	});

	window.context = context;
	window.canvas = canvas;
	window.stage = stage; // set stage to be global

	window.audioManager = new AudioManager();
	  
	timer = new Q.Timer(1000/FPS); // FPS
	timer.addListener(stage);
	timer.start();
	timer.addListener(Q.Tween); // 动画 
	window.quark_timer = timer;
	 
	em = new Q.EventManager();
	
	em.registerStage(stage, events, true, true);
	welcome();
	
}


function welcome() {
	// remove eventHandlers
	// window.stage.removeAllChildren();

	var contanier = new Q.DisplayObjectContainer();

	contanier.addChild(START_BG);

	// stage.addChild(marine);
	// stage.addChild(m2);
	
	contanier.addChild(START_BTN);
	contanier.addChild(ABOUT_BTN);

	window.stage.addChild(contanier);
	window.stage.cur_container = contanier;
	
	// START_AUDIO.play();
	audioManager.play("start");

	START_BTN.addEventListener(MOUSEDOWN_EVENT,function(){
		// stage.removeChild(marine);
		// stage.removeChild(m2);
		gameStart();
	});
	ABOUT_BTN.addEventListener(MOUSEDOWN_EVENT,function(){
		displayAboutInformation();
	});

	BACK_BTN.addEventListener(MOUSEDOWN_EVENT, function() {
		animate_back();
		// welcome();
	});
}


function gameStart () {
	audioManager.play("game1", true);

	var old_container = window.stage.getChildAt(0);

	var new_container = animate_new_container();
	// new_container.addChild(GAME_BG1);
	new_container.addChild(stage.getMap());

	var position = stage.getPosition(1, 1);
	var marine = new Marine({id: "m1", x: position[0], y:position[1]});
	marine.state = "right";

	new_container.addChild(marine);

	var position = stage.getPosition(-30, 20);
	var tower = new Tower({id: "mainTower", x: position[0], y: position[1]});
	new_container.addChild(tower);
	stage.addTower(tower);

	var position = stage.getPosition(10,10);
	var normalTower = new NormalTower({id: "normalTower", x : position[0], y:position[1]});
	new_container.addChild(normalTower);
	stage.addTower(normalTower);

	animate_forward(stage, new_container);
	// window.stage.removeChildAt(0);
}

window.onload = init; 


