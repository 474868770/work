/*
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  }
  
  //设置cookie,增加到vue实例方便全局调用
  export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  };
  
  //删除cookie
  export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };
	*/

Date.prototype.format = function (format) {
        var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];

            if (new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    };
		
		
import {Alert,AlertModule} from "vux";
let util = {
	 
};
util.api_url=''; //https://buskey.cn 
util.api_url3004='/api'; //http://w.yidebim.com:3004
util.api_url3002='/api2';//http://w.yidebim.com:3002
util.api_urlip='http://127.0.0.1:8092';
export function showmessage(msg,title='提示'){
		AlertModule.show({
				title: title,
				content: msg,
				onShow () {
					console.log('Module: I\'m showing')
				},
				onHide () {
					console.log('Module: I\'m hiding now')
				}
			})
	};
	
util.showmessage = showmessage;
		
util.wx_token= function(request,self){
	request({
			url: util.api_url+"/api?method=xcx.wx_token&openid="+self.openid,
			//url: util.api_url3002 +"/sms/code_getTokenByOpenid",
			method: "get",
			async: false,  
			data: {}
		}).then(res => {
			if(res.status=="success"){
				self.$setCookie("access_token",res.access_token);
			  
				//shoumessage(self.$getCookie("access_token"))
			}
		});
}
util.project= function(request,self,project_id){
	request({
			url: util.api_url+"/api?method=xcx.project&project_id="+project_id,
			//url: util.api_url3002 +"/sms/code_getTokenByOpenid",
			method: "get",
			async: false,  
			data: {}
		}).then(res => {
			self.project_name = res.name;
		});
}
util.myproject= function(request,self){
	request({
			//url: util.api_url+"/api?method=xcx.query_project",
			url: util.api_url3002+"/info/person",
			method: "post",
			async: false,  
			data: {"method": "query"}
			
		}).then(res => {
			if(res.status=="success"){
				 if(self.current_user!=undefined){
					self.current_user.key = res.data.person.id; 
					self.current_user.value = res.data.person.name;
					console.log('当前用户',self.current_user.value,self.current_user.key);
					//if(self.project_manlst!=undefined){
						//self.project_manlst.push({key:res.data.person.id,value:res.data.person.name})
					//}
				 }
				 
				 for( let item of res.data.project){ 
					if(self.projectlist!=undefined){
						let department='',profession='';
						if(item.group_name_level){
							if(item.group_name_level.length>0) department=item.group_name_level[0];
							if(item.group_name_level.length>1) profession=item.group_name_level[0];
						}
						self.projectlist.push({defaultIndex:item.project_id,text:item.project_name,department:department,profession:profession})
					};
					if(self.project_list!=undefined)self.project_list.push({key:item.project_id,value:item.project_name});
					 
					if(self.project_id.toString()===item.project_id.toString()){
						if(self.project_name!=undefined)self.project_name = item.project_name ;
						if(self.department!=undefined){
							self.department = item.group_name_level[0];
						}
						if(self.profession!=undefined){
							self.profession = item.group_name_level[1];
						}
						 
					}
				 }
				self.loaddata();
			}else{
				if(self.loadingshow) self.loadingshow = false;
			}
		});
}
util.arrayToStr= function(arrdata,name){
	let tmparr=[];
	for( let tmpitem of arrdata){
		tmparr.push(tmpitem[name]);
		
	}
	return tmparr.join(',')
}
util.arrayToStr2= function(arrdata,key,name,vallst=[]){
	let tmparr=[];
	for( let tmpitem of arrdata){
		if(vallst.indexOf(tmpitem[key])>-1){
			tmparr.push(tmpitem[name]);
		}
		
	}
	return tmparr.join(',')
}
util.mergeArray=function (tmparr1, tmparr2){ 
 var arr1 = JSON.parse(JSON.stringify(tmparr1));
 var arr2 = JSON.parse(JSON.stringify(tmparr2));
 for (var i = 0 ; i < arr2.length ; i ++ ){
   for(var j = 0 ; j < arr1.length ; j ++ ){
    if (arr2[i] === arr1[j]){
     arr2.splice(i,1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
    }
   }
 }

 for(var i = 0; i <arr2.length; i++){
  arr1.push(arr2[i]);
 }
 return arr1;
}

util.wxconfig= function(wx,request,localurl){
	request({
	  url: util.api_url+"/api?method=weixin.get_ticket&appid=wx878a80edc5f0a8bc&url=" +encodeURIComponent(localurl),
	  method: "get",
	  data: {}
	}).then(res => {
	  wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: "wx878a80edc5f0a8bc", // 必填，公众号的唯一标识小程序wx1912d717d23b5976    易得信息wx878a80edc5f0a8bc
	    timestamp: res.timestamp, // 必填，生成签名的时间戳
	    nonceStr: res.nonceStr, // 必填，生成签名的随机串
	    signature: res.signature, // 必填，签名，见附录1
	    jsApiList: [
	      "uploadVoice",
	      "startRecord",
	      "stopRecord",
	      "playVoice",
	      "chooseImage",
	      "uploadImage",
	      "previewImage",
	      "onMenuShareTimeline",
	      "onMenuShareAppMessage",
	      "onMenuShareQQ",
	      "onMenuShareWeibo",
	      "onMenuShareQZone",
		  "miniProgram"
	    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	  });
	  wx.ready(function(){
	      //showmessage("成功");
	  });
	  wx.error(function(res){
	  	 //showmessage(JSON.stringify(res) );
	  });
	  
	  
	});
	
}

 
//找到并删除源
util.jaSelDelOne = function(ja,k,v){

    let jaTmp = [];
    for(let i=0;i<ja.length;i++){
        if(ja[i].hasOwnProperty(k) && v.toString() === ja[i][k].toString()){
            jaTmp.push(ja[i]);
            ja.splice(i,1);
        }
    }
    return jaTmp;
}

util.jaSelDel = function(ja,k,v){
    //alert(JSON.stringify(v));
    if(v instanceof Array){
        let jatp = [];
        for(let i=0;i<v.length;i++){
            let tp = this.jaSelDelOne(ja,k,v[i]);
            jatp = jatp.concat(tp);
        }
        return jatp;
    }
    else{
        return this.jaSelDelOne(ja,k,v);
    }
}

export default util; 
 

 
 