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
        :src="this.moreUid"
      />
      <!-- </flexbox-item>
      <flexbox-item>-->
      <div class="right" style="margin-left: 150px;">
        <div>姓名：{{this.mUsername}}</div>
        <div>部门：{{this.mUserdepartment}}</div>
        <div>专业：{{this.mUserdepartment}}</div>
        <div>识别率：{{this.mUserdepartment}}</div>
        <x-button mini type="primary" @click.native="oneSelf">确认为本人</x-button>
        <x-button mini type="warn" @click.native="noSelf">确认不为本人</x-button>
      </div>
    </div>
    <!-- </flexbox-item>
    </flexbox>-->
    <div>
      <group>
        <div v-for="(item,index) in picList" :key="index">
          <p
            style="font-size:16px;line-height:2;margin:0px 0px 0px 0px;margin-top:1px;word-break: normal;color:#FF0000"
            v-if="item.hPic ==null"
          >离场时间{{item.created_time}}</p>
          <p
            style="font-size:16px;line-height:2;margin:0px 0px 0px 0px;margin-top:1px;word-break: normal;color:#24A200"
            v-if="item.hPic !==null"
          >进场时间{{item.created_time}}</p>
          <img :src="item.hPic" style="width: auto;height: auto;max-width: 60%;max-height: 60%;" />
        </div>
      </group>
    </div>
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
  XButton
} from "vux";
import request from "../util/request";

export default {
  name: "more",
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
    ChinaAddressV4Data
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
      valueFromParent: [""]
    };
  },

  props: [
    "moreUid",
    "projectId",
    "mUsername",
    "mUserprofession",
    "mUserdepartment",
    "picList"
  ],

  methods: {
    oneSelf() {
      request({
        url: "http://w.yidebim.com:3002/api/info/gate",
        method: "post",
        data: {
          method: "logs_person_comfirm",
          project_id: this.projectId,
          id: this.picList[0].rizhiID,
          compare: "2"
        }
      }).then(res => {
        if (res.status == "success") {
          alert("确认成功");
        }
      });
    },

    noSelf() {
      request({
        url: "http://w.yidebim.com:3002/api/info/gate",
        method: "post",
        data: {
          method: "logs_person_comfirm",
          project_id: this.projectId,
          id: this.picList[0].rizhiID,
          compare: "3"
        }
      }).then(res => {
        if (res.status == "success") {
          alert("确认成功");
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
