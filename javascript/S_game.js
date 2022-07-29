// 실제 게임에 적용되는 인터발 - > 변신할때 속도가 빨라지기 위해 2배로 변경된부분이 저장되기도 함
var TIMER_INTERVAL = 50; // 1배속(100),  2배속(50), 3배속(33), 5배속(20) //최초 67 (1초에 20번 실행)
// 여기는 초기에 적용한 인터발
var TIMER_INTERVAL_BASE = 50; // 1배속(100),  2배속(50), 3배속(33), 5배속(20) //최초 67 (1초에 20번 실행)
// var TIMER_INTERVAL = 100; // 1배속(100),  2배속(50), 3배속(33), 5배속(20) //최초 67
var S_GAME =
{
	key_lock: 0, //키락 중복 클릭 방지 예를 들어 연속 점프 같은거...

	// 캐릭터 좌표값
	char_x: 0,
	char_y: 0,
	char_base_y: 0, //캐릭터 기본 위치(높이) 좌표 점프전 값 
	char_mode: 1,// 1 = 기본 상태 , 2 = 점프 누름, 3 = 슬라이드
	char_num: 1,//캐릭터 번호

	char_w: -1,//캐릭터 너비
	char_h: -1,// 캐릭터 높이




	move_cur_frame: -1,               // 이동시 사용되는 frame의 수  //현재 프레임 장면 넘버 맥스값이랑 비교해서 값 들어감
	jump_cur_frame: -1,           // 당할때 사용되는 frame의 수
	slide_cur_frame: -1,           // 슬라이드에 사용되는 frame의 수
	change_cur_frame: -1,           // 캐릭터 변신에 사용되는 frame의 수

	move_frame_max: -1,               // 이동시 사용되는 frame의 최대수
	jump_frame_max: -1,           // 당할때 사용되는 frame의  최대수
	slide_frame_max: -1,           // 슬라이드에 사용되는 frame의  최대수
	change_frame_max: -1,           // 캐릭터 변신에 사용되는 frame의  최대수

	jump_height: 600, //점프 높이 정하는 값 높을수록 높이 뜀.
	collision_radius: 0,// 캐릭터 충돌 검사를 위한 반지름

	// 20220708_yhlee 영언이 소스 적용
	hp_bar: null,
	hp_width: 100,
	hp_max: null,
	hp_cur: null,



	bg_back_base_x: ["", 0, 1280, 2560],//뒷 배경의 첫 시작 좌표 //배열 0번쨰 없앰 //3개의 배경 각각 초기값
	bg_back_move_num: 1,//뒷 배경이 움직이는 px 단위 //몇 px로 움직일지 초당 픽셀 단위로 움직임


	bg_mid_x: ["", 0, 1280, 2560],//뒷 배경의 첫 시작 좌표 //배열 0번쨰 없앰 //3개의 배경 각각 초기값
	bg_mid_move_num: 3,//뒷 배경이 움직이는 px 단위 //몇 px로 움직일지 초당 픽셀 단위로 움직임

	bg_base_x: ["", 0, 1280, 2560],// 앞 배경의 첫 시작 좌표 
	bg_move_num: 5,//앞 배경이 움직이는 px 단위
	timer_interval: null, //인터벌 정지를 위함 S.GAME 내에서 적용

	map_div: ["", 0, 2300, 4600],
	arr_3ch: [
		[1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
		[0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
		[0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
		[0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
		[1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
	],

	map_Arr: new Array({}, {}, {}, {}),


	// 배경 이미지를 상황에 맞게 변경하기
	bg_num: 1,

	score_num_count: 0,
	score_num: 0,

	tmp: ""

};

var move_floor = 0;
var item_count = 1;

//아이템 이미지 감싸는 div영역
// let map_div = 0;

//맵 속도 점차 빨라지게 하기 위함
let map_speed = 10 //10기본속도

// 맵 라인 캐릭터 속도
let line_char_dis = 10; //점프모션
let line_location = 0;
let line_char = 0;


var item_x_w = 230;
var item_x = [];
for (let r = 0; r < 10; r++) {
	let item_num = item_x_w * r;
	item_x.push(item_num);
}
var item_y = [16, 116, 216, 316, 416, 516, 616];
var item_wh = [0, 60, 80, 60, 80, 120];

//바닥 
let floor_w = 230;
let fl_x = [];
var fl_y = [16, 116, 216, 316, 416, 516, 616];
for (let k = 0; k < 10; k++) {
	let fl_num = floor_w * k;
	fl_x.push(fl_num);
}


//map 돌릴때 마다 다른 맵이 나오게하는 카운터
let map_count = 3;
let line_char_count = 7; //점프모션

//tag를 만들어 주는곳
S_GAME.maketag = function () {

	$("#S_GAME_div").empty(); // 안에 있는 자식 요소들 태그 및 내용을 다 지워주는 역할 지워주는 이유는 html에 설명

	var div = document.getElementById("S_GAME_div"); //여기 있는 아이디를 가진 태그를 밑에 있는 태그로 바꿔치기
	div.innerHTML =
		'	<img id="Img_GA_bg1_back">' +
		'	<img id="Img_GA_bg2_back">' +
		'	<img id="Img_GA_bg3_back">' +

		'	<img id="Img_GA_bg1_mid">' +
		'	<img id="Img_GA_bg2_mid">' +
		'	<img id="Img_GA_bg3_mid">' +

		'	<img id="Img_GA_bg1">' +
		'	<img id="Img_GA_bg2">' +
		'	<img id="Img_GA_bg3">' +

		'	<div id="Img_GA_change_effect_dg"></div>' +

		'	<div id="Img_GA_map1"></div>' +
		'	<div id="Img_GA_map2"></div>' +
		'	<div id="Img_GA_map3"></div>' +

		'	<div id="score_div">' +
		'		<img id="score_div_bg">' +
		'		<div id="score_div_text"></div>' +
		'	</div>' +

		'	<img id="Img_GA_map_line">' +
		'	<img id="Img_GA_map_line_unit">' +

		'	<div id="Img_GA_effect_dg"></div>' +

		'	<img id="Img_GA_our_unit">' +
		'	<img id="Img_GA_our_unit_line">' +
		'	<div id="progress">' +
		'		<img id = "progressBar_bg">' +
		'		<div id = "progressBar_hp">' +
		'			<div id="progressBar_hp_red"></div>' +
		'		</div>' +
		'		<img id = "progressBar_icon">' +
		'	</div > ' +
		'	<img id="Img_GA_our_unit_slide_line">' +
		'';
	S_GAME.interval();
}


S_GAME.init = function () {
	console.log("~S_GAME.init()~");

	g_sceneinfo.cur_scene = "S_GAME";
	// 필요한 정보들을 초기화
	S_GAME.define();
	S_GAME.maketag();

}

S_GAME.define = function () {

	//캐릭터의 현재 프레임을 초기화
	S_GAME.move_cur_frame = 1;
	S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ = 1;
	S_GAME.slide_cur_frame = 1;
	S_GAME.change_cur_frame = 1;

	//캐릭터의 프레임 마다의 맥스 수치 표시
	S_GAME.move_frame_max = CHAR_OUR_TEAM[S_GAME.char_num].move_frame_num;
	S_GAME.jump_frame_max = CHAR_OUR_TEAM[S_GAME.char_num].jump_frame_num;
	S_GAME.slide_frame_max = CHAR_OUR_TEAM[S_GAME.char_num].slide_frame_num;
	S_GAME.change_frame_max = CHAR_OUR_TEAM[S_GAME.char_num].change_frame_num;

	S_GAME.char_x = 30; //캐릭터 이미지 왼쪽 기준 left30과 같은 개념
	//180 바닥 높이 , 70 캐릭터가 바닥에서 얼마나 높이에 있냐?
	S_GAME.char_y/*캐릭터 y좌표값*/ = S_GAME.char_base_y = SCREEN_HEIGHT - 180 - CHAR_OUR_TEAM[S_GAME.char_num].h + 70;
	//캐릭터 위치 조정 값

	S_GAME.char_w = CHAR_OUR_TEAM[S_GAME.char_num].w;
	S_GAME.char_h = CHAR_OUR_TEAM[S_GAME.char_num].h;
	//출동검사해야하는 반지름을 넣는다  기본값 셋팅
	S_GAME.collision_radius = S_GAME.char_w / 2;
	//map그려주는 2차원 배열
	S_GAME.map_Arr[1].map = LevelMap[1].data;
	S_GAME.map_Arr[2].map = LevelMap[2].data;
	S_GAME.map_Arr[3].map = LevelMap[3].data;

	S_GAME.score_num = S_GAME.score_num_count;

	// 초기 HP설정
	S_GAME.hp_max = 1000;
	// S_GAME.hp_max = 100000;
	S_GAME.hp_cur = S_GAME.hp_max;


	S_GAME.score_num_count = 0;
	S_GAME.score_num = 0;


	S_GAME.bg_back_base_x = ["", 0, 1280, 2560];//뒷 배경의 첫 시작 좌표 //배열 0번쨰 없앰 //3개의 배경 각각 초기값
	S_GAME.bg_mid_x = ["", 0, 1280, 2560];//뒷 배경의 첫 시작 좌표 //배열 0번쨰 없앰 //3개의 배경 각각 초기값
	S_GAME.bg_base_x = ["", 0, 1280, 2560];// 앞 배경의 첫 시작 좌표 
	S_GAME.map_div = ["", 0, 2300, 4600];







	move_floor = 0;
	item_count = 1;

	//아이템 이미지 감싸는 div영역
	// let map_div = 0;

	//맵 속도 점차 빨라지게 하기 위함
	map_speed = 10 //10기본속도

	// 맵 라인 캐릭터 속도
	line_char_dis = 10; //점프모션
	line_location = 0;
	line_char = 0;


	item_x_w = 230;
	item_x = [];
	for (let r = 0; r < 10; r++) {
		let item_num = item_x_w * r;
		item_x.push(item_num);
	}
	item_y = [16, 116, 216, 316, 416, 516, 616];
	item_wh = [0, 60, 80, 60, 80, 120];

	//바닥 
	floor_w = 230;
	fl_x = [];
	fl_y = [16, 116, 216, 316, 416, 516, 616];
	for (let k = 0; k < 10; k++) {
		let fl_num = floor_w * k;
		fl_x.push(fl_num);
	}


	//map 돌릴때 마다 다른 맵이 나오게하는 카운터
	map_count = 3;
	line_char_count = 7; //점프모션







}

S_GAME.interval = function () {

	if (g_sceneinfo.cur_scene != "S_GAME") return;

	TIMER_INTERVAL = TIMER_INTERVAL_BASE;


	// 만약 변신중이라면  진행하지 말자
	if (S_GAME.char_mode == 4) {
		S_GAME.char_change();
		return;
	} else if (S_GAME.char_mode == 5) {
		TIMER_INTERVAL = TIMER_INTERVAL_BASE / 1.5;
	} else if (S_GAME.char_mode == 6) {//변신 종료 부분
		S_GAME.char_change_end();
		return;
	}


	// 20220708_yhlee 영언이 소스 적용
	S_GAME.hp_cur--;
	S_GAME.hp_width = (S_GAME.hp_cur / S_GAME.hp_max) * 100;

	S_GAME.drawBG();
	S_GAME.drawChar();
	S_GAME.map_line();
	S_GAME.score();

	// 20220708_yhlee 영언이 소스 적용
	S_GAME.progressBar();

	// S_GAME.drawYouChar();
	S_GAME.char_eat();
	S_GAME.char_fall();
	S_GAME.drawMap();

	if (S_GAME.timer_interval != null)// 뭔가 실행되고 있는데 있으면 멈추라는 의미
	{
		clearInterval(S_GAME.timer_interval);
		S_GAME.timer_interval = null; // 다시 초기화 해주는 작업
	}
	S_GAME.timer_interval = setTimeout(S_GAME.interval, TIMER_INTERVAL); // 화면의 프레임을 의미한다고 본다.




	for (let m = 1; m <= 3; m++) {
		for (let i = 0; i < S_GAME.map_Arr[m].map.length; i++) {
			for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {
				if (S_GAME.map_Arr[m].map[i][j] > 0) {
					if (S_GAME.map_Arr[m].map[i][j] != 101) {
						$(`#Div_GA_map${m}_` + i + "_" + j).css({
							width: "230px",
							height: "120px",
							left: item_x[j] + "px",
							top: item_y[i] + "px",
							position: "absolute",
							display: "flex",
							"justify-content": "center",
							"align-items": "center"
						})
					} else if (S_GAME.map_Arr[m].map[i][j] == 101) {
						$(`#Div_GA_map${m}_` + i + "_" + j).css({
							width: "230px",
							height: "120px",
							left: item_x[j] + "px",
							top: item_y[i] + "px",
							position: "absolute",
							display: "flex",
							"justify-content": "center"
						})
					}
				}
			}
		}
	}
}
//setTimeout에 타임인터벌 만큼 호출 된다(1초에 50번) 위에서 변수 선언한 값(0.05초에 한번씩 호출된다.)
//setTimeout: 특정시간 후에 불러라
S_GAME.drawBG = function () //뒷배경을 그리겠다.
{
	if (g_sceneinfo.cur_scene != "S_GAME") return;

	for (var i = 1; i <= 3; i++) //뒷배경3장을 동시에 움직이기 위한 for문
	{
		S_GAME.bg_back_base_x[i] -= S_GAME.bg_back_move_num; // -1px씩 이동하기 위함 

		// 뒷배경 움직임
		utilDrawImage("Img_GA_bg" + i + "_back", 'image/bg/map_' + S_GAME.bg_num + '3.png', S_GAME.bg_back_base_x[i], 0, 1280, 720, 'absolute');

		if (S_GAME.bg_back_base_x[i] < -1280) // x좌표가 -1281px이되면 2560좌표로 보내겠다.
			S_GAME.bg_back_base_x[i] = 2560 - S_GAME.bg_back_move_num;
	}

	for (var i = 1; i <= 3; i++) {
		S_GAME.bg_mid_x[i] -= S_GAME.bg_mid_move_num;

		// 중간배경 움직임
		utilDrawImage("Img_GA_bg" + i + "_mid", 'image/bg/map_' + S_GAME.bg_num + '2.png', S_GAME.bg_mid_x[i], 0, 1280, 720, 'absolute');

		if (S_GAME.bg_mid_x[i] < -1280)
			S_GAME.bg_mid_x[i] = 2560 - S_GAME.bg_mid_move_num;
	}

	for (var i = 1; i <= 3; i++) {
		S_GAME.bg_base_x[i] -= S_GAME.bg_move_num;

		// 앞배경 움직임
		utilDrawImage("Img_GA_bg" + i, 'image/bg/map_' + S_GAME.bg_num + '1.png', S_GAME.bg_base_x[i], 0, 1280, 720, 'absolute');

		if (S_GAME.bg_base_x[i] < -1280)
			S_GAME.bg_base_x[i] = 2560 - S_GAME.bg_move_num;
	}
}



S_GAME.drawChar = function () // 캐릭터의 특정 행동을 그린다.
{
	if (g_sceneinfo.cur_scene != "S_GAME") return;

	switch (S_GAME.char_mode) // 어떤 상태 인지에 따라 결과가 나온다.
	{
		case 1://기본상태
			// utilDrawImage_no_wh_pos( 'Img_GA_our_unit','./image/char/ally_'+S_GAME.char_num+'/fox-'+S_GAME.move_cur_frame+'.png',S_GAME.char_x,S_GAME.char_y/*캐릭터 y좌표값*/);
			utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-' + S_GAME.move_cur_frame/*1*/ + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/, S_GAME.char_w, S_GAME.char_h, 'absolute');
			if (S_GAME.move_cur_frame >= S_GAME.move_frame_max)
				S_GAME.move_cur_frame = S_GAME.move_frame_max - 5;
			else
				S_GAME.move_cur_frame++;
			break;
		case 2://점프
			var jump_gap = (S_GAME.jump_height) / (S_GAME.jump_frame_max / 2);
			//현재 시점에서 얼마만큼 점프 할거냐를 나타냄  /2는 점프 한번에 올라갔다 내려갔다를 한동작으로 생각해야한다. 결론 점프 픽셀 최소단위로 몇장씩 들어가는지 구하기 위함이다.

			if (S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ <= (S_GAME.jump_frame_max / 2))
				S_GAME.char_y/*캐릭터 y좌표값*/ -= jump_gap; //-값이 점프하는거고 +값이 내려온다.

			else if (S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ > (S_GAME.jump_frame_max / 2))
				S_GAME.char_y/*캐릭터 y좌표값*/ += jump_gap;

			if (S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ >= S_GAME.jump_frame_max) //점프 프레임 사진 장수 확인 체크
			{
				S_GAME.char_y/*캐릭터 y좌표값*/ = S_GAME.char_base_y;//점프하기전에 초기 y값(캐릭터의 기본값)
				S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ = 1;//점프의 프레임을 초기화 하기 //점프 모션 초기화 첫장면으로
				S_GAME.char_mode = 1;//기본 모드로 바꾸고 //달리는모드로 돌리기
				S_GAME.key_lock = 0;//키보드 입력 풀고 //중복점프가 안되게 락 걸어놓은거 1,0은 허용과 불허 구분
			}
			else {
				S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/++;
			}
			// utilDrawImage_no_wh_pos( 'Img_GA_our_unit','./image/char/ally_'+S_GAME.char_num+'/fox-jump-'+S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/+'.png',S_GAME.char_x,S_GAME.char_y/*캐릭터 y좌표값*/);
			utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-jump-' + S_GAME.jump_cur_frame/*현재 나의 점프 상황 번호*/ + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/, S_GAME.char_w, S_GAME.char_h, 'absolute');
			break;

		case 3://슬라이드
			// utilDrawImage_no_wh_pos( 'Img_GA_our_unit','./image/char/ally_'+S_GAME.char_num+'/fox-slide-'+S_GAME.slide_frame_max+'.png',S_GAME.char_x,S_GAME.char_y/*캐릭터 y좌표값*/+30);
			// utilDrawImage( 'Img_GA_our_unit','./image/char/ally_'+S_GAME.char_num+'/fox-slide-'+S_GAME.slide_cur_frame+'.png',S_GAME.char_x,S_GAME.char_y/*캐릭터 y좌표값*/+30,S_GAME.char_w,S_GAME.char_h,'absolute');
			utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-slide-' + S_GAME.slide_cur_frame + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/ + 30, S_GAME.char_w, S_GAME.char_h, 'absolute');

			if (S_GAME.slide_cur_frame >= S_GAME.slide_frame_max) //슬라이드를 최대치까지 했느냐 체크하는거
				S_GAME.slide_cur_frame = S_GAME.slide_frame_max; //여기서 초기화를 시켜주지 않는이유는 아래에서 키다운 이밴트를 적용 시킬것이기 때문이다.
			else
				S_GAME.slide_cur_frame++;
			break;
		case 4://캐릭터 변신하는 초기 부분 및 , 마지막 부분  해당 모드일때는 interval자체도 안돈다.
			break;
		case 5://캐릭터 변신
			// utilDrawImage('Img_GA_our_unit', 'image/char/ally_' + S_GAME.char_num + '/fox-change-' + S_GAME.change_cur_frame + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/ + 30, S_GAME.char_w, S_GAME.char_h, 'absolute');

			// if (S_GAME.change_cur_frame >= S_GAME.change_frame_max) 
			// 	S_GAME.change_cur_frame = S_GAME.change_frame_max - 7; 
			// else
			// 	S_GAME.change_cur_frame++;




			//CORB 오류로 인하여 gif로 변경해보자
			if(S_GAME.change_cur_frame == 59)
			{
				utilDrawImage('Img_GA_our_unit', 'image/char/ally_' + S_GAME.char_num + '/fox-change-59.gif', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/ + 30, S_GAME.char_w, S_GAME.char_h, 'absolute');
				S_GAME.change_cur_frame++;
			}

			break;

	}
}



//아이템 및 바닥 그려주는 함수
S_GAME.drawMap = function () {

	if (g_sceneinfo.cur_scene != "S_GAME") return;

	item_count++;
	if (item_count > 3) {//아이템 이미지 반복할 갯수
		item_count = 1;
	}


	for (let m = 1; m <= 3; m++) {
		for (let i = 0; i < (S_GAME.map_Arr[m].map.length); i++) {
			for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {

				//모든 2차원 배열에 태그 및 아이디 달아주는 코드
				var div = document.getElementById(`Img_GA_map${m}`);
				var map_img_div = document.createElement("div");
				var map_img = document.createElement("img");

				map_img_div.id = `Div_GA_map${m}_` + i + "_" + j;
				map_img.id = `Img_GA_map${m}_` + i + "_" + j;

				if (document.getElementById(`Img_GA_map${m}_` + i + "_" + j) == null) {
					map_img_div.appendChild(map_img);
					div.appendChild(map_img_div);
				}

				if (S_GAME.map_Arr[m].map[i][j] === 1) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/item/apple1-' + item_count + '.png', item_wh[1], item_wh[1]);
				} else if (S_GAME.map_Arr[m].map[i][j] === 2) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/item/apple2-' + item_count + '.png', item_wh[2], item_wh[2]);
				} else if (S_GAME.map_Arr[m].map[i][j] === 3) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/item/frog1-' + item_count + '.png', item_wh[3], item_wh[3]);
				} else if (S_GAME.map_Arr[m].map[i][j] === 4) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/item/frog2-' + item_count + '.png', item_wh[4], item_wh[4]);
				} else if (S_GAME.map_Arr[m].map[i][j] === 5) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/item/frog3-' + item_count + '.png', item_wh[5], item_wh[5]);
				} else if (S_GAME.map_Arr[m].map[i][j] == 101) {
					utilDrawImage_no_lefttop_nopos(`Img_GA_map${m}_` + i + "_" + j, './image/floor/floor_' + S_GAME.bg_num + '.png', floor_w, 104);
				} else {
					// console.log("0 아무것도 없음");
				}

			}
		}

		//1프레임 돌때 마다 조금씩 속도가 올라가는 코드
		map_speed += 0.02; //0.02 기본
		S_GAME.map_div[m] -= map_speed; //10 기본값

		$(`#Img_GA_map${m}`).css({
			left: S_GAME.map_div[m] + "px",
			top: 0 + "px",
			position: 'absolute'
		})

		if (S_GAME.map_div[m] < -2300) { // x좌표가 -2300px이되면 가장 뒤에 있는 배열 좌표로 보내겠다.
			$(`#Img_GA_map${m}`).empty();
			//map 15까지나오고 1로 돌려주는 코드
			if (14 < map_count) {
				map_count = 1;
			} else {
				map_count++;
			}
			//
			switch (m) {
				case 1: S_GAME.map_div[m] = S_GAME.map_div[3] + 2300 - map_speed - 10;
					S_GAME.map_Arr[1].map = LevelMap[map_count].data;
					break
				case 2: S_GAME.map_div[m] = S_GAME.map_div[1] + 2300 - map_speed - 10;
					S_GAME.map_Arr[2].map = LevelMap[map_count].data;
					break
				case 3: S_GAME.map_div[m] = S_GAME.map_div[2] + 2300 - map_speed - 10;
					S_GAME.map_Arr[3].map = LevelMap[map_count].data;
					break
			}
		}
	}
}






S_GAME.map_line = function () {

	if (g_sceneinfo.cur_scene != "S_GAME") return;

	line_char = line_char_dis;
	line_char_dis += 0.2;

	line_location = line_char + 210;

	//mapline 그리기
	utilDrawImage('Img_GA_map_line', './image/mapline/mapline.svg', 297, 677, 686, 20, 'absolute');

	//mapline에서 캐릭터 움직이기(점프 모션)
	utilDrawImage('Img_GA_map_line_unit', './image/char/ally_1/fox-jump-' + line_char_count + '.png', line_location, 585, 200, 200, 'absolute');

	// 맵 진행도에 따른 배경이미지 변경

	S_GAME.map_line_bg_change();

	line_char_count++;
	if (line_char_count > 12) //아이템 이미지 반복할 갯수
		line_char_count = 9;
}

// 맵 진행도에 따른 배경이미지 변경
S_GAME.map_line_bg_change = function () {
	// 진행상황에 따른 배경 변경하기
	if (line_location <= 270) S_GAME.bg_num = 1;
	else if (line_location > 270 && 346 >= line_location) S_GAME.bg_num = 2;
	else if (line_location > 347 && 422 >= line_location) S_GAME.bg_num = 3;
	else if (line_location > 423 && 498 >= line_location) S_GAME.bg_num = 4;
	else if (line_location > 499 && 574 >= line_location) S_GAME.bg_num = 5;
	else if (line_location > 575 && 650 >= line_location) S_GAME.bg_num = 6;
	else if (line_location > 651 && 726 >= line_location) S_GAME.bg_num = 7;
	else if (line_location > 727 && 802 >= line_location) S_GAME.bg_num = 8;
	else if (line_location > 803) S_GAME.bg_num = 9;

}



S_GAME.keyDown = function (event) {
	// console.log("~S_GAME.keyDown~" + event.keyCode);
	// console.log("~S_GAME.keyDown~key_lock~" + S_GAME.key_lock);


	if (S_GAME.key_lock == 1) {
		console.log("~S_GAME.keyDown~key_lock~");
		return;
	}

	// 변신중일때는 키를 안먹도록 변경
	if (S_GAME.char_mode == 5) return;

	var keyCode = event.keyCode;

	// console.log("~~"+keyCode);

	switch (keyCode) //인터벌로 계속 하고 있ㅣ때문에 자동으로 입력된값으로 결과 전달.
	{
		case 49://1번
			console.log("~1번~");
			line_char_dis = 0;
			break;
		case 50://2번
			console.log("~2번~");
			line_char_dis = 224;
			break;
		case 51://3번
			console.log("~3번~");
			line_char_dis = 452;
			break;

		case 38://화살표 up
			S_GAME.key_lock = 1;
			S_GAME.char_mode = 2;
			break;
		case 40://화살표 down
			S_GAME.char_mode = 3;
			break;
	}

}
S_GAME.keyUp = function (event) //키보드에서 손을 뗴는 순간에 작동하는것 즉 기본값으로 돌아간다.
{
	// console.log("~S_GAME.keyUp~" + event.keyCode);
	// console.log("~S_GAME.keyUp~key_lock~" + S_GAME.key_lock);

	if (S_GAME.key_lock == 1) {
		console.log("~S_GAME.keyUp~key_lock~");
		return;
	}

	var keyCode = event.keyCode;
	// console.log("~~"+keyCode);

	switch (keyCode) {
		// case 38://화살표 up
		case 40://화살표 down
			// 변신중일때는 키를 안먹도록 변경
			if (S_GAME.char_mode == 5) return;

			S_GAME.char_mode = 1;
			S_GAME.slide_cur_frame = 1;
			break;

		//일시정지
		case 27:
			if (g_sceneinfo.cur_scene == "S_GAME") {
				if (S_GAME.timer_interval != null)// 뭔가 실행되고 있는데 있으면 멈추라는 의미
				{
					clearInterval(S_GAME.timer_interval);
					S_GAME.timer_interval = null; // 다시 초기화 해주는 작업
				} else {
					S_GAME.interval();
				}
			}
			break;
	}
}

//캐릭터가 아이템 먹을때 점수 올리기
S_GAME.score = function () {

	if (g_sceneinfo.cur_scene != "S_GAME") return;

	$('#score_div').css({
		left: 904 + "px",
		top: 23 + "px",
		width: "350px",
		height: "80px",
		position: 'absolute',
	});

	utilDrawImage_no_wh_pos('score_div_bg', './image/score/bg.png', 0, 0);

	$('#score_div_text').css({
		left: "0px",
		top: "0px",
		width: "100%",
		height: "100%",
		position: 'absolute',
		"text-align": "center",
		color: "white",
		fontSize: 43 + "px"
	});

	let score_div = document.getElementById('score_div_text'); //block;
	score_div.innerHTML = S_GAME.score_num.toLocaleString('ko-KR');
}




S_GAME.char_eat = function () //캐릭터가 아이템 먹을때 일시정지 하기
{
	if (g_sceneinfo.cur_scene != "S_GAME") return;

	if (S_GAME.char_mode == 1 || S_GAME.char_mode == 5) { //평상시 충돌, 변신한 상황에서의 충돌
		S_GAME.collision_radius = 150;
		for (let m = 1; m <= 3; m++) {
			for (let i = 0; i < S_GAME.map_Arr[m].map.length; i++) {
				for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {
					if (S_GAME.map_Arr[m].map[i][j] != 0) {
						//원형 충돌검사
						let cx = (S_GAME.char_w / 2 + S_GAME.char_x) - ((item_x_w / 2) + item_x[j] + S_GAME.map_div[m]);//(캐릭터 너비 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 너비 반틈 + 0,0좌표에서 이미지 시작점)
						let cy = (S_GAME.char_w / 2 + S_GAME.char_y) - (60 + item_y[i]); //(캐릭터 높이 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 높이 반틈 + 0,0좌표에서 이미지 시작점)

						//원사이의 거리
						let d = Math.sqrt((cx * cx) + (cy * cy)); //Math.sqrt 가 루트 쓰는 매서드

						//반지름의 합
						let cd = S_GAME.collision_radius + (item_wh[S_GAME.map_Arr[m].map[i][j]] / 2);

						let score_tag = document.getElementById(`Img_GA_map${m}_${i}_${j}`); //block;
						// console.log("S_GAME.char_eat~"+score_tag);		
						if (cd >= d) {
							if (score_tag.style.display != 'none') {
								$(`#Img_GA_map${m}_${i}_${j}`).css({
									display: "none"
								})
								//아이템 충돌시 
								switch (S_GAME.map_Arr[m].map[i][j]) {
									case 1: // 빨간사과(피20%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.2;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 2: // 황금사과(피50%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.5;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 3: // 초록개구리(점수 10점 증가)
										S_GAME.score_num_count += 10;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 4://파랑개구리(점수 20점 증가)
										S_GAME.score_num_count += 20;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 5://변신 아이템 ( 무지개 개구리 )를 먹은 경우
										S_GAME.char_mode = 4;
										break;
								}
							}
						}
					}
				}
			}
		}
	} else if (S_GAME.char_mode == 2) { //점프시 충돌 
		let collision_radius_arr = [0, 150, 80, 60, 60, 40, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 40, 60, 60, 80, 150];
		S_GAME.collision_radius = collision_radius_arr[S_GAME.jump_cur_frame];
		for (let m = 1; m <= 3; m++) {
			for (let i = 0; i < S_GAME.map_Arr[m].map.length; i++) {
				for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {
					if (S_GAME.map_Arr[m].map[i][j] != 0) {
						//원형 충돌검사
						let cx = (S_GAME.char_w / 2 + S_GAME.char_x) - ((item_x_w / 2) + item_x[j] + S_GAME.map_div[m]);//(캐릭터 너비 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 너비 반틈 + 0,0좌표에서 이미지 시작점)
						let cy = (S_GAME.char_w / 2 + S_GAME.char_y) - (60 + item_y[i]); //(캐릭터 높이 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 높이 반틈 + 0,0좌표에서 이미지 시작점)

						//원사이의 거리
						let d = Math.sqrt((cx * cx) + (cy * cy)); //Math.sqrt 가 루트 쓰는 매서드

						//반지름의 합
						let cd = S_GAME.collision_radius + (item_wh[S_GAME.map_Arr[m].map[i][j]] / 2);

						let score_tag = document.getElementById(`Img_GA_map${m}_${i}_${j}`); //block;
						// console.log(score_tag);		
						if (cd >= d) {
							if (score_tag.style.display != 'none') {
								$(`#Img_GA_map${m}_${i}_${j}`).css({
									display: "none"
								})
								//아이템 충돌시 
								switch (S_GAME.map_Arr[m].map[i][j]) {
									case 1: // 빨간사과(피20%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.2;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 2: // 황금사과(피50%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.5;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 3: // 초록개구리(점수 10점 증가)
										S_GAME.score_num_count += 10;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 4://파랑개구리(점수 20점 증가)
										S_GAME.score_num_count += 20;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 5://변신 아이템 ( 무지개 개구리 )를 먹은 경우
										S_GAME.char_mode = 4;
										break;
								}
							}
						}
					}
				}
			}
		}


	} else if (S_GAME.char_mode == 3) { //슬라이딩 충돌

		let collision_radius_arr = [0, 150, 80, 60, 60];
		S_GAME.collision_radius = collision_radius_arr[S_GAME.slide_cur_frame];

		for (let m = 1; m <= 3; m++) {
			for (let i = 0; i < S_GAME.map_Arr[m].map.length; i++) {
				for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {
					if (S_GAME.map_Arr[m].map[i][j] != 0) {
						//원형 충돌검사
						let cx = (S_GAME.char_w / 2 + S_GAME.char_x) - ((item_x_w / 2) + item_x[j] + S_GAME.map_div[m]);//(캐릭터 너비 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 너비 반틈 + 0,0좌표에서 이미지 시작점)
						let cy = (S_GAME.char_w / 2 + S_GAME.char_y) - (60 + item_y[i]); //(캐릭터 높이 반틈 + 0,0좌표에서 이미지 시작점) - (아이템 높이 반틈 + 0,0좌표에서 이미지 시작점)

						//원사이의 거리
						let d = Math.sqrt((cx * cx) + (cy * cy)); //Math.sqrt 가 루트 쓰는 매서드

						//반지름의 합
						let cd = S_GAME.collision_radius + (item_wh[S_GAME.map_Arr[m].map[i][j]] / 2);

						let score_tag = document.getElementById(`Img_GA_map${m}_${i}_${j}`); //block;
						// console.log(score_tag);		
						if (cd >= d) {
							if (score_tag.style.display != 'none') {
								$(`#Img_GA_map${m}_${i}_${j}`).css({
									display: "none"
								})
								//아이템 충돌시 
								switch (S_GAME.map_Arr[m].map[i][j]) {
									case 1: // 빨간사과(피20%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.2;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 2: // 황금사과(피50%증가)
										S_GAME.hp_cur += S_GAME.hp_max * 0.5;
										if (S_GAME.hp_cur >= S_GAME.hp_max)
											S_GAME.hp_cur = S_GAME.hp_max;
										break;
									case 3: // 초록개구리(점수 10점 증가)
										S_GAME.score_num_count += 10;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 4://파랑개구리(점수 20점 증가)
										S_GAME.score_num_count += 20;
										S_GAME.score_num = S_GAME.score_num_count;
										break;
									case 5://변신 아이템 ( 무지개 개구리 )를 먹은 경우
										S_GAME.char_mode = 4;
										break;
								}
							}
						}
					}
				}
			}
		}
	}
}


/** 캐릭터 낙사 범위
 * 캐릭터가 기본상태나 슬라이딩 상태일때 충돌검사 실행
 * 캐릭터의 검사 좌표는 중심점에서 가장하단으로 이동해서 검사(사각형) 앞뒤 여백 주기
 * 땅은 사각형 범위로 충돌검사
 * 
 */


S_GAME.char_fall = function () //캐릭터가 바닥에서 떨어질때 일시정지 하기
{
	if (g_sceneinfo.cur_scene != "S_GAME") return;

	// 변신중일때는 안떨어진다.
	if (S_GAME.char_mode == 5) return;


	if (S_GAME.char_mode == 1) {
		//사각형 충돌검사
		for (let m = 1; m <= 3; m++) {
			for (let i = 0; i < S_GAME.map_Arr[m].map.length; i++) {
				for (let j = 0; j < S_GAME.map_Arr[m].map[i].length; j++) {

					if (i == 6) { //가장 밑바닥이랑 충돌 경우
						if (S_GAME.map_Arr[m].map[i][j] == 0) { //가장 밑바닥에 0일경우 낙사 코드

							let cx1 = S_GAME.char_x + (S_GAME.char_w / 4); //캐릭터 왼쪽 부분
							let cx2 = S_GAME.char_x + (S_GAME.char_w / 2) + (S_GAME.char_w / 4); //캐릭터 오른쪽 부분
							// let cy1 = S_GAME.char_y; //캐릭터 윗부분
							// let cy2 = S_GAME.char_y+S_GAME.char_h; // 캐릭터 아래 부분
							let fx1 = fl_x[j] + S_GAME.map_div[m];
							let fx2 = fx1 + floor_w;
							let fx_1 = fl_x[j - 1] + S_GAME.map_div[m];
							let fx_2 = fx_1 + floor_w;
							// let fy1 = 540; //아이템 윗부분
							// let fy2 = 720; //아이템 아래 부분
							if ((fx1 <= cx1) && (fx2 >= cx2)) { //x축 충돌 검사
								S_GAME.char_y += 20;
								if (S_GAME.char_y > 320) { //캐릭터가 약간이라도 떨어지면 죽은걸로 판단하기 위해서 //기본값 310
									// 게임결과 화면 띠우자
									// S_GAME.char_y = 450;
									// utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-' + S_GAME.move_cur_frame/*1*/ + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/, S_GAME.char_w, S_GAME.char_h, 'absolute');
									// clearInterval(S_GAME.timer_interval);
									// S_GAME.interval = null; // 다시 초기화 해주는 작업


									clearInterval(S_GAME.timer_interval);
									S_GAME.timer_interval = null; // 다시 초기화 해주는 작업
									$("#S_GAME_div").empty();
									S_GAMEOVER.init();
								}
							}
							//
							//캐릭터가 점프후에 평상시모드로 돌아가고난후 충돌검사를 위한 코드

							if (S_GAME.map_Arr[m].map[i][j - 1] == 0) { //가장 밑바닥에 0일경우 낙사 코드

								let cx1 = S_GAME.char_x + (S_GAME.char_w / 4); //캐릭터 왼쪽 부분
								let cx2 = S_GAME.char_x + (S_GAME.char_w / 2) + (S_GAME.char_w / 4); //캐릭터 오른쪽 부분
								// let cy1 = S_GAME.char_y; //캐릭터 윗부분
								// let cy2 = S_GAME.char_y+S_GAME.char_h; // 캐릭터 아래 부분
								let fx1 = fl_x[j] + S_GAME.map_div[m];
								let fx2 = fx1 + floor_w;
								let fx_1 = fl_x[j - 1] + S_GAME.map_div[m];
								let fx_2 = fx_1 + floor_w;
								// let fy1 = 540; //아이템 윗부분
								// let fy2 = 720; //아이템 아래 부분
								if ((cx1 < fx_2) && (cx2 >= fx1)) { //x축 충돌 검사
									S_GAME.char_y += 20;
									if (S_GAME.char_y > 320) { //캐릭터가 약간이라도 떨어지면 죽은걸로 판단하기 위해서 //기본값 310
										// 게임결과 화면 띠우자
										// S_GAME.char_y = 450;
										// utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-' + S_GAME.move_cur_frame/*1*/ + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/, S_GAME.char_w, S_GAME.char_h, 'absolute');
										// clearInterval(S_GAME.timer_interval);
										// S_GAME.interval = null; // 다시 초기화 해주는 작업
										clearInterval(S_GAME.timer_interval);
										S_GAME.timer_interval = null; // 다시 초기화 해주는 작업
										$("#S_GAME_div").empty();
										S_GAMEOVER.init();
									}
								}

							}
						}
					}
				}
			}
		}
	}
}

// 20220708_yhlee 영언이 소스 적용

/**
 * 피 닳는 프로그레스바
 */
// hp_max = 현재 피 최대치
// hp_cur = 현재 피 상황
// 초기값 : hp_max = hp_cur
// interval -> hp_cur만 줄어들어야 함
// hp_cur가 hp_max 기준으로 w 값이 몇%지 계산해서 W 값 지정

S_GAME.progressBar = function () {

	if (g_sceneinfo.cur_scene != "S_GAME") return;

	// progress bar
	$("#progress").css({
		left: "28px",
		top: "0px",
		width: "520px",
		height: "81px",
		position: 'absolute'
	});

	$("#progressBar_hp").css({
		left: "85px",
		top: "49px",
		height: "30px",
		width: "427px",
		position: 'absolute'
	});

	$("#progressBar_hp_red").css({
		left: "0px",
		top: "0px",
		width: "100%",
		height: "100%",
		"border-radius": "15px",
		backgroundColor: 'red',
		position: 'absolute'
	});

	$("#progressBar_hp_red").css({
		width: "100%",
	});


	utilDrawImage_no_wh_pos('progressBar_bg', './image/HP/hp_bar_bg.png', 37, 3);


	if (S_GAME.hp_width > 0) {
		$("#progressBar_hp_red").css({
			width: S_GAME.hp_width + "%",
		});

		if (S_GAME.hp_width < 33) {
			$("#progressBar_hp_red").css({
				backgroundColor: '#007500'
			});
			utilDrawImage('progressBar_icon', './image/HP/hp_icon3.png', 0, 0, 147, 141, 'absolute');
		}
		else if (S_GAME.hp_width < 66) {
			$("#progressBar_hp_red").css({
				backgroundColor: '#9B5600'
			});
			utilDrawImage('progressBar_icon', './image/HP/hp_icon2.png', 0, 0, 147, 141, 'absolute');
		}
		else {
			$("#progressBar_hp_red").css({
				backgroundColor: 'red'
			});
			utilDrawImage('progressBar_icon', './image/HP/hp_icon1.png', 0, 0, 147, 141, 'absolute');
		}


	}
	else {
		// 게임결과 화면 띠우자
		clearInterval(S_GAME.timer_interval);
		S_GAME.timer_interval = null; // 다시 초기화 해주는 작업
		$("#S_GAME_div").empty();
		S_GAMEOVER.init();

	}
}


// 캐릭터가 무지개 개구리를 먹고 변신하는 부분 
S_GAME.char_change = function () {

	S_GAME.char_mode = 4;

	let change_loop = function () {
		$('#Img_GA_effect_dg').css({
			left: '0px',
			top: '0px',
			width: '1280px',
			height: '720px',
			background: 'black',
			"background": "url('./image/bg/effect.gif')",
			opacity: '0.9',
			position: 'absolute'
		});

		// console.log("~" + S_GAME.change_cur_frame);
		utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-change-' + S_GAME.change_cur_frame + '.png', 390, 75/*캐릭터 y좌표값*/ + 30, 500, 500, 'absolute');
		if (S_GAME.change_cur_frame > 58) {
			$('#Img_GA_effect_dg').css({
				opacity: '0'
			});

			$('#Img_GA_change_effect_dg').css({
				left: '0px',
				top: '0px',
				width: '1280px',
				height: '720px',
				background: 'black',
				"background": "url('./image/bg/effect.gif')",
				opacity: '0.9',
				position: 'absolute'
			});

			S_GAME.char_mode = 5;
			S_GAME.interval();
			setTimeout(function () {
				S_GAME.char_mode = 6;
			}, 4000);
		}
		else {
			S_GAME.change_cur_frame++;
			setTimeout(change_loop, 40);
		}
	}
	change_loop();
}

S_GAME.char_change_end = function () {

	let cange_cur_frame = 1;
	let change_loop = function () {
		utilDrawImage('Img_GA_our_unit', './image/char/ally_' + S_GAME.char_num + '/fox-effect-' + cange_cur_frame + '.png', S_GAME.char_x, S_GAME.char_y/*캐릭터 y좌표값*/ + 30, 300, 300, 'absolute');
		if (cange_cur_frame > 4) {
			$('#Img_GA_change_effect_dg').css({
				opacity: '0'
			});
			S_GAME.char_mode = 1;
			S_GAME.char_x = 30;
			S_GAME.char_y = S_GAME.char_base_y;
			S_GAME.change_cur_frame = 1;
			S_GAME.key_lock = 0;
			S_GAME.interval();
		}
		else {
			cange_cur_frame++;
			setTimeout(change_loop, 200);
		}
	}
	change_loop();
}