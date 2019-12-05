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
    <div
      style="color:#000079;font-size:16px;margin:0;float:right;font-weight:bold"
    >全部人员共计{{allPeople}}人 在职人数共计{{workPeople}}人</div>
    <br />
    <br />
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
    <div slot="title">
      <van-row>
        <van-col span="8">
          <div align="center">姓名(资料)</div>
        </van-col>
        <van-col span="6">
          <div align="center">班组</div>
        </van-col>
        <van-col span="6">
          <div align="center">状态</div>
        </van-col>
        <van-col span="4">
          <div align="center">操作</div>
        </van-col>
      </van-row>
    </div>
    <van-cell v-for="(item,index) in statusList" :key="index">
      <div slot="title">
        <van-row>
          <van-col span="8">
            <router-link :to="{path:'/person',query:{id:item.personUid}}" tag="div">
              <div align="center">
                {{item.name}}(
                <div
                  v-for="(item1,index) in item.datum_uploaded"
                  :key="index"
                  style="display:inline-block;margin-left:1px"
                >
                  <div v-if="item1 == '0'" style="color:	#F5F5F5">|</div>
                  <div v-if="item1 == '1'" style="color:#1ac9b9">|</div>
                </div>)
              </div>
            </router-link>
          </van-col>
          <van-col span="6">
            <div align="center">{{item.group}}</div>
          </van-col>
          <van-col span="6">
            <div align="center">{{haxi[item.instatusId]}}</div>
          </van-col>
          <van-col span="4">
            <div align="center">
              <van-button type="info" size="mini" @click="details(index)">操作</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-cell>
    <el-dialog title="个人详情" :visible.sync="showToast" width="90%" top="1px">
      <myself
        v-bind:mUsername="mUsername"
        v-bind:mUserdepartment="mUserdepartment"
        v-bind:mUserprofession="mUserprofession"
        v-bind:mUserphone="mUserphone"
        v-bind:mUserid="mUserid"
        v-bind:mIdcard_pic="mIdcard_pic"
        v-bind:workTime="workTime"
        v-bind:mProject_id="mProject_id"
        v-bind:mRfid="mRfid"
      ></myself>
    </el-dialog>
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
import myself from "./myself";
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
    myself,
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
      personName: "",
      show1: false,
      statusList: [
        {
          name: "",
          group: "",
          instatus: "",
          group0: "",
          userId: "",
          userPhone: "",
          personUid: "",
          idcard_pic: "",
          groupId: "",
          instatusId: "",
          rfid_wg: ""
        }
      ],
      statusList1: [
        {
          name: "",
          group: "",
          instatus: "",
          group0: "",
          userId: "",
          userPhone: "",
          personUid: "",
          idcard_pic: "",
          groupId: "",
          instatusId: "",
          rfid_wg: ""
        }
      ],
      allPeople: "",
      workPeople: "",
      workTime: "31",
      value: "",
      chooseBan: "10035",
      chooseBan1: [
        { text: "班组排序", value: "a" },
        { text: "识别率排序", value: "b" }
      ],
      workDay: "10",
      workDay1: [
        { text: "默认排序", value: "10" },
        { text: "注销", value: "-1" },
        { text: "在职", value: "0" },
        { text: "待激活", value: "1" },
        { text: "离职", value: "2" },
        { text: "手动注销", value: "3" },
        { text: "临时卡", value: "4" }
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
      mIdcard_pic: "",
      mUserphone: "",
      mUserid: "",
      mRfid: "",
      haxi: {
        "0": "在职",
        "1": "待激活",
        "2": "离职",
        "3": "手动注销",
        "4": "临时卡",
        "-1": "注销"
      },
      mProject_id: "",
      workTime: [
        {
          created_time: ""
        }
      ],
      imgUrl: "static/images/tianjia.png",
      ziliao: ["0", "1", "1", "1", "0", "1", "1", "1"]
    };
  },

  methods: {
    loadMe() {
      var pinyin = require("pinyin");
      this.show1 = true;
      var startDate = this.$Format();
      var endDate = this.$endFormat(30);
      var dayList = [];

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
        url:
          util.api_url +
          "/api?method=xcx.banzhu&project_id=" +
          this.$getCookie("project_id"),
        method: "post",
        data: {}
      }).then(res => {
        var arr = [];
        for (let i in res) {
          arr.push({ text: res[i].name, value: res[i].id });
        }
        arr.push({ text: "所有", value: "10035" });
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
          method: "query_person_list",
          project_id: this.projectId
        }
      }).then(res => {
        var statusList = [];
        for (let i in res.data) {
          var ccu = res.data[i].name;
          var paixu = pinyin(ccu, {
            style: pinyin.STYLE_NORMAL
          });
          var paixu1 = pinyin(ccu, {
            style: pinyin.STYLE_FIRST_LETTER
          });
          statusList.push({
            name: res.data[i].name,
            group: res.data[i].group_name_level[1],
            group0: res.data[i].group_name_level[0],
            userId: res.data[i].idcard_no,
            userPhone: res.data[i].mobile,
            personUid: res.data[i].person_id,
            idcard_pic: res.data[i].idcard_pic,
            groupId: res.data[i].group_id_level[1],
            instatusId: res.data[i].status,
            rfid_wg: res.data[i].rfid_wg,
            datum_uploaded: res.data[i].datum_uploaded.split(''),
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
        }
        console.log(statusList)
        this.statusList = statusList;
        this.show1 = false;
        this.statusList1 = statusList;
        this.allPeople = statusList.length;
        var arr = [];
        for (let i in res.data) {
          if (res.data[i].status == "0") {
            arr.push({ instatus: res.data[i].status, name: res.data[i].name });
          }
        }
        this.workPeople = arr.length;
      });
    },

    onChoose() {
      this.showPicker = true;
    },

    allGoout() {
      console.log(this.date1[0]);
    },

    onConfirm(value, index) {
      this.project = value.text;
      this.showPicker = false;
      console.log(this.project_id);
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_list",
          project_id: this.projectId
        }
      }).then(res => {
        var statusList = [];
        for (let i in res.data) {
          statusList.push({
            name: res.data[i].name,
            group: res.data[i].group_name_level[1],
            group0: res.data[i].group_name_level[0],
            userId: res.data[i].idcard_no,
            userPhone: res.data[i].mobile,
            personUid: res.data[i].person_id,
            idcard_pic: res.data[i].idcard_pic,
            groupId: res.data[i].group_id_level[1],
            instatusId: res.data[i].status,
            rfid_wg: res.data[i].rfid_wg,
            datum_uploaded: res.data[i].datum_uploaded.split('')
          });
        }
        this.statusList = statusList;
        this.statusList1 = statusList;
        this.allPeople = statusList.length;
        var arr = [];
        for (let i in res.data) {
          if (res.data[i].status == "0") {
            arr.push({
              instatus: res.data[i].status,
              name: res.data[i].name
            });
          }
        }
        console.log(arr);
        this.workPeople = arr.length;
      });
    },
    onCancel() {
      this.showPicker = false;
    },

    getResult(val) {
      console.log("on-change", val);
      var arr = [];
      if (val == "") {
        this.statusList = this.statusList1;
      } else {
        for (var i = 0; i < this.statusList.length; i++) {
          if (this.statusList[i].uName.search(val) != -1) {
            arr.push(this.statusList[i]);
          }
        }
        console.log(arr);
        this.statusList = arr;
      }
    },

    paixu() {
      var zhuXiao = [];
      var arr1 = this.statusList1;
      console.log(this.workDay);
      if (this.workDay !== "10") {
        for (let i in arr1) {
          if (this.workDay == arr1[i].instatusId) {
            console.log(arr1[i].instatusId);
            zhuXiao.push({
              name: arr1[i].name,
              group: arr1[i].group,
              instatus: arr1[i].instatus,
              group0: arr1[i].group0,
              userId: arr1[i].userId,
              userPhone: arr1[i].userPhone,
              personUid: arr1[i].personUid,
              idcard_pic: arr1[i].idcard_pic,
              groupId: arr1[i].groupId,
              instatusId: arr1[i].instatusId,
              datum_uploaded:arr1[i].datum_uploaded
            });
            this.statusList = zhuXiao;
            this.chooseBan = "10035";
          }
        }
      }
      if (this.workDay == "10") {
        this.statusList = this.statusList1;
        this.chooseBan = "10035";
      }
    },

    xuanze() {
      var arr1 = this.statusList1;
      var xuanZe = [];
      console.log(this.chooseBan);
      if (this.chooseBan !== "10035") {
        for (let i in arr1) {
          if (this.chooseBan == arr1[i].groupId) {
            xuanZe.push({
              name: arr1[i].name,
              group: arr1[i].group,
              instatus: arr1[i].instatus,
              group0: arr1[i].group0,
              userId: arr1[i].userId,
              userPhone: arr1[i].userPhone,
              personUid: arr1[i].personUid,
              idcard_pic: arr1[i].idcard_pic,
              groupId: arr1[i].groupId,
              instatusId: arr1[i].instatusId,
              rfid_wg: arr1[i].rfid_wg,
              datum_uploaded:arr1[i].datum_uploaded
            });
            this.statusList = xuanZe;
            this.workDay = "10";
          }
          // else {
          //   this.statusList = [];
          // }
        }
      }
      if (this.chooseBan == "10035") {
        this.statusList = this.statusList1;
        this.workDay = "10";
      }
    },

    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },

    details(i) {
      console.log(this.project_id);
      this.showToast = true;
      this.mUserprofession = this.statusList[i].group;
      this.mUserdepartment = this.statusList[i].group0;
      this.mUsername = this.statusList[i].name;
      this.mUserid = this.statusList[i].userId;
      this.mUserphone = this.statusList[i].userPhone;
      this.mIdcard_pic = this.statusList[i].idcard_pic;
      this.mRfid = this.statusList[i].rfid_wg;
      this.mProject_id = this.projectId;

      request({
        url: util.api_url3002 + "/info/gate",
        method: "post",
        data: {
          method: "query_logs",
          project_id: this.projectId,
          person_id: this.statusList[i].personUid,
          direction: "1"
        }
      }).then(res => {
        console.log(res);
        var workTime = [];
        for (let i in res.data) {
          workTime.push({
            created_time: res.data[i].created_time
          });
        }
        this.workTime = workTime;
      });
    }
  },

  mounted() {
    this.checkopenid(request);
    this.projectId = parseInt(this.$getCookie("project_id"));
    this.project = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
    this.$setCookie("access_token", this.$getQueryString("token"));
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