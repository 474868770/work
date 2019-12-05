<template>
  <div>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <p slot="content" style="font-size:14px;margin:5px;">是否归还安全帽</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="6">
        <div class="flex-demo">
          <van-radio-group v-model="radio1">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="1">已归还</van-radio>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="2">未归还</van-radio>
                </div>
              </flexbox-item>
            </flexbox>
          </van-radio-group>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <p slot="content" style="font-size:14px;margin:5px;">是否注销卡</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="6">
        <div class="flex-demo">
          <van-radio-group v-model="radio2">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="1">已注销</van-radio>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="2">未注销</van-radio>
                </div>
              </flexbox-item>
            </flexbox>
          </van-radio-group>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <p slot="content" style="font-size:14px;margin:5px;">是否归还资料</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="6">
        <div class="flex-demo">
          <van-radio-group v-model="radio3">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="1">已归还</van-radio>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="2">未归还</van-radio>
                </div>
              </flexbox-item>
            </flexbox>
          </van-radio-group>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <p slot="content" style="font-size:14px;margin:5px;">是否完成交接</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="6">
        <div class="flex-demo">
          <van-radio-group v-model="radio4">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="1">已交接</van-radio>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="2">未交接</van-radio>
                </div>
              </flexbox-item>
            </flexbox>
          </van-radio-group>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <p slot="content" style="font-size:14px;margin:5px;">开除原因</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="9">
        <div class="flex-demo">
          <van-radio-group v-model="radio5">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="1">技术能力不足</van-radio>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <van-radio name="2">出勤率不足</van-radio>
                </div>
              </flexbox-item>
            </flexbox>
          </van-radio-group>
        </div>
      </flexbox-item>
    </flexbox>
    <group>
      <x-textarea
        :title="('备注')"
        :max="200"
        :placeholder="('请输入备注信息')"
        :show-counter="false"
        :height="200"
        :rows="8"
        :cols="30"
        v-model="beizhu"
      ></x-textarea>
    </group>
    <van-button type="info" style="margin:10px;" @click="define">确定</van-button>
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
  Flexbox,
  FlexboxItem
} from "vux";
import request from "../util/request";
import util from "../util/util.js";

export default {
  name: "chizi",
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
    Flexbox,
    FlexboxItem
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
      checked: true,
      checked1: true,
      radio1: "1",
      radio2: "1",
      radio3: "1",
      radio4: "1",
      radio5: "1",
      beizhu: ""
    };
  },

  props: ["mUsername", "mUserid", "mProject_id", "mStatus"],

  methods: {
    define() {
      console.log(this.mStatus);
      request({
        url: "http://w.yidebim.com:3002/api/info/user",
        method: "post",
        data: {
            method: "quit_left",
            project_id: this.mProject_id,
            idcard_no: this.mUserid,
            name: this.mUsername,
            status: this.mStatus,
            cancel_card: this.radio1,
            return_datum: this.radio2,
            turn_over: this.radio3,
            return_safety_helmet: this.radio4,
            score: "5",
            resume_reason: this.radio5,
            remark: this.beizhu
        }
      }).then(res => {
        if (res.status == "success") {
          alert("确认成功");
          window.location.reload();
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