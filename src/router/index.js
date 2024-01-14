import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ServiceView from "@/views/ServiceView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NutzerbedingungenView from "@/views/NutzerbedingungenView.vue";
import AdminServiceView from "@/views/AdminServiceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/service',
      name: 'service',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ServiceView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/nutzerbedingungen',
      name: 'nutzerbedingungen',
      component: NutzerbedingungenView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminServiceView
    }
  ]
})

export default router
