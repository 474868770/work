# qbb

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#日历
npm i @nutui/nutui -S



$.ajax({
    url:'/comm/test1.php',
    type:'POST', //GET
    async:false,    //或false,是否异步
    data:{
        name:'yang',age:25
    },
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：
    beforeSend:function(xhr){
    },
    success:function(data,textStatus,jqXHR){
    },
    error:function(xhr,textStatus){
    },
    complete:function(){
    }
})
$ npm install jquery --save
打开 build/webpack.base.conf 配置文件 
resolve:{
 alias:{
  'jquery':'jquery',
  'jquery':resolve('/node_modules/jquery/src/jquery')

plugins:[
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:"jquery"
      })
配置完后在需要的地方import $ from 'jquery';