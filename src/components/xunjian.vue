<template>
  <div>
    <div class="title1">
      <div style="margin-left:10px">{{this.project}}</div>
      <van-row style="background-color: #fff;height:50px">
        <van-col
          span="7"
          style="text-align:center;font-size:14px;color:#515151;margin:5px;background-color:#fff;"
        >
          <div
            style="text-align:center;font-size:14px;color:#515151;background-color:#fff;height:40px;line-height:40px;"
          >请选择查看日期</div>
        </van-col>
        <van-col span="14" style="text-align:center;margin:5px">
          <div
            @click="openCalendar"
            style="text-align:center;font-size:14px;color:#bababa;background-color: #fff;float:right;height:40px;line-height:40px;"
          >{{date1[0]+'至 '+date1[1]}}</div>
        </van-col>
        <van-col span="1">
          <div
            style="  
          width: 7px;height: 7px;border-top: 1px solid #bababa;border-right: 1px solid #bababa;transform: rotate(45deg);margin-top:20px"
          ></div>
        </van-col>
      </van-row>
      <nut-calendar
        :is-visible="isVisible1"
        :default-value="date1"
        type="range"
        @close="switchPicker('isVisible1')"
        @choose="setChooseValue1"
        :startDate="null"
        :default="this.$Nowtime()"
      ></nut-calendar>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @clear="onCancel"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div style="padding-top:160px">
      <div class="kapian1" v-for="(item,index) in jilu" :key="index">
        <van-row style="padding:8px">
          <van-col span="10">
            <van-tag color="#1ABC9C" type="primary">{{item.created}}</van-tag>
          </van-col>
          <van-col span="14">施工部位：{{item.check_location}}</van-col>
        </van-row>
        <van-row style="padding:16px">
          <div>
            <van-row>
              <van-col span="8" class="biaoti">巡检人员:</van-col>
              <van-col span="12">{{item.check_person}}</van-col>
            </van-row>
          </div>
          <div>
            <van-row>
              <van-col span="8" class="biaoti">巡检记录:</van-col>
              <van-col span="12">
                <van-row>
                  <van-col span="4">
                    <div
                      :class="[item.count[1] !== item.count.all ? 'class1': 'class2']"
                    >{{item.count[1]}}</div>
                  </van-col>
                  <van-col span="6">/{{item.count.all}}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
          <div>
            <van-row>
              <van-col span="8" class="biaoti">备注:</van-col>
              <van-col span="16">{{item.remark}}</van-col>
            </van-row>
          </div>
          <img v-if="item.node_id == 'End3'" src="../../static/images/success.png" class="img" />
          <img v-if="item.node_id == 'Node2'" src="../../static/images/daichuli.png" class="img" />
          <img v-if="item.node_id == 'Node1'" src="../../static/images/dairenling.png" class="img" />
        </van-row>
        <van-row style="padding:8px">
          <van-col span="14">
            <div>{{item.title}}</div>
          </van-col>
          <van-col span="5" style="text-align:center">
            <van-button
              icon="eye-o"
              type="info"
              round
              size="small"
              @click="linkDownload(item.url)"
              class="button"
            >预览</van-button>
          </van-col>
          <van-col span="5" style="text-align:center">
            <van-button
              icon="share"
              type="info"
              round
              size="small"
              @click="Download(item.url)"
              v-clipboard:copy="'https://xcx.tddata.net' + item.url + '?t=download'"
              class="button"
            >下载</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <loading :show="show1" text="加载中..."></loading>
    <van-dialog v-model="show2" title="下载地址已经复制，请在游览器打开下载"></van-dialog>
  </div>
</template>

<script>
import {
  GroupTitle,
  Group,
  Cell,
  XInput,
  Selector,
  PopupPicker,
  Datetime,
  XNumber,
  ChinaAddressV4Data,
  XAddress,
  XTextarea,
  XSwitch,
  Actionsheet,
  XButton,
  XDialog,
  Loading,
  Search,
  TransferDomDirective as TransferDom
} from "vux";
import request from "../util/request";
import util from "../util/util.js";
import pdf from "vue-pdf";
import wx from "weixin-js-sdk";

export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    XAddress,
    Datetime,
    XNumber,
    XTextarea,
    XSwitch,
    Actionsheet,
    XButton,
    ChinaAddressV4Data,
    XDialog,
    Loading,
    pdf,
    Search
  },

  data() {
    return {
      jilu: "",
      show: false,
      projectId: "",
      openId: "",
      project: "",
      isVisible1: false,
      date1: [this.$endFormat(30), this.$Nowtime()],
      value: "",
      show1: false,
      show2: false
    };
  },

  methods: {
    loadMe() {
      this.show1 = true;
      //安全巡检记录数据
      request({
        url: util.api_url3004 + "/oa/workflow",
        method: "post",
        data: {
          method: "query_task_list_safe",
          project_id: this.projectId,
          bt: this.date1[0] + " 00:00:00",
          et: this.date1[1] + " 23:59:59"
        }
      }).then(res => {
        this.jilu = res.data;
        console.log(this.jilu);
        this.show1 = false;
      });

      request({
        url:
          util.api_url + "/api?method=xcx.project&project_id=" + this.projectId,
        //url: util.api_url3002 +"/sms/code_getTokenByOpenid",
        method: "get",
        async: false,
        data: {}
      }).then(res => {
        this.project = res.name;
      });
    },

    open() {
      this.show = true;
    },

    onCopy(url) {
      console.log(url);
    },

    linkDownload(url) {
      console.log("http://admin.yidebim.com" + url);
      window.location.href = "https://xcx.tddata.net" + url;
    },

    Download() {
      this.show2 = true
    },

    openCalendar() {
      this.isVisible1 = true;
    },

    setChooseValue1(param) {
      this.date1 = [...[param[0][3], param[1][3]]];
    },

    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
      console.log(this.date1[1]);
      this.show1 = true;
      var btDate = this.date1[0];
      var etDate = this.date1[1];
      var dayList = [];
      request({
        url: util.api_url3004 + "/oa/workflow",
        method: "post",
        data: {
          method: "query_task_list_safe",
          project_id: this.projectId,
          bt: btDate + " 00:00:00",
          et: etDate + " 23:59:59"
        }
      }).then(res => {
        console.log(res);
        this.show1 = false;
        this.jilu = res.data;
      });
    },

    onSearch(val) {
      this.show1 = true;
      console.log("on-change", val);
      request({
        url: util.api_url3004 + "/oa/workflow",
        method: "post",
        data: {
          method: "query_task_list_safe",
          project_id: this.projectId,
          keywords: val,
          bt: this.date1[0] + " 00:00:00",
          et: this.date1[1] + " 23:59:59"
        }
      }).then(res => {
        this.show1 = false;
        this.jilu = res.data;
        console.log(this.jilu);
      });
    },

    onCancel() {
      this.show1 = true;
      request({
        url: util.api_url3004 + "/oa/workflow",
        method: "post",
        data: {
          method: "query_task_list_safe",
          project_id: this.projectId,
          bt: this.date1[0] + " 00:00:00",
          et: this.date1[1] + " 23:59:59"
        }
      }).then(res => {
        this.show1 = false;
        this.jilu = res.data;
        console.log(this.jilu);
      });
    }
  },

  created() {
    this.checkopenid(request);
    this.projectId = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
    this.$setCookie("access_token", this.$getQueryString("token"));
    this.openId = openId;
  },

  beforeDestroy() {}
};
</script>

<style>
.title1 {
  background: #fff;
  color: #000;
  padding: 20px 0px 0px 0px;
  height: 50px;
  font-size: 20px;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0px;
}
.kapian1 {
  margin: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #e3e3e3;
}
.class1 {
  color: red;
}
.class2 {
  color: #000;
}
.biaoti {
  color: #919191;
}
.img {
  max-height: 70px;
  margin: -120px -120px -210px 650px;
  position: absolute;
}

@media screen and (max-width: 600px) {
  .img {
    max-height: 70px;
    margin: -120px -120px -210px 280px;
    position: absolute;
  }
}

@media screen and (max-width: 400px) {
  .img {
    max-height: 70px;
    margin: -100px -100px -10px 250px;
    position: absolute;
  }
  .button {
    font-size: 10px;
  }
}
</style>