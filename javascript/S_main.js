
var S_MAIN =
{
	key_lock: 0, //키락 중복 클릭 방지 예를 들어 연속 점프 같은거...
	titleCount: 1,
	focus : 1,
	button_count : 1,
	tmp: ""

};

//tag를 만들어 주는곳
S_MAIN.maketag = function () {

	$("#S_MAIN_div").empty(); // 안에 있는 자식 요소들 태그 및 내용을 다 지워주는 역할 지워주는 이유는 html에 설명

	var div = document.getElementById("S_MAIN_div"); //여기 있는 아이디를 가진 태그를 밑에 있는 태그로 바꿔치기
	div.innerHTML =
		'<div class="bg_image">' +
		'	<div id="title">' +
		'		<img src="image/mainpage/title-2.png" alt="title">' +
		'	</div>' +
		'	<div id="button">' +
		'		<div class="item start">' +
		'			<img src="image/mainpage/button/start-0@3x.png" alt="button">' +
		'		</div>' +
		// '		<div class="item how">' +
		// '			<img src="image/mainpage/button/how-0@3x.png" alt="button">' +
		// '		</div>' +
		'		<div class="item ranking">' +
		'			<img src="image/mainpage/button/ranking-0@3x.png" alt="button">' +
		'		</div>' +
		// '		<div class="item sound">' +
		// '			<img src="image/mainpage/button/soundOn-0@3x.png" alt="button">' +
		// '		</div>' +
		'	</div>' +
		'</div>' +
		'';	


	$('#S_MAIN_div').css({
		width: "1280px",
		height: "720px",
		position: "relative"
	})

	$('#S_MAIN_div .bg_image').css({
		width: "1280px",
		height: "720px",
		'background-image': 'url("./image/mainpage/main_img@3x.png")',
		'background-size': 'cover'
	})
	$('#S_MAIN_div #title img').css({
		width: "670px",
		height: "400px"
	})
	$('#S_MAIN_div #button').css({
		position: 'absolute',
		top:'60%'
	})
	$('#S_MAIN_div #button img').css({
		width: "670px",
		height: "81px"
	})


	

	S_MAIN.interval();
}


S_MAIN.init = function () {
	console.log("~S_MAIN.init()~");
	g_sceneinfo.cur_scene = "S_MAIN";
	S_MAIN.maketag();
}


S_MAIN.interval = function () {

	if (g_sceneinfo.cur_scene != "S_MAIN") return;


	if (S_MAIN.timer_interval != null)// 뭔가 실행되고 있는데 있으면 멈추라는 의미
	{
		clearInterval(S_MAIN.timer_interval);
		S_MAIN.timer_interval = null; // 다시 초기화 해주는 작업
	}
	S_MAIN.timer_interval = setTimeout(S_MAIN.interval, 50); // 화면의 프레임을 의미한다고 본다.


	
	// 메인화면 타이틀 움직임 부분 ~ 시작 ~ 
	function titleMove() {
		$("#S_MAIN_div #title img").attr("src", "./image/mainpage/title-" + S_MAIN.titleCount + ".png");
		S_MAIN.titleCount++;
		if (S_MAIN.titleCount > 4) {
			S_MAIN.titleCount = 1;
		}
	}
	titleMove();
	// 메인화면 타이틀 움직임 부분 ~ 끝 ~ 


	switch(S_MAIN.focus)
	{
		case 1:
			utilDrawImage_no_xywh_pos('S_MAIN_div > div > #button > div:nth-of-type(1) > img' ,'image/mainpage/button/start-'+S_MAIN.button_count+'@3x.png');
			utilDrawImage_no_xywh_pos('S_MAIN_div > div > #button > div:nth-of-type(2) > img' ,'image/mainpage/button/ranking-0@3x.png');
			break;
		case 2:
			utilDrawImage_no_xywh_pos('S_MAIN_div > div > #button > div:nth-of-type(1) > img' ,'image/mainpage/button/start-0@3x.png');
			utilDrawImage_no_xywh_pos('S_MAIN_div > div > #button > div:nth-of-type(2) > img' ,'image/mainpage/button/ranking-'+S_MAIN.button_count+'@3x.png');
			break;
	}
	
	S_MAIN.button_count++;
	if(S_MAIN.button_count > 7) S_MAIN.button_count = 1;


}

S_MAIN.keyDown = function (event) {
	// console.log("~S_MAIN.keyDown~" + event.keyCode);
	// console.log("~S_MAIN.keyDown~key_lock~" + S_MAIN.key_lock);

	if (S_MAIN.key_lock == 1) {
		console.log("~S_MAIN.keyDown~key_lock~");
		return;
	}

	// 변신중일때는 키를 안먹도록 변경
	if (S_MAIN.char_mode == 5) return;

	var keyCode = event.keyCode;

	// console.log("~~"+keyCode);



	switch (keyCode) //인터벌로 계속 하고 있ㅣ때문에 자동으로 입력된값으로 결과 전달.
	{
		case 38://화살표 up
			if(S_MAIN.focus != 1) S_MAIN.button_count = 1;			
			S_MAIN.focus = 1;
			break;
		case 40://화살표 down
			if(S_MAIN.focus != 2) S_MAIN.button_count = 1;
			S_MAIN.focus = 2;
			break;
		case 13://엔터키 입력
			if(S_MAIN.focus == 1)
			{
				$("#S_MAIN_div").removeAttr('style');
				$("#S_MAIN_div").empty();
				S_GAME.init();
			}
			else if(S_MAIN.focus == 2)
			{
				$("#S_MAIN_div").removeAttr('style');
				$("#S_MAIN_div").empty();
				S_RANKING.init();
			}
			break;
	}

}
S_MAIN.keyUp = function (event) //키보드에서 손을 뗴는 순간에 작동하는것 즉 기본값으로 돌아간다.
{
}
