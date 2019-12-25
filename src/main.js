// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import axios from 'axios'
import { AlertPlugin, ToastPlugin } from 'vux'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import vuex from 'vuex'
import util from './util/util'
import Vant from 'vant';
import 'vant/lib/index.css';
import { DropdownMenu, DropdownItem } from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import check from './util/check'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import {
	ConfigPlugin
} from "vux";
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
NutUI.install(Vue);
Vue.use(ElementUI);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Vant);
Vue.use(router);
Vue.use(ConfigPlugin, {
	$layout: 'VIEW_BOX'
})

//sVue.prototype.$check = check; 

//添加标题
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })

// const router = [{
//   path: '/index/:openid',
//   component: HelloWorld
// }]


// const router = new VueRouter({
//   routes
// })
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
Vue.use(Mint);
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$setCookie = function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
Vue.prototype.$Nowtime = function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
//获取当前时间
Vue.prototype.$Format =
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds() + '';
		return currentdate;
	},

	//获取前n天时间
	Vue.prototype.$endFormat =
	function getBeforeDate(n) {
		var d = new Date();
		var year = d.getFullYear();
		var mon = d.getMonth() + 1;
		var day = d.getDate();
		if (day <= n) {
			if (mon > 1) {
				mon = mon - 1;
			} else {
				year = year - 1;
				mon = 12;
			}
		}
		d.setDate(d.getDate() - n);
		year = d.getFullYear();
		mon = d.getMonth() + 1;
		day = d.getDate();
		var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day) + " "
		return s;
	},

	//获取openid
	Vue.config.productionTip = false
Vue.prototype.$getQueryString = function (name) {
	return decodeURIComponent(
		(new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

Vue.config.productionTip = false
Vue.prototype.$getCookie = function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}
Vue.prototype.checkopenid = function (request) {

	if (this.$getQueryString("openid") != undefined && this.$getQueryString("openid") != null && this.$getQueryString("openid") != "" && this.$getQueryString("openid") != '#/') {

		this.$setCookie("openid", this.$getQueryString("openid"));
	}
	if (this.$getQueryString("project_id") != undefined && this.$getQueryString("project_id") != null && this.$getQueryString("project_id") != "" && this.$getQueryString("project_id") != '#/') {
		this.$setCookie("project_id", this.$getQueryString("project_id"));
	}
	if (this.$getQueryString("token") != undefined && this.$getQueryString("token") != null && this.$getQueryString("token") != "" && this.$getQueryString("token") != '#/') {
		this.$setCookie("access_token", this.$getQueryString("token"));
	}
	//alert(this.$getCookie('openid'))

	if (this.$getCookie('openid') == null || this.$getCookie('openid') == "" || this.$getCookie('openid') == undefined || this.$getCookie('openid') === 'undefined' || this.$getCookie('openid') === 'null') {
		let tmpurl = window.location.href;
		if (tmpurl.indexOf('?') > -1) {
			tmpurl = tmpurl.substring(0, tmpurl.indexOf('?'));
		}
		window.location.href = "https://buskey.cn/wxlogin?appid=wx878a80edc5f0a8bc&mac=1&url=" + encodeURIComponent(tmpurl);

	} else if (this.$getCookie('access_token') === 'myout') {
		router.push({ name: "login" })
	} else {

		refresh_token(this)

	}



}
Vue.prototype.doPost =
	function (url, param, fun1, fun2) {

		axios.post(url, param, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + this.$getCookie('access_token')
			}
		})
			.then(function (response) {
				//console.log('rsp',response)
				const res = response.data
				if (response.status === 200) {
					if ('status' in res && res.status !== 'success') {
						util.showmessage(res.msg, "警告");
						if ("status_code" in res && ["1010", "1014", "401"].indexOf(res.status_code.toString()) > -1) {
							router.push({
								name: "login"
							})
						}
					}
				}
				//console.log('rsp',response)
				fun1(res);
			})
			.catch(function (error) {
				if (error.toString().indexOf('timeout') > -1) {
					util.showmessage("超时提示", '超时');
				}
				if (error.response !== undefined) {
					const status = error.response.status

					if (status === 401) {
						util.showmessage("登陆超时或者无权限", "警告");
						router.push({ name: "login" })
					}

					if (status === 500) {
						util.showmessage("异常", "错误");
						//return {"data":[]};
					} else {
						util.showmessage(res.msg, "警告");
					}

				}

				fun2(error);
			});
	}
/*
doPost("zzzz?xxx",{a:1,b:2},
		rsp=>{},
		funciton(err){
			
		}
);
*/
function refresh_token(self) {

	axios.post(util.api_url3002 + "/sms/code", { "method": "refresh" }, {
		headers: {
			'Authorization': 'JWT ' + self.$getCookie('access_token')
		}
	})
		.then(function (response) {
			console.log('response', response, response.status_code);
			if (response.data.status == "success") {
				self.$setCookie("access_token", response.data.access_token);
				self.loadMe();
			} else {
				gettoken(self)
			}
		})
		.catch(function (error) {
			console.log("重新获取", error.toString())
			gettoken(self)

		});
}
function gettoken(self) {

	axios.post(util.api_url + "/api?method=xcx.wx_token&openid=" + self.$getCookie('openid'), { timeout: 1000 * 10 })
		.then(function (response) {
			if (response.data.status == "success") {
				self.$setCookie("access_token", response.data.access_token);
				self.loadMe();
			} else {
				router.push({
					name: "login"
				})
			}
		})
		.catch(function (error) {
			self.loadMe();

		});
}
Vue.prototype.addlog = function () {

	let postdata = { "url": window.location.href, 'title': 'task', 'openid': this.$getQueryString("openid") }
	this.doPost(util.api_url + "/api?method=xcx.addlog", postdata,
		res => {
		},
		err => { }
	);



}
//封装axios
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')
