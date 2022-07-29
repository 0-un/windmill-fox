var MAX_RANK = 10;
var S_RANKING =
{
	key_lock: 0, //키락 중복 클릭 방지 예를 들어 연속 점프 같은거...
	data: new Array(MAX_RANK + 1),
	server_rank_num: 0,
	tmp: ""

};

//tag를 만들어 주는곳
S_RANKING.maketag = function () {

	$("#S_RANKING_div").empty(); // 안에 있는 자식 요소들 태그 및 내용을 다 지워주는 역할 지워주는 이유는 html에 설명

	var div = document.getElementById("S_RANKING_div"); //여기 있는 아이디를 가진 태그를 밑에 있는 태그로 바꿔치기
	div.innerHTML =
		'<div id="bg">' +
		'	<img src="./image/ranking/shadow.png">' +
		'</div>' +

		'<div id="ranking_bg">' +
		'	<div id="title">' +
		'		<span id="title_name">RANKING</span>' +
		'	</div>' +
		'	<div id="ranking_list"></div>' +
		'</div>' +
		'<div id="back_bt"></div>' +
		'';

	$('#S_RANKING_div').css({
		width: "1280px",
		height: "720px",
		position: "relative"
	})

	$('#S_RANKING_div #bg').css({
		background: "url(./image/ranking/bg.jpg)",
		width: "1280px",
		height: "720px",
		"z-index": "-2",
		"position": "relative",
	})

	$('#S_RANKING_div #ranking_bg').css({
		background: "url(./image/ranking/ranking_bg.png)",
		width: "517px",
		height: "610px",
		"z-index": 2,
		position: "absolute",
		top: "55px",
		left: "66px",
	})

	$('#S_RANKING_div #title').css({
		position: "relative",
		top: "30px",
		left: "46px",
		width: "432px",
		height: "52px",
		display: "inline",
	})

	$('#S_RANKING_div #title_name').css({
		width: "258px",
		height: "52px",
		"font-family": "BankGothic",
		"font-size": "50px",
		"font-weight": "700",
	})


	$('#S_RANKING_div #ranking_list').css({
		"position": "relative",
		"top": "38px",
		"left": "29px",
		"width": "458px",
		"height": "473px",
		"border-radius": "15px",
		"overflow-y": "scroll",
	})



	$('#S_RANKING_div #back_bt').css({
		"position": "absolute",
		"top": "660px",
		"left": "83px",
		"width": "300px",
		"height": "50px",
		"font-size": "20px",
		"font-family": "BankGothic",
		color: "#A4A4A4"
	}).text("esc 키 입력시 이전으로 이동");

	// S_RANKING.data[i].rank = 0;
	// S_RANKING.data[i].nick_name = "";
	// S_RANKING.data[i].score = 0;

	let ranking_list_div = document.getElementById("ranking_list");
	let limit_10 = (S_RANKING.server_rank_num > MAX_RANK) ? MAX_RANK : S_RANKING.server_rank_num;
	for (let i = 1; i <= limit_10; i++) {
		// console.log(i);

		let tmp_div = document.createElement("div");
		tmp_div.id = "ranking_list_" + i;
		tmp_div.classList.add("list");
		ranking_list_div.appendChild(tmp_div);

		//랭킹
		let ranking_list_piece = document.getElementById(tmp_div.id);
		let tmp_div1 = document.createElement("div");
		tmp_div1.classList.add("rank_img");
		switch (i) {
			case 1: tmp_div1.classList.add("firstRank"); break;
			case 2: tmp_div1.classList.add("secondRank"); break;
			case 3: tmp_div1.classList.add("thirdRank"); break;
		}
		ranking_list_piece.appendChild(tmp_div1);

		//닉네임,점수가 들어가는 div
		let tmp_div2 = document.createElement("div");
		tmp_div2.id = "ranking_list_" + i + "_box";
		tmp_div2.classList.add("scoreBox");
		ranking_list_piece.appendChild(tmp_div2);


		let name_scroe_div = document.getElementById(tmp_div2.id);
		// 닉네임
		let tmp_div3 = document.createElement("div");
		tmp_div3.id = "ranking_list_" + i + "_box_name";
		tmp_div3.classList.add("idBox");
		switch (i) {
			case 1: tmp_div3.classList.add("firstID"); break;
			case 2: tmp_div3.classList.add("secondID"); break;
			case 3: tmp_div3.classList.add("thirdID"); break;
		}
		name_scroe_div.appendChild(tmp_div3);

		// 점수
		let tmp_div4 = document.createElement("div");
		tmp_div4.id = "ranking_list_" + i + "_box_score";
		tmp_div4.classList.add("score");
		name_scroe_div.appendChild(tmp_div4);

		$("#" + tmp_div3.id).text(S_RANKING.data[i].nick_name);
		$("#" + tmp_div4.id).text(S_RANKING.data[i].score.toLocaleString('ko-KR'));
	}
}


S_RANKING.init = function () {
	console.log("~S_RANKING.init()~");
	g_sceneinfo.cur_scene = "S_RANKING";

	// 랭킹가져오기
	PHP.get_ranking();
	//랭킹 가져오기 후 maketag 실행
	// S_RANKING.maketag();
}


S_RANKING.interval = function () {
}

S_RANKING.keyDown = function (event) {
	// console.log("~S_RANKING.keyDown~" + event.keyCode);
	// console.log("~S_RANKING.keyDown~key_lock~" + S_RANKING.key_lock);

	if (S_RANKING.key_lock == 1) {
		console.log("~S_RANKING.keyDown~key_lock~");
		return;
	}

	// 변신중일때는 키를 안먹도록 변경
	if (S_RANKING.char_mode == 5) return;

	var keyCode = event.keyCode;
	// console.log("~~"+keyCode);

	switch (keyCode) //인터벌로 계속 하고 있ㅣ때문에 자동으로 입력된값으로 결과 전달.
	{
		case 27: // esc 키 
		case 8: //backspace키 
			$("#S_RANKING_div").removeAttr('style');
			$("#S_RANKING_div").empty();
			S_MAIN.init();
			break;
	}

}
S_RANKING.keyUp = function (event) //키보드에서 손을 뗴는 순간에 작동하는것 즉 기본값으로 돌아간다.
{
}
