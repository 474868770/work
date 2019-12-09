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
      :class="searchBarFixed == true ? 'isFixed' :''"
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
      <flexbox-item :span="4">
        <x-button
          mini
          type="warn"
          style="border-radius:99px;margin:5px 5px 5px 5px;float:left "
          @click.native="allGoout"
        >全部出场</x-button>
      </flexbox-item>
      <flexbox-item>
        <p
          style="color:#000079;font-size:14px;margin:0;float:right;font-weight:bold"
        >今日{{new Date().getHours()}}时场内人员 共计{{nowPeople}}人</p>
      </flexbox-item>
    </flexbox>
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
      <van-dropdown-item v-model="value2" :options="option2" @change="paixu" />
    </van-dropdown-menu>

    <!-- <div class="kapian1">
      <van-row>
        <van-col span="4">
          <van-tag round size="medium">
            <van-icon name="closed-eye" />99%
          </van-tag>
        </van-col>
        <van-col span="12">2019-12-05 19:08:22</van-col>
        <van-col span="8">...</van-col>
      </van-row>
      <div class="kapianziti" style="color:#515151">1111</div>
      <div class="kapianziti" style="color:#bababa">11111</div>
      <div class="kapianziti" style="color:#bababa">期望身高：1111</div>
      <van-row>
              <van-col span="4">
     <img
              slot="icon"
              width="45"
              height="45"
              style="display:block;border-radius:50px;margin:0px"
              src="../../static/images/tianjia.png"
              v-if="this.imgUrl == ''"
            />
        </van-col>
        <van-col span="12">2019-12-05 19:08:22</van-col>
        <van-col span="8">...</van-col>
      </van-row>
    </div> -->

    <van-collapse v-model="activeName" accordion v-for="(item,index) in list" :key="index">
      <van-collapse-item :name="item.userid">
        <div slot="title" style="color:red" v-if="item.face<=50">
          <van-row>
            <router-link :to="{path:'/person',query:{id:item.personUid}}">
              <van-col span="4">
                <van-row>
                  <van-col>
                    <div>{{item.username}}</div>
                  </van-col>
                </van-row>
              </van-col>
            </router-link>
            <van-col span="8">
              <div align="center">{{item.userprofession}}</div>
            </van-col>
            <van-col span="12">
              <div align="center">{{item.intime}}</div>
            </van-col>
          </van-row>
        </div>
        <div slot="title" style="color:#000" v-if="item.face>50">
          <van-row>
            <van-col span="4">
              <router-link :to="{path:'/person',query:{id:item.personUid}}">
                <van-row>
                  <van-col>
                    <div>{{item.username}}</div>
                  </van-col>
                </van-row>
              </router-link>
            </van-col>
            <van-col span="8">
              <div align="center">{{item.userprofession}}</div>
            </van-col>
            <van-col span="12">
              <div align="center">{{item.intime}}</div>
            </van-col>
          </van-row>
        </div>
        <div class="kuangjia">
          <van-row>
            <van-col span="4">
              <van-icon name="manager-o" size="20" />
            </van-col>
            <van-col span="16">
              <div class="ziti">{{item.userdepartment}}</div>
            </van-col>
          </van-row>
        </div>
        <div class="kuangjia">
          <van-row>
            <van-col span="4">
              <van-icon name="phone-o" size="20" />
            </van-col>
            <van-col span="16">
              <div class="ziti">{{item.userphone}}</div>
            </van-col>
          </van-row>
        </div>
        <div class="kuangjia">
          <van-row>
            <van-col span="8">
              <van-col span="12">
                <van-icon name="closed-eye" size="18" />
              </van-col>
              <van-col span="12">
                <div class="ziti">{{item.face}}</div>
              </van-col>
            </van-col>
            <van-col span="16">
              <van-row>
                <van-col span="12">
                  <x-button
                    mini
                    plain
                    type="primary"
                    style="border-radius:99px;margin:0px 0px 0px 15px;float:right "
                    @click.native="details(index)"
                  >个人详情</x-button>
                </van-col>
                <van-col span="12">
                  <x-button
                    mini
                    plain
                    type="warn"
                    style="border-radius:99px;margin:0px 15px 0px 0px;float:right "
                    @click.native="leave(index)"
                  >手动出场</x-button>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>
    <el-dialog title="个人详情" :visible.sync="showToast" width="90%" top="1px">
      <more
        v-bind:moreUid="moreUid"
        v-bind:projectId="projectId"
        v-bind:mUsername="mUsername"
        v-bind:mUserdepartment="mUserdepartment"
        v-bind:mUserprofession="mUserprofession"
        v-bind:picList="picList"
      ></more>
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
    Loading
  },

  data() {
    return {
      searchBarFixed: "",
      touxiang: "",
      imgUrl: "static/images/tianjia.png",
      activeName: "1",
      department: "",
      profession: "",
      personName: "",
      show1: false,
      list: [
        {
          userid: "",
          username: "",
          userprofession: "",
          intime: "",
          userphone: "",
          userdepartment: "",
          face: "",
          personId: "",
          personUid: ""
        }
      ],
      list2: [
        {
          userid: "",
          username: "",
          userprofession: "",
          intime: "",
          userphone: "",
          userdepartment: "",
          face: "",
          personId: "",
          personUid: ""
        }
      ],
      nowPeople: "",
      shibie: "",
      value: "",
      value2: "a",
      option2: [
        { text: "默认排序", value: "a" },
        { text: "识别率排序", value: "b" }
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
      ]
    };
  },

  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      // var offsetTop = document.querySelector("#searchBar").offsetTop;
      if (scrollTop > 100) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },

    loadMe() {
      var pinyin = require("pinyin");
      this.show1 = true;

      //获取个人信息
      request({
        url: util.api_url3002 + "/info/person",
        method: "post",
        async: false,
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
          console.log(res.data.project[i].project_name);
          this.columns.push({
            text: res.data.project[i].project_name,
            defaultIndex: i,
            id: res.data.project[i].project_id
          });
        }
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
        url:
          util.api_url +
          "/api?method=weixin.get_my_info&openid=" +
          this.$getCookie("openid"),
        method: "post",
        async: false,
        data: {}
      }).then(res => {
        this.imgUrl = res.headimgurl;
      });

      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_in",
          project_id: this.$getCookie("project_id"),
          in_status: "1"
        }
      }).then(res => {
        var list = [];
        for (let i in res.data) {
          var ccu = res.data[i].name;
          var paixu = pinyin(ccu, {
            style: pinyin.STYLE_NORMAL
          });
          var paixu1 = pinyin(ccu, {
            style: pinyin.STYLE_FIRST_LETTER
          });
          list.push({
            intime: res.data[i].last_in_time,
            username: res.data[i].name,
            userprofession: res.data[i].group_name_level[0],
            userid: i,
            face: res.data[i].last_in_face_percent,
            userphone: res.data[i].mobile,
            userdepartment: res.data[i].group_name_level[1],
            personId: res.data[i].idcard_pic,
            personUid: res.data[i].person_id,
            Name:
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
        this.list = list;
        this.list2 = list;
        var list = list;
        this.nowPeople = list.length;
        console.log(this.list);
        this.show1 = false;
      });
    },

    onChoose() {
      this.showPicker = true;
    },

    allGoout() {
      this.$confirm("此操作将所有人员移除场内, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: util.api_url3002 + "/info/project",
            method: "post",
            data: {
              method: "person_goout",
              project_id: this.projectId
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            window.location.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    },

    onConfirm(value, index) {
      this.project_id = value.id;
      this.project = value.text;
      this.showPicker = false;
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        data: {
          method: "query_person_inout",
          project_id: this.projectId,
          in_status: "1"
        }
      }).then(res => {
        var list = [];
        for (let i in res.data) {
          var ccu = res.data[i].name;
          var paixu = pinyin(ccu, {
            style: pinyin.STYLE_NORMAL
          });
          var paixu1 = pinyin(ccu, {
            style: pinyin.STYLE_FIRST_LETTER
          });
          console.log(paixu);
          list.push({
            intime: res.data[i].last_in_time,
            username: res.data[i].name,
            userprofession: res.data[i].group_name_level[0],
            userid: i,
            face: res.data[i].last_in_face_percent,
            userphone: res.data[i].mobile,
            userdepartment: res.data[i].group_name_level[1],
            personId: res.data[i].idcard_pic,
            personUid: res.data[i].person_id,
            Name:
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
        console.log(list);
        this.list = list;
        this.list2 = list;
        var list = list;
        this.nowPeople = list.length;
      });
    },
    onCancel() {
      this.showPicker = false;
    },

    getResult(val) {
      console.log("on-change", val);
      var arr = [];
      if (val == "") {
        this.list = this.list2;
      } else {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].Name.search(val) != -1) {
            arr.push(this.list[i]);
          }
        }
        console.log(arr);
        this.list = arr;
      }
    },

    paixu() {
      if (this.value2 == "b") {
        this.list.sort((a, b) => b.face - a.face);
      }
      if (this.value2 == "a") {
        this.list.sort((a, b) => a.userid - b.userid);
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
        this.picList = picList;
      });
    },

    leave(i) {
      this.$confirm("此操作将此人员移除场内, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.projectId);
          request({
            url: util.api_url3002 + "/info/project",
            method: "post",
            data: {
              method: "person_goout",
              project_id: this.projectId,
              person_id: this.list[i].personUid
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            window.location.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    }
  },

  mounted() {
    this.checkopenid(request);
    this.projectId = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
    this.project = this.$getCookie("project_id");
    this.$setCookie("access_token", this.$getQueryString("token"));
    window.addEventListener("scroll", this.handleScroll);
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

.kuangjia {
  padding: 10px;
}

.ziti {
  color: #bababa;
  font-size: 14px;
}

.isFixed {
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
}

.kapian1 {
  margin: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
}
</style>