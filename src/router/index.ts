import { createRouter, createWebHistory } from 'vue-router'
import index from '@/Layout/index.vue'
import loginVue from '@/Login/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',

    },

    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'

      },
      component: () => import('../Login/login.vue')
    },


    {
      path: '/shouye',
      name: 'shouye',
      meta: {
        title: '首页'

      },
      component: () => import('../views/sy.vue')
    },

    {
      path: '/index',
      name: 'index',
      component: () => import('../Layout/index.vue'),

      children: [

        {
          path: '/shouye',
          name: 'shouye',
          meta: {
            title: '首页'

          },
          component: () => import('../views/sy.vue')
        },

        {
          path: '/menu',
          name: 'menu',
          meta: {
            title: '菜单管理'

          },
          component: () => import('../views/menu/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '用户管理'

          },
          component: () => import('../views/SystemGl/usergl.vue')
        },

        {
          path: '/role',
          name: 'role',
          meta: {
            title: '角色管理'

          },
          component: () => import('../views/SystemGl/rolegl.vue')
        },

        {
          path: '/icon',
          name: 'icon',
          meta: {
            title: '图标生成'

          },
          component: () => import('../views/other/icontool.vue')
        },

        {
          path: '/code',
          name: 'code',
          meta: {
            title: '二维码生成'

          },
          component: () => import('../views/qrcode/twocode.vue')
        },




      ]




    }

    ,

  ]
})

export default router
