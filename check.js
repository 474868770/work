
function getQueryString(name)
{
	var url= window.location.href;
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var num = url.indexOf("?");
	url = url.substr(num + 1);
	var result = url.substr(0).match(reg);
	if(result != null) {
		return unescape(result[2]); 
	} else {
		return '';
	}
} 
var openid =getQueryString("openid")
var project_id =getQueryString("project_id")
var project_name =getQueryString("project_name")

var token =getQueryString("token");
 
var baseurl="https://buskey.cn/";
if(openid!=undefined&&openid!=""&&openid!=null){
	localStorage.openid = openid;
}
var tourl="",isbreak=false;
 
if(token!=undefined&&token!=""&&token!=null){
	if (token==="myout")
	{
		//tourl ="/login.html?openid="+openid+"&v="+Math.round(Math.random()*100);
		//isbreak = true;
	}else{

		localStorage.access_token = token;
	}
}
 
//主动退出的直接跳转登录页面
var loading = layer.load(1, {shade: [0.2,'#fff'] ,offset: ['40%', '45%'],zIndex:layer.zIndex});
 
//非自动退出的
if(localStorage.access_token==undefined||localStorage.access_token===""||localStorage.access_token===null){
	
	localStorage.preurl = window.location.href ;
	//https://buskey.cn/static/xcx/zcry.html?project_id=10000&openid=opJcO05_X-4C8EGRuu5Q-LH71U7g
	$.ajax({
			url:baseurl+'api?method=xcx.wx_token&openid='+localStorage.openid,
			type: "get",
			dataType: "json",
			data: {},
			success: function(data) {
				 if(data.status==="faild"){
					layer.msg(data.msg);
				 }else{
				 	localStorage.access_token = data.access_token;
				 }
			},
			error: function(response) {
				//weuiAlert(response.responseJSON);
			}
		});
	
}
 
if (tourl!=='')
{
	window.location.href = tourl;
}


function get_token() {
	$.ajax({
			url:baseurl+'api?method=xcx.wx_token&openid='+localStorage.openid,
			type: "get",
			dataType: "json",
			data: {},
			success: function(data) {
				 if(data.status==="faild"){
					layer.msg(data.msg);
					localStorage.access_token=""
				 }else{
				 	localStorage.access_token = data.access_token;
				 }
			},
			error: function(response) {
				//weuiAlert(response.responseJSON);
			}
		});
}
function check_status(xhr){
 
	if(xhr.status===401){
		localStorage.preurl = window.location.href ;
		//window.location.href = "http://wxapi.yidebim.com/wxlogin?appid=wx878a80edc5f0a8bc&mac=1&url="+encodeURIComponent(window.location.href);
	}else{
		layer.msg(JSON.parse(xhr.response).error);
		layer.close(loading);
		
	}
}
 