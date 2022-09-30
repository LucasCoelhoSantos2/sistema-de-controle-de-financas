import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'

import SignIn from './components/account/SignIn'
import SignUp from './components/account/SignUp'

import Expenses from './components/expenses/Expenses'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home},
        { path: '/entrar', component: SignIn},
        { path: '/registrar', component: SignUp},
        { path: '/despesas', component: Expenses},
    ]
})
