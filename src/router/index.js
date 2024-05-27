import { createRouter, createWebHashHistory } from "vue-router";
import CronogramaView from "@/views/CronogramaView.vue";
import ModifyScheduleView from "@/views/ModifyScheduleView.vue";
import ConfigView from "@/views/ConfigView.vue";
import ModifyTimerView from "@/views/ModifyTimerView.vue";
import AuthView from "@/views/AuthView.vue";
import { useSessionStore } from '@/stores/session';

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
    meta: {
      requireAuth: false
    }
  },
  {
    path: "",
    name: "home",
    component: CronogramaView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/cronograma",
    name: "cronograma",
    component: CronogramaView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/mis-temporizadores",
    name: "mis-temporizadores",
    component: ModifyTimerView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/mis-cronogramas",
    name: "mis-cronogramas",
    component: ModifyScheduleView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/configuracion",
    name: "config",
    component: ConfigView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    meta: {
      requireAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useSessionStore().token != null;
  const needAuth = to.meta.requireAuth;
  if (needAuth && !auth) {
    console.log("no autorizado")
    next('auth');
  } else {
    console.log("autorizado")
    next();
  }
})

export default router;
