<template>
  <div>
    <!-- 头部人员信息 -->
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
    </div>
    <van-button
      square
      type="info"
      style="width:100%;background-color: #1AC9B9;border-color:#1AC9B9"
    >{{project}}</van-button>

    <van-dropdown-menu>
      <van-dropdown-item v-model="valueZ" :options="zhuangtai" @change="xuanzeZ()" />
    </van-dropdown-menu>

    <!-- 搜索框 -->
    <form action="/" style="z-index:1000">
      <search
        @on-change="getResult"
        @on-cancel="onCancel"
        v-model="value"
        placeholder="请输入姓名搜索"
        shape="round"
        @on-focus="onFocus"
        style="z-index:10000"
      ></search>
    </form>

    <x-dialog
      v-model="tanchuang"
      mask-z-index="500"
      :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent','position': 'fixed','overflow':'auto','margin':'0px','top':'44px'}"
    >
      <!-- <div v-for="(item,index) in list" :key="index">
        <van-cell :title="item.id" style="z-index:1000">
          <a :href="'tel:'+item.mobile">{{item.mobile}}</a>
        </van-cell>
      </div>-->

      <div style="padding:5px;position:fixed;overflow:auto;top:45px;bottom:0;left:0;right:0;">
        <van-cell v-for="(item1,index1) in list" :key="index1">
          <div slot="title">
            <van-row>
              <van-col span="4">
                <div
                  style="width: 40px;height: 40px;background:#1ac9b9;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;"
                >
                  <div
                    align="center"
                    style="padding:8px;font-size:18px;color:#fff"
                  >{{item1.id.substring(0, 1)}}</div>
                </div>
              </van-col>
              <van-col span="12">
                <div
                  style="color:#515151;font-size:16px;float:left"
                  v-if="value.charCodeAt() < 255"
                >{{item1.id}}</div>
                <div
                  style="color:#515151;font-size:16px;float:left"
                  v-if="value.charCodeAt() > 255"
                >
                  <span>{{item1.id.slice(0,item1.id.toLowerCase().indexOf(value.toLowerCase()))}}</span>
                  <span
                    style="color:#2A70FE"
                  >{{item1.id.slice(item1.id.toLowerCase().indexOf(value.toLowerCase()),item1.id.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</span>
                  <span>{{item1.id.substr(item1.id.toLowerCase().indexOf(value.toLowerCase())+value.length)}}</span>
                </div>
                <div
                  style="color:#bababa;font-size:12px;clear:both;float:left"
                >{{item1.bumen}}，{{item1.zhuanye}}</div>
              </van-col>
              <van-col span="8">
                <div align="center">
                  <a :href="'tel:'+item1.mobile">
                    <van-icon
                      name="phone-circle-o"
                      size="30px"
                      color="#1ac9b9"
                      v-if="item1.mobile !== ''"
                      style="float:right;margin-top:10px"
                    />
                  </a>
                </div>
                <div
                  align="center"
                  v-if="item1.mobile == ''"
                  style="float:right;margin-top:10px"
                >未录入电话</div>
              </van-col>
            </van-row>
          </div>
        </van-cell>
        <loading :show="show1" text="加载中..."></loading>
      </div>
    </x-dialog>
    <div style="background-color: #fff;">
      <!-- 通讯录标题 -->
      <van-row>
        <van-col span="1">
          <div style="width: 5px;height: 30px;background: #ff8e29;border-radius: 5px;margin:10px"></div>
        </van-col>
        <van-col span="23">
          <div
            style="margin:0px 10px 0px 10px;padding:15px 15px 15px 0px;font-size:16px;color:#515151;font-weight:bold;float:left"
          >通讯录</div>
        </van-col>
      </van-row>

      <!-- 组织架构 -->
      <van-collapse
        v-model="activeName"
        accordion
        v-for="(item,index) in chooseList"
        :key="index"
        @change="choose(item.group_name)"
      >
        <van-collapse-item
          :title="item.group_name"
          :name="item.id"
          @change="choose(item.group_name)"
          icon="cluster-o"
        >
          <!-- 通讯录列表 -->
          <div style="padding:5px" v-loading="loading">
            <van-cell v-for="(item1,index1) in workList" :key="index1">
              <div slot="title">
                <van-row>
                  <van-col span="4">
                    <div
                      style="width: 40px;height: 40px;background:#1ac9b9;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;"
                    >
                      <div
                        align="center"
                        style="padding:8px;font-size:18px;color:#fff"
                      >{{item1.name.substring(0, 1)}}</div>
                    </div>
                  </van-col>
                  <van-col span="8">
                    <div style="color:#515151;font-size:16px">{{item1.name}}</div>
                    <div style="color:#bababa;font-size:12px">{{item1.group}}</div>
                  </van-col>
                  <van-col span="12">
                    <div align="center">
                      <a :href="'tel:'+item1.mobile">
                        <van-icon
                          name="phone-circle-o"
                          size="30px"
                          color="#1ac9b9"
                          v-if="item1.mobile !== ''"
                          style="float:right;margin-top:10px"
                        />
                      </a>
                    </div>
                    <div
                      align="center"
                      v-if="item1.mobile == ''"
                      style="float:right;margin-top:10px"
                    >未录入电话</div>
                  </van-col>
                </van-row>
              </div>
            </van-cell>
            <loading :show="show1" text="加载中..."></loading>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
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
  Loading,
  ConfigPlugin
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
    Loading,
    ConfigPlugin
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
      value: "",
      chooseList: [],
      chooseList1: [],
      columns: [],
      project: "",
      tanchuang: false,
      projectId: "",
      list: [],
      loading: true,
      zhuangtai: [
        { text: "正常", value: 0 },
        { text: "注销", value: -1 },
        { text: "离职", value: 2 },
        { text: "待激活", value: 1 },
        { text: "手动注销", value: 3 },
        { text: "默认值", value: 10 },
        { text: "所有", value: '' }
      ],
      valueZ: '',
      groupName: "项目经理部"
    };
  },

  methods: {
    loadMe() {
      var pinyin = require("pinyin");
      // loading效果打开
      this.show1 = true;

      // 获取个人信息
      request({
        url: util.api_url3002 + "/info/person",
        method: "post",
        async: false,
        data: {
          method: "query"
        }
      }).then(res => {
        this.department = res.data.project[0].group_name_level[0];
        this.profession = res.data.project[0].group_name_level[1];
        this.personName = res.data.person.name;
        for (var i = 0; i < res.data.project.length; i++) {
          this.columns.push({
            text: res.data.project[i].project_name,
            defaultIndex: i,
            id: res.data.project[i].project_id
          });
        }
      });

      // 获取微信头像
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

      // 将项目id转换为项目名字
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

      //获取班组列表
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_group",
          project_id: this.project
        }
      }).then(res => {
        this.chooseList = res.data.group;
      });

      //项目通讯录获取
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_list",
          project_id: this.$getCookie("project_id")
          // status: this.valueZ
        }
      }).then(res => {
        for (var j = 0; j < res.data.length; j++) {
          var result = [];
          var ccu = res.data[j].name;
          var paixu = pinyin(ccu, {
            style: pinyin.STYLE_NORMAL
          });
          var paixu1 = pinyin(ccu, {
            style: pinyin.STYLE_FIRST_LETTER
          });
          this.workList1.push({
            bumen: res.data[j].group_name_level[0],
            zhuanye: res.data[j].group_name_level[1],
            mobile: res.data[j].mobile,
            id: res.data[j].name,
            name:
              paixu
                .toString()
                .replace(/,/g, "")
                .toUpperCase() +
              res.data[j].name +
              res.data[j].group_name_level[1] +
              paixu.toString().replace(/,/g, "") +
              paixu1
                .toString()
                .replace(/,/g, "")
                .toUpperCase() +
              paixu1.toString().replace(/,/g, "")
          });
        }
        //loading效果关闭
        console.log(this.workList1);
        this.show1 = false;
      });
    },

    //搜索人名选择电话
    getResult(val, item, index) {
      console.log("on-change", val);
      console.log("on-12", this.workList1);
      var arr = [];
      if (val == "") {
        this.list = [];
      } else {
        for (var i = 0; i < this.workList1.length; i++) {
          if (this.workList1[i].name.search(val) != -1) {
            arr.push(this.workList1[i]);
          }
          // else if (this.workList1[i].id.search(val) != -1) {
          //   arr.push(this.workList1[i]);
          // }
        }
        this.list = arr;
        console.log("选中", this.list);
      }
    },

    xuanzeZ() {
      console.log("部门", this.groupName);
      this.choose(this.groupName);
    },

    // 选择部门获取通讯录
    choose(group_name) {
      this.groupName =group_name
      console.log("部门", group_name);
      this.workList = [];
      this.loading = true;
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_list",
          project_id: this.$getCookie("project_id"),
          status: this.valueZ
        }
      }).then(res => {
        var workList = [];
        for (let i in res.data) {
          if (group_name == res.data[i].group_name_level[0]) {
            workList.push({
              name: res.data[i].name,
              group: res.data[i].group_name_level[1],
                groupName: res.data[i].group_name_level[0],
              mobile: res.data[i].mobile,
              status: res.data[i].status
            });
          }
        }
        this.workList = workList;
        this.loading = false;
      });
    },

    onFocus() {
      this.tanchuang = true;
    },

    onCancel() {
      this.tanchuang = false;
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

.suxian {
  position: relative;
  left: 20px;
  width: 60px;
  height: 20px;
  border-width: 0 0 1px 1px;
  border-color: #bababa;
  border-style: solid;
}
.hengxian {
  width: 5px;
  height: 5px;
  border: 1px solid #1ac9b9;
}
</style>