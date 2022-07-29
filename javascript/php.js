var PHP =
{
};

PHP.put_score = function(add_nick_name,add_score)
{
   var server_url = DOTHOME_URL+"/Team_project_game/php/put_score.php";

   //server_url에 해당하는 주소로 접속을 하고
   $.post(server_url,
   {
       //여기 전달할 값을 넣는다
       'user_nick_name' : add_nick_name,
       'user_score' : add_score,
   },
   function(data) // first success
   {
      //정상적으로 실행이 완료가 되었을 때 data에 그 값이 들어오고 콘솔에 이렇게 적힌다.
      console.log("~success~ PHP.put_score ~ data : "+data);
   })
   .fail(function(e){
       //실패할 경우는 e로 값을 받아서 콘솔에 이렇게 적힌다.
      console.log("Error in PHP.put_score().fail:"+e); 
      // console.log(e); 
   });
}


PHP.get_ranking = function()
{
   var server_url = DOTHOME_URL+"/Team_project_game/php/get_ranking.php";

   //server_url에 해당하는 주소로 접속을 하고
   $.post(server_url,
   {
       //여기 전달할 값을 넣는다
   },
   function(data) // first success
   {
       //정상적으로 실행이 완료가 되었을 때 data에 그 값이 들어오고 콘솔에 이렇게 적힌다.
      console.log("~success~ PHP.get_ranking ~ data : "+data);
      parse_rank10(data);
   })
   .fail(function(e){
       //실패할 경우는 e로 값을 받아서 콘솔에 이렇게 적힌다.
      console.log("Error in PHP.get_ranking().fail:"+e); 
      // console.log(e); 
   });
}

// get_ranking()을 통해서 서버로 부터 전달받은 10명의 rankig정보를
// RANKING 전역 배열에 위치 시킨다.
// data견본
//  1,test_nick_name,110:2,test_nick_name2,80:3,8098,80:4,test_nick_nam3,60:5,test_nick_na,10:6,123,10:7,ㅁㄴㅇ,0:
function parse_rank10(data)
{
	console.log("Data Parsing:"+data);

	//GLOBAL_RANK초기화 시키기
	for(var i=1;i<=MAX_RANK;i++)
	{
		S_RANKING.data[i]				= {};
		S_RANKING.data[i].rank		= 0;
		S_RANKING.data[i].nick_name	= "";
		S_RANKING.data[i].score		= 0;
	}

	//data 파싱하기
	//우선 : 파싱하기
	var all_array = data.split(':');
	S_RANKING.server_rank_num = all_array.length-1; //서버로 부터 받은 레코드 수

	var limit_10 = (S_RANKING.server_rank_num > MAX_RANK)? MAX_RANK:S_RANKING.server_rank_num;
	for(var i=0; i<limit_10;i++)
	{
		var each_array = all_array[i].split(',');
		S_RANKING.data[i+1].rank       = parseInt(each_array[0],10);
		S_RANKING.data[i+1].nick_name	= each_array[1];
		S_RANKING.data[i+1].score		= parseInt(each_array[2],10);
	}

   S_RANKING.maketag();
}