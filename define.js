var SCREEN_WIDTH = 1280;
var SCREEN_HEIGHT = 720;


//아군 캐릭터에 대한 부분
var CHAR_OUR_TEAM =
	[
		{},//연산편의를 위해 0번 배열은 사용하지 않음.
		{
			name: "morae",                 //캐릭 이름,
			filename: "ally_01",            //캐릭터의 파일 이름.

			w: 300, h: 300,                      // 이미지의 크기 (width, height)
			move_frame_num: 19,        // 이동시 사용되는 frame의 수
			jump_frame_num: 22,         // 당할때 사용되는 frame의 수
			slide_frame_num: 4,           // 슬라이드에 사용되는 frame의 수
			change_frame_num: 66,           // 변신에 사용되는 frame의 수
		},
	];


