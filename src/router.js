import Vue from 'vue'
import Router from 'vue-router'
import PhotoPage from './views/PhotoPage/index.vue'
import Page from './views/Frame/index'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Page,
      redirect: {
        name: 'PhotoPage'
      },
      children: [{
          path: '/PhotoPage',
          name: 'PhotoPage',
          component: PhotoPage,
        },
        // {
        //   path: '/analysis',
        //   name: 'analysis',
        //   component: () => import('./views/Analysis/index.vue'),
        // },
        {
          path: '/facereport',
          name: 'facereport',
          component: () => import('./views/FaceReport/index.vue')
        },
      ]
    },
  ]
})