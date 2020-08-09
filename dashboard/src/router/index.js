import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardHome from '../views/Dashboard/Home.vue'
import QuestionsView from '../views/Dashboard/QuestionsView.vue'
import QuestionBank from '../views/Dashboard/QuestionBank.vue'
import Answers from '../views/Dashboard/Answers.vue'
import UserView from '../views/Dashboard/UsersView.vue'
import UserList from '../views/Dashboard/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Home',
        component: DashboardHome
      },
      {
        path: 'question-bank',
        component: QuestionsView,
        children: [
          {
            path: '',
            name: 'Question Bank',
            component: QuestionBank
          },
          {
            path: 'new-answers',
            name: 'Create Answers',
            component: Answers
          }
        ]
      },
      {
        path: 'users',
        component: UserView,
        children: [
          {
            path: '',
            name: 'User List',
            component: UserList
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const openRoutes = ['login']

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    if (!Vue.prototype.$session.get('token')) {
      next()
    } else {
      next('/dashboard')
    }
  } else if (Vue.prototype.$session.get('token')) {
    next()
  } else {
    next('/login')
  }
})

export default router
