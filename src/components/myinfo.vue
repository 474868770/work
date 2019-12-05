
<template>
	<div class="title" style="background-color: #1AC9B9;">
	  <flexbox>
	    <flexbox-item :span="2">
	      <div class="flex-img" style="margin:0px 20px 0px 20px;">
	        <img
	          slot="icon"
	          width="45"
	          height="45"
	          style="display:block;border-radius:50px;margin:0px"
	          :src="headimg"
	        >
	      </div>
	    </flexbox-item>
	    <flexbox-item>
	      <flexbox orient="vertical">
	        <flexbox-item>
	          <div class="flex-tag" style="margin-top:10px;color:#fff;margin-left:10px;">
	            {{current_user.value }}
	            <van-tag round type="success">已绑定</van-tag>
	          </div>
	        </flexbox-item>
	        <flexbox-item style="margin:0px">
	          <div class="flex-tag">
	            <flexbox>
	              <flexbox-item>
	                <van-tag round>部门：{{department}}</van-tag>
	              </flexbox-item>
	              <flexbox-item>
	                <van-tag round>专业：{{profession}}</van-tag>
	              </flexbox-item>
	            </flexbox>
	          </div>
	        </flexbox-item>
	      </flexbox>
	    </flexbox-item>
	  </flexbox>
	  <van-button
	    square
	    type="info"
	    @click="onChoose"
	    icon="arrow-down"
	    style="width:100%;background-color: #1AC9B9;border-color:#1AC9B9"
	  >{{project_name}}</van-button>
	  <van-popup v-model="showPicker" position="bottom">
	    <van-picker
	      show-toolbar
	      title="标题"
	      :columns="projectlist"
	      @cancel="onCancel"
	      @confirm="onConfirm"
	    />
	  </van-popup>
	</div>
	 
	
	
</template>
<script>
import {Loading,TransferDom,FlexboxItem,Flexbox, } from "vux";
import request from "../util/request";
import util from "../util/util.js";

export default {
	directives: {
		TransferDom
	},
	components: {
		Loading,FlexboxItem,Flexbox,
	},
 
	data() {
		return {
			headimg:'static/images/tianjia.png',
			current_user:{},
			project_id:'',
			project_name:'',
			department: "",
			profession: "",
			showPicker:false,
			projectlist:[], //{"text":"项目名称","defaultIndex":0}
			 
		}
	},
	props: [
	    
	],
	mounted(){
	 
		this.checkopenid(request);
		this.project_id = parseInt(this.$getCookie('project_id'));
		util.myproject(request,this);
		this.getmyinfo();
	  
	},
	methods: {
		onChoose() {
		  this.showPicker = true;
		 
		},
		onCancel() {
		  this.showPicker = false;
		},
		onConfirm(value, index) {
		  this.project = value.text;
		  this.showPicker = false;
		   console.log(value.defaultIndex,value.text, index);
		  this.project_name=value.text;
		  this.project_id = value.defaultIndex;
		  this.department = value.department;
		  this.profession = value.profession;
		  this.$setCookie("project_id",value.defaultIndex);  
		  this.$emit('chgConf',value);

		  
		},
		get_current_user(){
			return this.current_user;
		},
		loaddata(){
			
		},
		getmyinfo(){
			let self = this;
			request({
					url: util.api_url+"/api?method=weixin.get_my_info&openid="+this.$getCookie('openid'),
					method: "get",
					async: false,  
					data: {}
				}).then(res => {
					 if(res.headimgurl){
						 self.headimg = res.headimgurl;
					 }
				});
		}
	}
};
		
		 
				 
		</script>