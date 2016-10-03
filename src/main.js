// src/main.js

import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Project from './components/Project.vue'
import Table from './components/Table.vue'
import Column from './components/Column.vue'
import Index from './components/Index.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8081'

const router = new VueRouter({
  // Pointing routes to the components they should use
  routes: [
    {path: '/home', component: Home},
    {
      path: '/project',
      component: Project,
      children: [
        {
          path: '/table',
          component: Table,
          children: [
            {
              path: '/column',
              component: Column
            },
            {
              path: '/index',
              component: Index
            }
          ]
        }
      ]
    },
    // Any invalid route will redirect to home
    {path: '*', redirect: '/home'}
  ]
})

var app = new Vue({
  el: '#app',
  router,
  // template: App
  render: h => h(App)
})
console.log(app)
// router.start(App, '#app')
