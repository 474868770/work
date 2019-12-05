<template>
  <div>
    <div
      style="background:#fff;color:#000;padding:20px 0px 0px 0px;height: 50px;font-size:20px;position:fixed;z-index:2;width:100%"
    >
      <div style="margin-left:10px">{{this.project}}</div>
    </div>
    <loading :show="show" text="加载中..."></loading>
    <van-panel title="电表水表" style="padding-top:70px;">
      <div style="font-size:14px;color:#bababa;margin-left:15px">更新时间：{{this.powerlastTime}}</div>
      <div>
        <van-row>
          <van-col span="12" style="text-align:center">
            <img src="../../static/images/dianbiao.png" style="max-width:25%" />
            <div style="font-size:14px">总读数：{{this.power}}</div>
            <div style="font-weight:bold;font-size:16px">今日用量：{{this.toDaypower}}度</div>
          </van-col>
          <van-col span="12" style="text-align:center">
            <img src="../../static/images/shuibiao.png" style="max-width:25%" />
            <div style="font-size:14px">总读数：{{this.water}}</div>
            <div style="font-weight:bold;font-size:16px">今日用量：{{this.toDaywater}}吨</div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <br />
    <van-panel title="环境监测仪">
       <div style="font-size:14px;color:#bababa;margin-left:15px">更新时间：{{this.huanjinglastTime}}</div>
      <div>
        <van-row>
          <div>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/wendu.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">温度</div>
                <div style="font-weight:bold;font-size:16px">{{this.wendu}}°C</div>
              </van-col>
            </van-col>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/shidu.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">湿度</div>
                <div style="font-weight:bold;font-size:16px">{{this.shidu}}%</div>
              </van-col>
            </van-col>
          </div>
          <div>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/zaosheng.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">噪声</div>
                <div style="font-weight:bold;font-size:16px">{{this.zaosheng}}db</div>
              </van-col>
            </van-col>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/fengsu.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">风速</div>
                <div style="font-weight:bold;font-size:16px">{{this.fengsu}}级</div>
              </van-col>
            </van-col>
          </div>
          <div>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/pm10.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">扬尘</div>
                <div style="font-weight:bold;font-size:16px">{{this.pm10}}ug/m3</div>
              </van-col>
            </van-col>
            <van-col span="12" style="text-align:center">
              <van-col span="12" style="text-align:center">
                <img src="../../static/images/pm25.png" style="max-width:40%" />
              </van-col>
              <van-col span="12" style="text-align:left">
                <div style="font-size:14px">pm2.5</div>
                <div style="font-weight:bold;font-size:16px">{{this.pm2_5}}ug/m3</div>
              </van-col>
            </van-col>
          </div>
        </van-row>
      </div>
    </van-panel>
    <br />
    <van-panel title="塔机升降机设备">
      <div>
        <van-row>
          <van-col span="8">
            <img src="../../static/images/taji.png" style="max-width:100%" />
          </van-col>
          <van-col span="16">
            <div style="color:#fff;font-size:14px;font-weight:bold;background:#1ABC9C">塔机数据</div>
            <div v-if="this.tjId != ''">
              <div style="color:#999;font-size:14px">塔吊高度：{{this.tjHight}}米</div>
              <div style="color:#999;font-size:14px">大臂角度：{{this.tjJiaodu}}°</div>
              <div style="color:#999;font-size:14px">小车距离：{{this.tjJuli}}米</div>
              <div style="color:#999;font-size:14px">吊钩线长：{{this.tjXianchang}}米</div>
              <div style="color:#999;font-size:14px">上报时间：{{this.tjRTime}}</div>
            </div>
            <div v-if="this.tjId ==''">未配置升降机</div>
            <div style="color:#fff;font-size:14px;font-weight:bold;background:#1ABC9C">升降机数据</div>
            <div v-if="this.shengjianId != ''">
              <div style="color:#999;font-size:14px">高度：{{this.Height}}米</div>
              <div style="color:#999;font-size:14px">楼层：{{this.Floor}}层</div>
              <div style="color:#999;font-size:14px">笼门状态：{{this.DoorState}}</div>
              <div style="color:#999;font-size:14px">上报时间：{{this.RTime}}</div>
            </div>
            <div v-if="this.shengjianId ==''">未配置升降机</div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <br />
    <van-panel title="车辆进出场">
      <div>
        <van-row>
          <div style="font-weight:bold;font-size:16px;text-align:center">{{this.oneCarname}}</div>
          <div style="color:#999;font-size:14px;text-align:center">进场时间：{{this.oneCreated_time}}</div>
          <img :src="this.onePic" style="max-width:100%" />
          <el-table
            :data="carList"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
          >
            <el-table-column prop="carName" label="车牌" min-width="200px"></el-table-column>
            <el-table-column prop="created_time" label="进场时间" min-width="200px"></el-table-column>
          </el-table>
        </van-row>
      </div>
    </van-panel>
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
  TransferDomDirective as TransferDom
} from "vux";
import request from "../util/request";
import util from "../util/util.js";

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
    Loading
  },

  data() {
    return {
      RTime: "",
      Height: "",
      Floor: "",
      DoorState: "",
      carList: {
        carName: "",
        pic: "",
        created_time: ""
      },
      tjRTime: "",
      tjHight: "",
      tjJuli: "",
      tjJiaodu: "",
      tjXianchang: "",
      power: "",
      powerId: "",
      toDaypower: "",
      powerlastTime: "",
      waterId: "",
      toDaywater: "",
      water: "",
      openId: "",
      show: false,
      wendu: "",
      shidu: "",
      zaosheng: "",
      fengsu: "",
      pm10: "",
      pm2_5: "",
      projectId: "",
      project: "",
      oneCarname: "",
      onePic: "",
      oneCreated_time: "",
      shengjianId: "",
      tjId: "",
      huanjinglastTime:""
    };
  },

  methods: {
    loadMe() {
      this.show = true;
      console.log(this.show);
      //环境监测仪数据
      request({
        url: util.api_url3002 + "/datum/meter",
        method: "post",
        data: {
          method: "query_env",
          project_id: this.projectId
        }
      }).then(res => {
        this.show = true;
        this.wendu = res.data[0].temp;
        this.shidu = res.data[0].h;
        this.zaosheng = res.data[0].noise;
        this.fengsu = res.data[0].power;
        this.pm10 = res.data[0].pm10;
        this.pm2_5 = res.data[0].pm2_5;
        this.huanjinglastTime = res.data[0].record_time;
        this.show = false;
      });

      //定时器更新数据
      this.timer = setInterval(() => {
        request({
          url: util.api_url3002 + "/datum/meter",
          method: "post",
          data: {
            method: "query_env",
            project_id: this.projectId
          }
        }).then(res => {
          this.show = true;
          this.wendu = res.data[0].temp;
          this.shidu = res.data[0].h;
          this.zaosheng = res.data[0].noise;
          this.fengsu = res.data[0].power;
          this.pm10 = res.data[0].pm10;
          this.pm2_5 = res.data[0].pm2_5;
          this.huanjinglastTime = res.data[0].record_time;
          this.show = false;
        });
      }, 60000);

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

      //进出场车辆数据
      request({
        url: util.api_url3002 + "/info/gate",
        method: "post",
        data: {
          method: "query_vehicle_logs",
          project_id: this.projectId
        }
      }).then(res => {
        var carList = [];
        for (let i in res.data) {
          carList.push({
            carName: res.data[i].lisence,
            pic: res.data[i].pic,
            created_time: res.data[i].created_time
          });
        }
        this.carList = carList;
        this.oneCarname = carList[0].carName;
        this.onePic = carList[0].pic;
        this.oneCreated_time = carList[0].created_time;
      });

      //物联网设备配置表
      request({
        url: util.api_url3002 + "/datum/meter",
        method: "post",
        data: {
          method: "devlist",
          project_id: this.projectId
        }
      }).then(res => {
        for (let i in res.data) {
          if (res.data[i].device_type == 10) {
            this.powerId = res.data[i].device_id;
          } else if (res.data[i].device_type == 11) {
            this.waterId = res.data[i].device_id;
          } else if (res.data[i].device_type == 12) {
            this.shengjianId = res.data[i].device_id;
            //升降机数据
            request({
              url: util.api_url3002 + "/datum/meter",
              method: "post",
              data: {
                method: "query_elevator",
                project_id: this.projectId,
                devid: this.shengjianId
              }
            }).then(res => {
              this.RTime = res.data[0].RTime;
              this.Height = res.data[0].Height;
              this.Floor = res.data[0].Floor;
              if ((res.data[0].DoorState = "0")) {
                this.DoorState = "内外笼门全关";
              } else if ((res.data[0].DoorState = "1")) {
                this.DoorState = "内外笼门全开";
              } else if ((res.data[0].DoorState = "2")) {
                this.DoorState = "仅内笼门开";
              } else if ((res.data[0].DoorState = "3")) {
                this.DoorState = "仅外笼门开";
              }
            });
          } else if (res.data[i].device_type == 13) {
            this.tjId = res.data[i].device_id;
            this.tjHight = JSON.parse(res.data[0].params_json).height;

            //塔机数据
            request({
              url: util.api_url3002 + "/datum/meter",
              method: "post",
              data: {
                method: "query_crane",
                project_id: this.projectId,
                devid: this.tjId
              }
            }).then(res => {
              this.tjRTime = res.data[0].RTime;
              this.tjJuli = res.data[0].RRange;
              this.tjJiaodu = res.data[0].Angle;
              this.tjXianchang = res.data[0].Moment;
            });
          }
        }

        //小时电表
        request({
          url: util.api_url3002 + "/datum/meter",
          method: "post",
          data: {
            method: "query_hours",
            bt: this.$Nowtime() + "00:00:00",
            et: this.$Nowtime() + "23:59:59",
            meter_id: this.powerId,
            project_id: this.projectId
          }
        }).then(res => {
          let i = res.data.length - 1;
          this.powerlastTime = res.data[i].created_time;
          let sum = 0;
          res.data.forEach(item => {
            //遍历used这个字段，并累加
            sum += item.used;
          });
          console.log("今日用水量", sum);
          this.toDaypower = sum.toFixed(2);
        });

        //小时水表
        request({
          url: util.api_url3002 + "/datum/meter",
          method: "post",
          data: {
            method: "query_hours",
            bt: this.$Nowtime() + "00:00:00",
            et: this.$Nowtime() + "23:59:59",
            meter_id: this.waterId,
            project_id: this.projectId
          }
        }).then(res => {
          let sum = 0;
          res.data.forEach(item => {
            //遍历used这个字段，并累加
            sum += item.used;
          });
          console.log("今日用水量", sum);
          this.toDaywater = sum.toFixed(2);
        });
      });

      //电表数据
      request({
        url: util.api_url3002 + "/datum/meter",
        method: "post",
        data: {
          method: "devlist",
          project_id: this.projectId,
          device_type: 10
        }
      }).then(res => {
        this.power = res.data[0].total_used;
      });

      //水表数据
      request({
        url: util.api_url3002 + "/datum/meter",
        method: "post",
        data: {
          method: "devlist",
          project_id: this.projectId,
          device_type: 11
        }
      }).then(res => {
        this.water = res.data[0].total_used;
      });
    },

    handleCurrentChange(val) {
      console.log(val);
      this.oneCarname = val.carName;
      this.oneCreated_time = val.created_time;
      this.onePic = val.pic;
    }
  },

  created() {
    this.checkopenid(request);
    this.projectId = parseInt(this.$getCookie("project_id"));
    var openId = this.$getCookie("openid");
    this.$setCookie("access_token", this.$getQueryString("token"));
    this.openId = openId;
  },

  beforeDestroy() {
    clearInterval(this.timer);
  }
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
.van-cell__title {
  font-size: 16px;
}
</style>