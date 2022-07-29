// 현재 씬을 알기위한 글로벌 변수
var g_sceneinfo = {
	cur_scene : ""
}

/*************************************************
 * Main
 *
 * @history 	2016.06.13	1606131826 - JS_MIN_VER 추가함.
 *           			1606131853 - B Pay UI 적용
 *
 *
 *************************************************/
var Main =
{
	timer_stamp: null //1초에 한번씩 호출되는 timer
};

Main.onLoad = function () {
	Main.donext();
};

//게임에 사용할 시간들을 서버 시간으로 맞춘다.
Main.time_init = function () {
}

Main.loadData = function () {
};

Main.donext = function () {
	$("#div_body").css({
		width: SCREEN_WIDTH + 'px',
		height: SCREEN_HEIGHT + 'px',
		overflow: 'hidden',
		position: 'absolute'
	});

	window.addEventListener('keydown', Main.keyDown);
	window.addEventListener('keyup', Main.keyUp); 

	// 여기가 젤 처음 불려지는 화면 관련내용
	// S_GAME.init();
	S_MAIN.init();
	// S_GAMEOVER.init();
};

// Main.keyDown = function()
// {
// 	S_GAME.init();
// };

Main.keyDown = function (event) {
	var keyCode = event.keyCode;
	console.log("keyDown Key pressed: " + keyCode + "    cur_scene:" + g_sceneinfo.cur_scene);
	//현재 Scene이 뭐냐에 따라서, key event를 각자 Scene에서 처리 하게 한다.
	switch (g_sceneinfo.cur_scene) {
		case "S_GAME": S_GAME.keyDown(event); break;
		case "S_MAIN": S_MAIN.keyDown(event); break;
		case "S_GAMEOVER": S_GAMEOVER.keyDown(event); break;
		case "S_RANKING": S_RANKING.keyDown(event); break;
		default:	console.log("Error in Main.js -- g_sceneinfo.cur_scene");
	}
};

Main.keyUp = function (event) {
	var keyCode = event.keyCode;
	console.log("keyUp Key pressed: " + keyCode + "    cur_scene:" + g_sceneinfo.cur_scene);
	//현재 Scene이 뭐냐에 따라서, key event를 각자 Scene에서 처리 하게 한다.
	switch (g_sceneinfo.cur_scene) {
		case "S_GAME": S_GAME.keyUp(event); break;
		case "S_MAIN": S_MAIN.keyUp(event); break;
		case "S_GAMEOVER": S_GAMEOVER.keyUp(event); break;
		case "S_RANKING": S_RANKING.keyUp(event); break;
		default:	console.log("Error in Main.js -- g_sceneinfo.cur_scene");
	}
};


//define.js에 의해 SERVER_TESTING 이 1이되면, 서버 점검중 이다.
//서버 점검 중 일대는 메시지만 보여주고 잠시후 종료 한다.
Main.server_testing = function () {
}

