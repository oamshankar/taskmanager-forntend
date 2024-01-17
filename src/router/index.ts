import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Signin from "@/views/SigninPage.vue";
import Login from "@/views/LoginPage.vue";
import Home from "@/views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {path: "/",component:Signin},
  {path: "/login",component:Login},
  {path: "/home",component:Home}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
