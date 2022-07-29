
// 닷홈 주소 및 토근에 대한 부분 ~~ 시작 ~~
var yhlee_url = "http://ds6546.dothome.co.kr";//용현
var hipark_url = "http://zktyvod.dothome.co.kr";//혜인
var sykim_url = "http://ksy990609.dothome.co.kr";//수연
var jwahn_url = "http://bnm3614.dothome.co.kr";//지웅
var ygpark_url = "http://pyy777053.dothome.co.kr";//영언

var DOTHOME_URL = "";

function set_URL()
{
    // 본인꺼 빼고 나머지 4개는 주석처리 
    DOTHOME_URL = yhlee_url;//용현
    // DOTHOME_URL = hipark_url;//혜인
    // DOTHOME_URL = sykim_url;//수연
    // DOTHOME_URL = jwahn_url;//지웅
    // DOTHOME_URL = ygpark_url;//영언
}
set_URL();
// 닷홈 주소 및 토근에 대한 부분 ~~ 끝 ~~





/*주로 많이 사용하는기능 들만 모음집*/ 
/*
 *특정위치에 Img_id에 이미지를 출력해준다.
 */
function utilDrawImage( Img_id,Img_file,left,top,width,height,pos)
{
	//var temp = document.getElementById(Img_id);
	
	// $('#'+Img_id).on('load', function() { console.log("image loaded correctly~~1~~"); });

	$('#'+Img_id).attr('src',Img_file).css({
									left: left + 'px',
									top: top +  'px',
									width: width + 'px',
									height: height + 'px',
									position: pos });
	


}

// left,top,pos 없는 utilDrawImage임.
function utilDrawImage_no_lefttop_nopos( Img_id,Img_file,width,height)
{
	//var temp = document.getElementById(Img_id);

	$('#'+Img_id).attr('src',Img_file).css({
									width: width + 'px',
									height: height + 'px'
									});


}

// width, height 없는 utilDrawImage임.
function utilDrawImage_no_wh( Img_id,Img_file,left,top,pos)
{
	//var temp = document.getElementById(Img_id);

	$('#'+Img_id).attr('src',Img_file).css({
									left: left + 'px',
									top: top +  'px',
									position: pos });


}
//width, heigth없고, pos가 무조건 absolute인 utilDrawImage
function utilDrawImage_no_wh_pos( Img_id,Img_file,left,top)
{
	//var temp = document.getElementById(Img_id);

	//setTimeout(function() {  // ==>테스트 해보고 싶지만 참는다. 이거 주석 풀면 아마도 속도 빨라질수도 있다.

			$('#'+Img_id).attr('src',Img_file).css({
											left: left + 'px',
											top: top +  'px',
											position: 'absolute' });
	//},0);

}
//width, heigth없고, pos가 무조건 absolute인 utilDrawImage -- 이미지만 바꾸기
function utilDrawImage_no_xywh_pos( Img_id,Img_file)
{
	//var temp = document.getElementById(Img_id);

	//setTimeout(function() {  // ==>테스트 해보고 싶지만 참는다. 이거 주석 풀면 아마도 속도 빨라질수도 있다.
			$('#'+Img_id).attr('src',Img_file);
	/*		.css({
											position: 'absolute' });*/
	//},0);

}
//메모리 절약을 위해 1pixel이미지로 대체 한다.
function utilDraw_image_1pixel(Img_id)
{
	var onepixel_filename = './image/ui/0_common/onepixel.png';
	utilDrawImage_no_wh_pos( 'Img_GA_raser_pung_effect'	,onepixel_filename,0,0);
}

/*
 * scale을 조정하는 전용 함수
 * 좌상단을 기준으로 가로 세로 같은 비율로 num만큼 넓혀준다.
 * num의 값은 주로 1.333
 */

 function utilScale(id,num)
 {

	var scaleX = num;
	var scaleY = num;
	var originV = '0% 0%';
	var command = 'scale('+scaleX+','+scaleY+')';

	//utilConsoleLog("===>"+command);

	$('#'+id).css({
			'transform': command,
			'-ms-transform': command, /* IE 9 */
			'-webkit-transform': command, /* Safari and Chrome */
			'-o-transform': command, /* Opera */
			'-moz-transform': command, /* Firefox */

			'transform-origin': originV ,
			'-ms-transform-origin': originV, /* IE 9 */
			'-webkit-transform-origin': originV, /* Safari and Chrome */
			'-o-transform-origin': originV, /* Opera */
			'-moz-transform-origin': originV /* Firefox */
	});
 }

function utilScale_xy(id,numX,numY)
{

	var scaleX = numX;
	var scaleY = numY;
	var originV = '0% 0%';
	var command = 'scale('+scaleX+','+scaleY+')';

	//utilConsoleLog("===>"+command);

	$('#'+id).css({
			'transform': command,
			'-ms-transform': command, /* IE 9 */
			'-webkit-transform': command, /* Safari and Chrome */
			'-o-transform': command, /* Opera */
			'-moz-transform': command, /* Firefox */

			'transform-origin': originV ,
			'-ms-transform-origin': originV, /* IE 9 */
			'-webkit-transform-origin': originV, /* Safari and Chrome */
			'-o-transform-origin': originV, /* Opera */
			'-moz-transform-origin': originV /* Firefox */
	});
}

function utilScale_xy_center(id,numX,numY)
{

	var scaleX = numX;
	var scaleY = numY;
	var originV = '50% 50%';
	var command = 'scale('+scaleX+','+scaleY+')';

	//utilConsoleLog("===>"+command);

	$('#'+id).css({
			'transform': command,
			'-ms-transform': command, /* IE 9 */
			'-webkit-transform': command, /* Safari and Chrome */
			'-o-transform': command, /* Opera */
			'-moz-transform': command, /* Firefox */

			'transform-origin': originV ,
			'-ms-transform-origin': originV, /* IE 9 */
			'-webkit-transform-origin': originV, /* Safari and Chrome */
			'-o-transform-origin': originV, /* Opera */
			'-moz-transform-origin': originV /* Firefox */
	});
 }

//아래를 기준으로 확대
function utilScale_xy_bottom(id,numX,numY)
{

	var scaleX = numX;
	var scaleY = numY;
	var originV = '50% 100%';
	var command = 'scale('+scaleX+','+scaleY+')';
	//utilConsoleLog("===>"+command);

	$('#'+id).css({
			'transform': command,
			'-ms-transform': command, /* IE 9 */
			'-webkit-transform': command, /* Safari and Chrome */
			'-o-transform': command, /* Opera */
			'-moz-transform': command, /* Firefox */

			'transform-origin': originV ,
			'-ms-transform-origin': originV, /* IE 9 */
			'-webkit-transform-origin': originV, /* Safari and Chrome */
			'-o-transform-origin': originV, /* Opera */
			'-moz-transform-origin': originV /* Firefox */
	});
 }

// degree 만금 회전한다. ( 30degree = 30도 시계방향)
function utilRotate5050(id,degree)
{
	$("#"+id).css({
					'transform-origin':	'50% 50%',
					'-webkit-transform-origin': '50% 50%',
					'-webkit-transform': 'rotate('+ degree + 'deg)',
					position:'absolute'
	});
}
