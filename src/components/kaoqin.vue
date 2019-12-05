<template>
  <div>
    <div class="title" style="background-color: #1AC9B9;">
      <flexbox>
        <flexbox-item :span="2">
          <div class="flex-img" style="margin:0px 20px 0px 20px;">
            <img
              slot="icon"
              width="45"
              height="45"
              style="display:block;border-radius:50px;margin:0px"
              src="../../static/images/tianjia.png"
              v-if="this.imgUrl == ''"
            />
            <img
              slot="icon"
              width="45"
              height="45"
              style="display:block;border-radius:50px;margin:0px"
              :src="this.imgUrl"
              v-if="this.imgUrl !== ''"
            />
          </div>
        </flexbox-item>
        <flexbox-item>
          <flexbox orient="vertical">
            <flexbox-item>
              <div class="flex-tag" style="margin-top:10px;color:#fff">
                {{personName}}
                <van-tag round type="success">已绑定</van-tag>
              </div>
            </flexbox-item>
            <flexbox-item style="margin:0px">
              <div class="flex-tag">
                <van-tag round>部门：{{department}}</van-tag>
                <van-tag round>专业：{{profession}}</van-tag>
              </div>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
      </flexbox>
    </div>
    <van-button
      square
      type="info"
      style="width:100%;background-color: #1AC9B9;border-color:#1AC9B9"
    >{{project}}</van-button>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        title="标题"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <flexbox>
      <flexbox-item :span="6">
        <x-button
          mini
          type="primary"
          style="border-radius:99px;margin:5px 5px 5px 5px;float:left "
          @click.native="allGoout"
        >导出</x-button>
      </flexbox-item>
      <flexbox-item>
        <p
          style="color:#000079;font-size:16px;margin:0;float:right;font-weight:bold"
        >上工人数 共计{{workPeople}}人</p>
      </flexbox-item>
    </flexbox>
    <br />
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
        >{{date1[0]+'至'+date1[1]}}</div>
      </van-col>
      <van-col span="1">
        <div
          style="  
          width: 7px;
    height: 7px;
    border-top: 1px solid #bababa;
    border-right: 1px solid #bababa;
    transform: rotate(45deg);
    margin-top:20px"
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
    <search
      @on-change="getResult"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      :auto-fixed="false"
      ref="search"
    ></search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="chooseBan" :options="chooseBan1" @change="xuanze" />
      <van-dropdown-item v-model="workDay" :options="workDay1" @change="paixu" />
    </van-dropdown-menu>
    <van-cell v-for="(item,index) in workList" :key="index">
      <div slot="title">
        <van-row>
          <van-col span="6">
            <router-link :to="{path:'/person',query:{id:item.personUid}}">
              <div align="center">{{item.name}}</div>
            </router-link>
          </van-col>
          <van-col span="6">
            <div align="center">{{item.group}}</div>
          </van-col>
          <van-col span="6">
            <div align="center">{{item.day}}</div>
          </van-col>
          <van-col span="6">
            <div align="center">{{workTime}}</div>
          </van-col>
        </van-row>
      </div>
    </van-cell>
    <loading :show="show1" text="加载中..."></loading>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  Divider,
  Grid,
  GroupTitle,
  Group,
  XTextarea,
  XInput,
  Cell,
  CellBox,
  CellFormPreview,
  Panel,
  Radio,
  PopupPicker,
  XButton,
  Badge,
  Search,
  XDialog,
  Calendar,
  Loading
} from "vux";
import request from "../util/request";
import { Tag } from "vant/lib/Tag/";
import more from "./more";
import util from "../util/util.js";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GroupTitle,
    Group,
    XTextarea,
    XInput,
    Cell,
    CellBox,
    CellFormPreview,
    Panel,
    Radio,
    PopupPicker,
    XButton,
    Badge,
    Search,
    more,
    XDialog,
    Calendar,
    Loading
  },

  data() {
    return {
      touxiang: "",
      activeName: "1",
      department: "",
      profession: "",
      imgUrl: "static/images/tianjia.png",
      personName: "",
      show1: false,
      workList: [
        {
          name: "",
          group: "",
          day: "",
          groupId: ""
        }
      ],
      workList1: [
        {
          name: "",
          group: "",
          day: "",
          groupId: ""
        }
      ],
      workPeople: "",
      workTime: "31",
      value: "",
      chooseBan: "10035",
      chooseBan1: [
        { text: "班组排序", value: "a" },
        { text: "识别率排序", value: "b" }
      ],
      workDay: "a",
      workDay1: [
        { text: "默认排序", value: "a" },
        { text: "上工天数排序", value: "b" }
      ],
      showPicker: false,
      columns: [],
      project: "",
      showToast: false,
      moreUid: "",
      projectId: "",
      mUsername: "",
      mUserprofession: "",
      mUserdepartment: "",
      picList: [
        {
          created_time: "",
          hPic: "",
          rizhiID: ""
        }
      ],
      project_id: "10000",
      date1: [this.$endFormat(30), this.$Nowtime()],
      isVisible1: false
    };
  },

  methods: {
    loadMe() {
      var pinyin = require("pinyin");
      this.show1 = true;
      var startDate = this.$Format();
      var endDate = this.$endFormat(30);
      var dayList = [];
      console.log(startDate);
      console.log(endDate);
      this.dayTime = [];
      this.dayTime.push(startDate);
      this.dayTime.push(endDate);

      request({
        url:
          util.api_url +
          "/api?method=weixin.get_my_info&openid=" +
          this.$getCookie("openid"),
        method: "post",
        data: {}
      }).then(res => {
        this.imgUrl = res.headimgurl;
      });

      request({
        url: util.api_url + "/api?method=xcx.banzhu&project_id=" + this.project,
        method: "post",
        data: {}
      }).then(res => {
        var arr = [];
        console.log(res);
        for (let i in res) {
          arr.push({ text: res[i].name, value: res[i].id });
        }
        arr.push({ text: "所有", value: "10035" });
        console.log(arr);
        this.chooseBan1 = arr;
      });

      request({
        url:
          util.api_url + "/api?method=xcx.project&project_id=" + this.project,
        //url: util.api_url3002 +"/sms/code_getTokenByOpenid",
        method: "get",
        async: false,
        data: {}
      }).then(res => {
        this.project = res.name;
      });

      request({
        url: util.api_url3002 + "/info/person",
        method: "post",
        data: {
          method: "query"
        }
      }).then(res => {
        for (var i = 0; i < res.data.project.length; i++) {
          if (this.projectId == res.data.project[i].project_id) {
            this.department = res.data.project[i].group_name_level[0];
            this.profession = res.data.project[i].group_name_level[1];
          }
        }
        this.projectId = res.data.project[0].project_id;
        this.personName = res.data.person.name;
        for (var i = 0; i < res.data.project.length; i++) {
          this.columns.push({
            text: res.data.project[i].project_name,
            defaultIndex: i,
            id: res.data.project[i].project_id
          });
        }
      });

      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_inday",
          project_id: this.$getCookie("project_id"),
          bt: this.$endFormat(30) + "00:00:00",
          et: this.$Nowtime() + " 23:59:59"
        }
      }).then(res => {
        for (let i in res.data) {
          dayList.push({
            number: i,
            day: res.data[i]
          });
        }
      });

      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_list",
          project_id: this.$getCookie("project_id")
        }
      }).then(res => {
        var personList = [];
        var workList = [];
        for (let i in res.data) {
          var ccu = res.data[i].name;
          var paixu = pinyin(ccu, {
            style: pinyin.STYLE_NORMAL
          });
          var paixu1 = pinyin(ccu, {
            style: pinyin.STYLE_FIRST_LETTER
          });
          for (let m in dayList) {
            if (dayList[m].number == res.data[i].person_id) {
              workList.push({
                name: res.data[i].name,
                group: res.data[i].group_name_level[1],
                day: dayList[m].day,
                groupId: res.data[i].group_id,
                personUid:res.data[i].person_id,
                uName:
                  paixu
                    .toString()
                    .replace(/,/g, "")
                    .toUpperCase() +
                  res.data[i].name +
                  res.data[i].group_name_level[1] +
                  paixu.toString().replace(/,/g, "") +
                  paixu1
                    .toString()
                    .replace(/,/g, "")
                    .toUpperCase() +
                  paixu1.toString().replace(/,/g, "")
              });
              break;
            }
          }
        }
        console.log(workList);
        this.workPeople = workList.length;
        this.workList = workList;
        this.workList1 = workList;
        this.show1 = false;
      });
    },

    setChooseValue1(param) {
      this.date1 = [...[param[0][3], param[1][3]]];
    },

    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
      console.log(this.date1[1]);
      var btDate = this.date1[0];
      var etDate = this.date1[1];
      var dayList = [];
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_inday",
          project_id: this.project_id,
          bt: btDate + " 00:00:00",
          et: etDate + " 23:59:59"
        }
      }).then(res => {
        for (let i in res.data) {
          dayList.push({
            number: i,
            day: res.data[i]
          });
        }
      });
      var btDate1 = new Date(btDate);
      var etDate1 = new Date(etDate);
      var chaDay = (etDate1 - btDate1) / 86400000 + 1;
      this.workTime = parseInt(chaDay);
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_list",
          project_id: this.project_id
        }
      }).then(res => {
        var personList = [];
        var workList = [];
        for (let i in res.data) {
          for (let m in dayList) {
            if (dayList[m].number == res.data[i].person_id) {
              workList.push({
                name: res.data[i].name,
                group: res.data[i].group_name_level[1],
                day: dayList[m].day,
                personUid:res.data[i].person_id,
              });
              break;
            }
          }
        }
        console.log(workList);
        this.workPeople = workList.length;
        this.workList = workList;
      });
    },

    openCalendar() {
      this.isVisible1 = true;
    },

    onChoose() {
      this.showPicker = true;
    },

    allGoout() {
      console.log(this.date1[0]);
    },

    onConfirm(value, index) {
      this.project_id = value.id;
      this.project = value.text;
      this.showPicker = false;
      console.log(this.project_id);
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_inout",
          project_id: this.project_id,
          in_status: "1"
        }
      }).then(res => {
        console.log(res.data[1].last_in_time);
        var list = [];
        for (let i in res.data) {
          list.push({
            intime: res.data[i].last_in_time,
            username: res.data[i].name,
            userprofession: res.data[i].group_name_level[0],
            userid: i,
            face: res.data[i].last_in_face_percent,
            userphone: res.data[i].mobile,
            userdepartment: res.data[i].group_name_level[1],
            personId: res.data[i].idcard_pic,
            personUid: res.data[i].person_id
          });
        }
        this.list = list;
        this.list2 = list;
        var list = list;
      });
    },
    onCancel() {
      this.showPicker = false;
    },

    getResult(val) {
      console.log("on-change", val);
      var arr = [];
      if (val == "") {
        this.workList = this.workList1;
      } else {
        for (var i = 0; i < this.workList.length; i++) {
          if (this.workList[i].uName.search(val) != -1) {
            arr.push(this.workList[i]);
          }
        }
        console.log(arr);
        this.workList = arr;
      }
    },

    xuanze() {
      var arr1 = this.workList1;
      var xuanZe = [];
      console.log(arr1);
      console.log(this.chooseBan);
      if (this.chooseBan !== "10035") {
        for (let i in arr1) {
          if (this.chooseBan == arr1[i].groupId) {
            xuanZe.push({
              name: arr1[i].name,
              group: arr1[i].group,
              day: arr1[i].day,
              groupId: arr1[i].groupId
            });
            this.workList = xuanZe;
            this.workDay = "a";
          } else {
            this.statusList = [];
          }
        }
      }
      if (this.chooseBan == "10035") {
        this.workList = this.workList1;
        this.workDay = "a";
      }
    },

    paixu() {
      if (this.workDay == "a") {
        this.workList.sort((a, b) => b.day - a.day);
      }
      if (this.workDay == "b") {
        this.workList.sort((a, b) => a.day - b.day);
      }
    },

    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },

    details(i) {
      this.showToast = true;
      this.moreUid = this.list[i].personId;
      this.mUsername = this.list[i].username;
      this.mUserprofession = this.list[i].userprofession;
      this.mUserdepartment = this.list[i].userdepartment;
      request({
        url: util.api_url3002 + "/info/gate",
        method: "post",
        data: {
          method: "query_logs",
          project_id: this.projectId,
          person_id: this.list[i].personUid
        }
      }).then(res => {
        var picList = [];
        for (let i in res.data) {
          picList.push({
            created_time: res.data[i].created_time,
            hPic: res.data[i].pic,
            rizhiID: res.data[i].id
          });
        }
        console.log(picList);
        this.picList = picList;
      });
    }
  },

  mounted() {
    this.checkopenid(request);
    this.projectId = parseInt(this.$getCookie("project_id"));
    this.project = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
    this.$setCookie("access_token", this.$getQueryString("token"))
  }
};
</script>

<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
@import "~vux/src/styles/1px.less";

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>