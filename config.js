(function () {

	/**
	 * 앱이름
	 * @type {String}
	 */
	var APP_NAME = "WINDMILL_FOX";


	/**
	 * 버전관리를 위하여 추가
	 * @type {String}
	 */
	//정식으로 버전하지 않는이상 변경 불가
	var configVersion = '윈드밀 폭스_20210317';

	/**
	 * PHP에서 load할 JS 파일을 읽어서 이 파일을 로드 하도록 한다.
	 * 만약에 loadPhp 값이 0이면, appFiles1 정의된 js 파일를 로드한다.
	 * 모든 것을 get_js_file.php에서 정의한 파일을 로드 한다.
	 * 0 : PHP 이용하지 않음
	 * 1 : PHP에서 이용함.
	 * @type {Number}
	 */
	var loadPhp = 1;


	// TEST 일때 아래 파일들을 사용하여 앱 실행을 한다.
	var appFiles = [

		"./define.js",
		"javascript/Main.js",
		"javascript/util_Levelmap.js",
		"javascript/php.js",
		"javascript/S_main.js",
		"javascript/S_game.js",
		"javascript/S_gameover.js",
		"javascript/S_ranking.js",
		"javascript/util_Function.js",
	];

	var d = document;

	/**
	 * cssApi를 load한다.
	 */
	window.onload = function()
	{
		loadJS(appFiles, callbackStartApp.bind(this));
	};


	/**
	 * 앱 파일이 로딩 완료되면 Main.onLoad() 호출하기 위한 함수
	 * @param  {Number} res - js load 결과 값  1 : 정상, 0 : 에러
	 * @param {String} src - load한 파일
	 * @param {Number} p - 읽을 파일 퍼센트. 1이면 전부 파일 읽었음.
	 */
	var callbackStartApp = function(res, src, p)
	{
		//res -> 1 : 정상 동작
		//res -> 0 : onerror 이다.

		// console.log("  callbackStartApp " + p);
		// console.log("  callbackStartApp src:" + src);
		if (p == 1) //전체 파일을 다 읽었다면(p의 값은 1이다.) 아마도 progress의 약자인듯
		{
			console.log("  Main.onLoad(); 실행");

			Main.onLoad();
		}
	}


	/**
	 * js 파일을 로딩하는 함수
	 * @param  {Array} appFiles   load할 js 파일이고 배열로 정의 한다.
	 * @param  {Function} callbackFn js 파일 load/error 될 때 마다 호출되는 함수.
	 */
	var loadJS = function(appFiles, callbackFn) {
		var sEngine = [];
		var que = sEngine.concat(appFiles);
		var loaded = 0;
		var p;
		que.forEach(function(f, i)
		{
			var s = d.createElement('script');
			s.async = false;
			s.type = 'text/javascript';
			s.language = 'javascript';
			s.charset  = "utf-8";
			s.src = f;
			s.onload = function()
			{
				loaded++;
				p = loaded / que.length;
				callbackFn&&callbackFn.call(this, 1, this.src, p);
			};
			s.onerror = function()
			{
				callbackFn&&callbackFn.call(this, 0, this.src);
			}
			d.body.appendChild(s);
			que[i] = s;
		});
	}
})();
