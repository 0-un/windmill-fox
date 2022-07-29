
var S_GAMEOVER =
{
    key_lock: 0, //키락 중복 클릭 방지 예를 들어 연속 점프 같은거...
    focus: 1,
    scale_num: 1,
    scale_count: 1,
    tmp: ""
};

//tag를 만들어 주는곳
S_GAMEOVER.maketag = function () {

    $("#S_GAMEOVER_div_div").empty(); // 안에 있는 자식 요소들 태그 및 내용을 다 지워주는 역할 지워주는 이유는 html에 설명

    var div = document.getElementById("S_GAMEOVER_div"); //여기 있는 아이디를 가진 태그를 밑에 있는 태그로 바꿔치기


    div.innerHTML =
        "<div id = 'gameoverpage'>" +
        "   <div id = 'highscore'>" +
        "       <img src = './image/gameover/highscore.svg' alt = 'highscore'>" +
        "   </div>" +
        "   <div id = 'leftGarland'>" +
        "       <img src='./image/gameover/left_garland.svg' alt='leftGarland'>" +
        "   </div>" +
        "   <div id = 'rightGarland'>" +
        "       <img src='./image/gameover/right_garland.svg' alt='rightGarland'>" +
        "   </div>" +
        "   <div class='yellowBox'>" +
        "       <div class='gameover'>" +
        "           <div id ='gameoverText'>" +
        "           <img src='./image/gameover/gameover.svg' alt = 'gameover'>" +
        "           </div>" +
        "       </div>" +
        "       <div class='myScore'>" +
        "           <div class = 'scoreBox'>" +
        "               <div id ='scoreBoxImg'>" +
        "                   <img src = './image/gameover/user_img.svg'>" +
        "               </div>" +
        "               <div id = 'scoreBoxText'>" +
        "                   <div class='Lastscore'>최종점수</div>" +
        "                   <div class='score'><span></span><span>점</span></div>" +
        "               </div>" +
        "           </div>" +
        "       </div>" +
        "       <div class='bt'>" +
        "           <img src = './image/gameover/ranking.svg' alt='ranking'>" +
        "           <img src ='./image/gameover/restart.svg' alt='restart'>" +
        "       </div>" +
        "   </div>" +
        "</div>" +
        "<img id='gameover_effect' src = './image/gameover/char_effect.gif'>" +
        '';

    $('#S_GAMEOVER_div').css({
        width: "1280px",
        height: "720px",
        "background": "url(../image/gameover/bg_blur.svg) center center",
        "background-size": "contain",
        position: "relative"
    })

    $('#S_GAMEOVER_div #highscore').css({
        position: "absolute",
        "top": "54px",
        "left": "380px",
        "z-index": "1"
    })
    $('#S_GAMEOVER_div #leftGarland').css({
        position: "absolute",
        "top": "0",
        "left": "0",
        "z-index": "1"
    })
    $('#S_GAMEOVER_div #rightGarland').css({
        position: "absolute",
        "top": "0",
        "right": "0",
        "z-index": "1"
    })
    $('#S_GAMEOVER_div .yellowBox').css({
        position: "absolute",
        width: "621px",
        height: "455px",
        "background-color": "#FAC73D",
        "border-radius": "57px",
        top: "172px",
        left: "330px"
    })
    $('#S_GAMEOVER_div .gameover').css({
        position: "absolute",
        top: "44px",
        left: "73px"
    })
    $('#S_GAMEOVER_div .myScore').css({
        position: "absolute",
        width: "440px",
        height: "138px",
        "background-color": "aliceblue",
        "border-radius": "15px",
        top: "152px",
        left: "87px"
    })
    $('#S_GAMEOVER_div .scoreBox').css({
        position: "absolute",
        top: "24px",
        left: "24px"
    })
    $('#S_GAMEOVER_div #scoreBoxText').css({
        width: "300px",
        height: "105px",
        position: "absolute",
        top: "-2px",
        left: "110px"
    })

    $('#S_GAMEOVER_div #scoreBoxText').css({
        "width": "300px",
        "height": "105px",
        "position": "absolute",
        "top": "-2px",
        "left": "110px",
    })
    $('#S_GAMEOVER_div .Lastscore').css({
        "font-family": "KyoboHandwriting2019",
        "font-size": "44px",
        "color": "red",
        "text-align": "center",
    })

    $('#S_GAMEOVER_div .score').css({
        "text-align": "center"
    });

    $('#S_GAMEOVER_div .score span').css({
        "font-family": "JustBubble",
        "font-size": "45px",
    });

    $('#S_GAMEOVER_div .score > span:nth-of-type(1)').html(S_GAME.score_num.toLocaleString('ko-KR'));

    $('#S_GAMEOVER_div .score > span:nth-of-type(2)').css({
        "padding-left": "10px",
        "font-family": "KyoboHandwriting2019",
        "font-size": "40px",
    })
    $('#S_GAMEOVER_div .bt').css({
        "position": "absolute",
        "top": "306px",
        // "left":"87px",
        "left": "141px"
    })

    $('#S_GAMEOVER_div .bt img ').css({
        "padding-right": "50px",
    })



    S_GAMEOVER.interval();
    S_GAMEOVER.key_lock = 1;
    setTimeout(function () {
        S_GAMEOVER.key_lock = 0;
        let nickname = prompt("랭킹에 등록할 닉네임을 입력하세요.");
        if (nickname != null && nickname != "")//랭킹 등록하기
        {
            PHP.put_score(nickname, S_GAME.score_num);
        }
    }, 500);


}


S_GAMEOVER.init = function () {
    console.log("~S_GAMEOVER.init()~");
    g_sceneinfo.cur_scene = "S_GAMEOVER";
    S_GAMEOVER.maketag();
}


S_GAMEOVER.interval = function () {

    if (g_sceneinfo.cur_scene != "S_GAMEOVER") return;


    if (S_GAMEOVER.timer_interval != null)// 뭔가 실행되고 있는데 있으면 멈추라는 의미
    {
        clearInterval(S_GAMEOVER.timer_interval);
        S_GAMEOVER.timer_interval = null; // 다시 초기화 해주는 작업
    }
    S_GAMEOVER.timer_interval = setTimeout(S_GAMEOVER.interval, 50); // 화면의 프레임을 의미한다고 본다.



    switch (S_GAMEOVER.focus) {
        case 1:
            utilScale_xy_center('S_GAMEOVER_div > #gameoverpage > .yellowBox > .bt > img:nth-of-type(1)', S_GAMEOVER.scale_num, S_GAMEOVER.scale_num);
            utilScale_xy_center('S_GAMEOVER_div > #gameoverpage > .yellowBox > .bt > img:nth-of-type(2)', 1, 1);
            break;
        case 2:
            utilScale_xy_center('S_GAMEOVER_div > #gameoverpage > .yellowBox > .bt > img:nth-of-type(1)', 1, 1);
            utilScale_xy_center('S_GAMEOVER_div > #gameoverpage > .yellowBox > .bt > img:nth-of-type(2)', S_GAMEOVER.scale_num, S_GAMEOVER.scale_num);
            break;
    }

    switch (S_GAMEOVER.scale_count) {
        case 1: S_GAMEOVER.scale_num = 1.1; break;
        case 2: S_GAMEOVER.scale_num = 1.2; break;
        case 3: S_GAMEOVER.scale_num = 1.3; break;
        case 4: S_GAMEOVER.scale_num = 1.4; break;
        case 5: S_GAMEOVER.scale_num = 1.5; break;
        case 6: S_GAMEOVER.scale_num = 1.4; break;
        case 7: S_GAMEOVER.scale_num = 1.3; break;
        case 8: S_GAMEOVER.scale_num = 1.2; break;
        case 9: S_GAMEOVER.scale_num = 1.1; break;
    }

    S_GAMEOVER.scale_count++;
    if (S_GAMEOVER.scale_count > 9) S_GAMEOVER.scale_count = 1;


}

S_GAMEOVER.keyDown = function (event) {
    // console.log("~S_GAMEOVER.keyDown~" + event.keyCode);
    // console.log("~S_GAMEOVER.keyDown~key_lock~" + S_GAMEOVER.key_lock);

    if (S_GAMEOVER.key_lock == 1) {
        console.log("~S_GAMEOVER.keyDown~key_lock~");
        return;
    }

    // 변신중일때는 키를 안먹도록 변경
    if (S_GAMEOVER.char_mode == 5) return;

    var keyCode = event.keyCode;

    // console.log("~~"+keyCode);



    switch (keyCode) //인터벌로 계속 하고 있ㅣ때문에 자동으로 입력된값으로 결과 전달.
    {
        case 37://화살표 왼쪽
            if (S_GAMEOVER.focus != 1) S_GAMEOVER.button_count = 1;
            S_GAMEOVER.focus = 1;
            break;
        case 39://화살표 오른쪽
            if (S_GAMEOVER.focus != 2) S_GAMEOVER.button_count = 1;
            S_GAMEOVER.focus = 2;
            break;
        case 13://엔터키 입력
            if (S_GAMEOVER.focus == 1) {
                $("#S_GAMEOVER_div").removeAttr('style');
                $("#S_GAMEOVER_div").empty();
                S_RANKING.init();
            }
            else if (S_GAMEOVER.focus == 2) {
                $("#S_GAMEOVER_div").removeAttr('style');
                $("#S_GAMEOVER_div").empty();
                S_GAME.init();
            }
            break;
    }

}
S_GAMEOVER.keyUp = function (event) //키보드에서 손을 뗴는 순간에 작동하는것 즉 기본값으로 돌아간다.
{
}
