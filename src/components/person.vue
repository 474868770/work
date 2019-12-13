<template>
  <div>
    <!-- 头部人员信息 -->
    <van-dialog
      v-model="show"
      :title="'请确认是否将'+userName+'更换为'+personInfo.zhuanye"
      show-cancel-button
      @confirm="changeB"
      @cancel="cancelB"
    ></van-dialog>
    <div class="title" style="background-color: #1AC9B9;">
      <van-row>
        <van-col span="8">
          <img :src="this.idcard_pic" style="margin:10px" />
        </van-col>
        <van-col span="9">
          <div style="color:#fff;font-size:18px">{{userName}}</div>
          <div class="xinxi">部门：{{banzhu}}</div>
          <div class="xinxi">专业：{{zhuanye}}</div>
          <div class="xinxi">年龄：{{age}}</div>
          <div class="xinxi">学历：</div>
          <div class="xinxi">
            电话：
            <a :href="'tel:'+mobile">{{mobile}}</a>
          </div>
        </van-col>
        <van-col span="7">
          <div class="block" style="width:100px;margin-top:30px">
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"
              :show-all-levels="false"
              placeholder="更换部门"
              size="mini"
            ></el-cascader>
          </div>
        </van-col>
      </van-row>
      <div class="xinxi" style="text-align:center;color:#fff">入职时间：2019年10月1日（状态：正常）</div>
      <van-button
        square
        type="info"
        style="width:100%;background-color: #1AC9B9;border-color:#1AC9B9"
      >所属项目：{{project}}</van-button>
    </div>
    <van-tabs
      v-model="active"
      background="#fff"
      color="#1AC9B9"
      title-active-color="#1AC9B9"
      title-inactive-colo="#515151"
      animated
    >
      <van-tab title="入职照片">
        <div style="background:#fff">
          <img :src="this.rzPic" style="margin-top:10px;width:100%;height:100%" />
        </div>
      </van-tab>
      <van-tab title="身份证扫描件">
        <div style="background:#fff">
          <img :src="this.idcardPic1" style="margin-top:10px;width:100%;height:100%" />
          <img :src="this.idcardPic2" style="margin-top:10px;width:100%;height:100%" />
        </div>
      </van-tab>
      <van-tab v-for="(item,index) in dome" :key="index">
        <div class="tab-title" slot="title" @click="onClick(index)">{{ item.title }}</div>
        <div style="background:#fff">
          <div v-if="zlPdf ==''" style="text-align:center;color:#515151;padding:10px">资料暂未上传</div>
          <div class="pdf" v-if="zlPdf !==''">
            <pdf
              ref="pdf"
              :src="zlPdf"
              :page="currentPage"
              @loaded="loadPdfHandler"
              @num-pages="pageCount=$event"
            ></pdf>
            <div>
              <van-button
                @click="changePdfPage(0)"
                style="background-color:#1AC9B9;color:#fff;margin:10px 10px 10px 80px"
              >上一页</van-button>
              {{currentPage}} / {{pageCount}}
              <van-button
                @click="changePdfPage(1)"
                style="background-color:#1AC9B9;color:#fff;margin:0 0 0 10px"
              >下一页</van-button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
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
import pdf from "vue-pdf";
import { cpus } from "os";
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
    Loading,
    pdf
  },

  data() {
    return {
      active: 0,
      dome: [
        {
          id: 0,
          title: "安全责任书"
        },
        {
          id: 1,
          title: "劳动合同"
        },
        {
          id: 2,
          title: "安全交底"
        },
        {
          id: 3,
          title: "技术交底"
        },
        {
          id: 4,
          title: "三级安全教育记录卡"
        },
        {
          id: 5,
          title: "考试试题及结果"
        }
      ],
      value: "",
      idcard_pic: "",
      idcardPic1: "",
      idcardPic2: "",
      rzPic: "",
      zlPdf: "",
      group: "",
      yema: 0,
      numPages: 1,
      personId: this.$route.query.id,
      projectId: "",
      loading: true,
      userName: "",
      banzhu: "",
      group: "",
      zhuanye: "",
      age: "",
      mobile: "",
      show: false,
      project: "",
      showPicker: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      options: [
        {
          value: "1010",
          label: "指南",
          children: [{ value: "1011", label: "设计原则" }]
        },
        {
          value: "1010",
          label: "指南2",
          children: [{ value: "1011", label: "设计原则2" }]
        }
      ],
      personInfo: []
    };
  },

  methods: {
    handleChange(value, options) {
      console.log(value, this.options);
      this.show = true;
      var temp = {};
      for (let i in this.options) {
        if (value[0] == this.options[i].value) {
          for (let j in this.options[i].children)
            if (value[1] == this.options[i].children[j].value) {
              temp = {
                bumen: this.options[i].label,
                zhuanye: this.options[i].children[j].label,
                bumenid: value[0],
                zhuanyeid: value[1]
              };
            }
        }
      }
      console.log(temp);
      this.personInfo = temp;
    },

    changeB() {
      console.log(this.personInfo);
      request({
        url: util.api_url3002 + "/info/project",
        method: "post",
        async: false,
        data: {
          person_id: this.personId,
          method: "set_person_props",
          project_id: this.projectId,
          group_id: this.personInfo.zhuanyeid
        }
      }).then(res => {
        location.reload();
      });
    },

    cancelB() {
      this.value = "";
    },

    onClick(i) {
      console.log(i);
      this.zlPdf = "";
      request({
        url: util.api_url3002 + "/datum/person",
        method: "post",
        async: false,
        data: {
          person_id: this.personId,
          method: "query",
          project_id: this.projectId
        }
      }).then(res => {
        var src1 = "";
        for (var j = 0; j < res.data.length; j++) {
          if (i + 1 == res.data[j].datum_type) {
            this.zlPdf = res.data[j].datum_file_url;
            src1 = res.data[j].datum_file_url;
          }
        }
        console.log(this.zlPdf);
        console.log(src1);
        pdf.createLoadingTask(src1).then(pdf => {
          this.numPages = pdf.numPages;
        });
        this.loading = false;
      });
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },

    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    }
  },

  mounted() {
    this.projectId = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
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

    request({
      url: util.api_url3002 + "/info/project",
      method: "post",
      async: false,
      data: {
        method: "query_group",
        project_id: this.projectId
      }
    }).then(res => {
      // for (let i in res.data.group) {
      //   if (res.data.group[i].group_name == res.data.group[i].group_name) {
      //     for (let j in res.data.group[i].group) {
      //       if (
      //         res.data.group[i].group[j].groups_type ==
      //         res.data.group[i].group[j].groups_type
      //       ) {
      //         test[res.data.group[i].group_name] =
      //           res.data.group[i].group[j].group_name;
      //       }
      //     }
      //   }
      // }
      var group = [];
      for (let i in res.data.group) {
        // if (res.data.group[i].group_name == res.data.group[i].group_name) {
        var subgroup = [];
        for (let j in res.data.group[i].group) {
          subgroup.push({
            label: res.data.group[i].group[j].group_name,
            value: res.data.group[i].group[j].id
          });
          // }
        }
        group.push({
          children: subgroup,
          label: res.data.group[i].group_name,
          value: res.data.group[i].id
        });
      }
      console.log(group);
      this.options = group;
      // let _test = {};
      // for (let i in test) {
      //   for (let j in test[i]) {
      //     if (test[i][j].groups_type == test[i][j].groups_type) {
      //       _test[i] = test[i][j].group_name;
      //     }
      //   }
      // }
      // console.log(_test);

      // let _temp = {};
      // for (let i in res.data.group) {
      //   if (res.data.group[i].group_name == res.data.group[i].group_name) {
      //     _temp[res.data.group[i].group_name] =
      //       res.data.group[i].group[i].group_name;
      //   }
      // }
      // console.log(_temp);
      // let group = {};
      // for (let i in _temp) {
      //   group = _temp[i].group_name;
      // }
      // console.log(group);
    });

    request({
      url: util.api_url3002 + "/info/project",
      method: "post",
      async: false,
      data: {
        id: this.personId,
        method: "query_person",
        project_id: this.projectId
      }
    }).then(res => {
      console.log(res.data[0]);
      this.idcard_pic = res.data[0].idcard_pic;
      this.rzPic = res.data[0].entry_pic;
      this.idcardPic1 = res.data[0].idcarda;
      this.idcardPic2 = res.data[0].idcardb;
      (this.userName = res.data[0].name),
        (this.banzhu = res.data[0].group_name_level[0]),
        (this.zhuanye = res.data[0].group_name_level[1]),
        (this.age = res.data[0].age),
        (this.mobile = res.data[0].mobile);
    });
  },

  created() {}
};
</script>

<style>
.xinxi {
  color: #e3e8ee;
  font-size: 14px;
}

.pdf {
  margin: 5px;
}
</style>