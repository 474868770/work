<template>
  <div id="app">
      <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}

.clearfix:after {
  content: "\200B";
  display: block;
  height: 0;
  clear: both;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>
