import Vue from 'vue'
import Router from 'vue-router'
import changneirenyuan from '@/components/changneirenyuan'
import more from '@/components/more'
import kaoqin from '@/components/kaoqin'
import userinfo from '@/components/userinfo'
import iot from '@/components/iot'
import phone from '@/components/phone'
import rili from '@/components/rili'
import person from '@/components/person'
import xunjian from '@/components/xunjian'

Vue.use(Router)

export default new Router({
  //mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      name: 'changneirenyuan',
      component: changneirenyuan,
      meta: {
        title: '场内人员'
      }
    }, {
      path: '/changneirenyuan',
      name: 'changneirenyuan',
      component: changneirenyuan,
      meta: {
        title: '场内人员'
      }
    },
    {
      path: '/more',
      name: 'more',
      component: more,
      meta: {
        title: '易正科技登录'
      },
    }, {
      path: '/kaoqin',
      name: 'kaoqin',
      component: kaoqin,
      meta: {
        title: '考勤'
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta: {
        title: '人员信息'
      }
    },
    {
      path: '/network',
      name: 'network',
      component: iot,
      meta: {
        title: '物联网'
      }
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone,
      meta: {
        title: '通讯录'
      }
    },
    {
      path: '/rili',
      name: 'rili',
      component: rili,
      meta: {
        title: 'rili'
      }
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      meta: {
        title: '个人详情'
      }
    },
    {
      path: '/xunjian',
      name: 'xunjian',
      component: xunjian,
      meta: {
        title: '安全巡检记录',
      }
    }
  ]
})
