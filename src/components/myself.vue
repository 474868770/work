<template>
  <div>
    <!-- <flexbox>
    <flexbox-item :span="4">-->
    <div style="overflow: hidden">
      <img
        slot="icon"
        width="45"
        height="45"
        style="float:left;border-radius:10px;margin:0px 0px 0px 0px;width: auto;height: auto;max-width: 60%;max-height: 60%;"
        :src="this.mIdcard_pic"
      />
      <!-- </flexbox-item>
      <flexbox-item>-->
      <div class="right" style="margin-left: 120px;">
        <div>姓名：{{this.mUsername}}</div>
        <div>部门：{{this.mUserdepartment}}</div>
        <div>专业：{{this.mUserprofession}}</div>
        <div>电话：{{this.mUserphone}}</div>
      </div>
    </div>
    <!-- </flexbox-item>
    </flexbox>-->
    <div>
      <div>上工日志</div>
      <group>
        <div v-for="(item,index) in workTime" :key="index">
          <p
            style="font-size:16px;line-height:2;margin:0px 0px 0px 0px;margin-top:1px;word-break: normal;color:#24A200"
          >进场时间{{item.created_time}}</p>
        </div>
      </group>
    </div>
    <br />
    <van-row>
      <van-col span="8">
        <van-button round hairline type="danger" size="small" @click="expel">开除</van-button>
      </van-col>
      <van-col span="8">
        <van-button round hairline type="info" size="small" @click="loGout">注销卡</van-button>
      </van-col>
      <van-col span="8">
        <van-button round hairline type="warning" size="small" @click="resign">辞职</van-button>
      </van-col>
    </van-row>
    <el-dialog title="辞职" :visible.sync="showToast" width="90%" top="1px" :append-to-body="true">
      <chizi
        v-bind:mUsername="this.mUsername"
        v-bind:mUserid="this.mUserid"
        v-bind:mProject_id="this.mProject_id"
        v-bind:mStatus="this.status"
      ></chizi>
    </el-dialog>
    <el-dialog title="开除" :visible.sync="showToast1" width="90%" top="1px" :append-to-body="true">
      <kaichu></kaichu>
    </el-dialog>
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
  XDialog
} from "vux";
import request from "../util/request";
import chizi from "./chizi";
import kaichu from "./kaichu";
import util from "../util/util.js";

export default {
  name: "myself",
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
    chizi,
    XDialog,
    kaichu
  },

  data() {
    return {
      inputVal: "",
      vcode: "",
      checkCode: {
        text: "获取验证码",
        TIME: 60,
        disabled: false
      },
      valueFromParent: [""],
      showToast: false,
      showToast1: false,
      status: ""
    };
  },

  props: [
    "moreUid",
    "projectId",
    "mUsername",
    "mUserprofession",
    "mUserdepartment",
    "workList",
    "mUserid",
    "mUserphone",
    "mIdcard_pic",
    "workTime",
    "mProject_id",
    "mRfid"
  ],

  methods: {
    expel() {
      this.showToast = true;
      this.status = "4";
      console.log(this.status);
    },

    resign() {
      this.showToast = true;
      this.status = "2";
    },

    loGout() {
      request({
        url: "http://w.yidebim.com:3002/api/info/user",
        method: "post",
        data: {
            method: "card_opera",
            project_id: this.mProject_id,
            status: "-1",
            rfid_wg: this.mRfid
        }
      }).then(res => {
        if (res.status == "success") {
          alert("注销成功");
          location.reload();
        }
      });
    }
  },

  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btn {
  width: 25%;
  background-color: red;
  height: 20px;
}
</style>
