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

#����
npm i @nutui/nutui -S



$.ajax({
    url:'/comm/test1.php',
    type:'POST', //GET
    async:false,    //��false,�Ƿ��첽
    data:{
        name:'yang',age:25
    },
    timeout:5000,    //��ʱʱ��
    dataType:'json',    //���ص����ݸ�ʽ��
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
�� build/webpack.base.conf �����ļ� 
resolve:{
 alias:{
  'jquery':'jquery',
  'jquery':resolve('/node_modules/jquery/src/jquery')

plugins:[
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:"jquery"
      })
�����������Ҫ�ĵط�import $ from 'jquery';