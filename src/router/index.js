import { createRouter, createWebHashHistory } from "vue-router";
import CronogramaView from "@/views/CronogramaView.vue";
import ModifyScheduleView from "@/views/ModifyScheduleView.vue";
import ConfigView from "@/views/ConfigView.vue";
import ModifyTimerView from "@/views/ModifyTimerView.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: CronogramaView,
  },
  {
    path: "/cronograma",
    name: "cronograma",
    component: CronogramaView,
  },
  {
    path: "/mis-temporizadores",
    name: "mis-temporizadores",
    component: ModifyTimerView,
  },
  {
    path: "/mis-cronogramas",
    name: "mis-cronogramas",
    component: ModifyScheduleView,
  },
  {
    path: "/configuracion",
    name: "config",
    component: ConfigView,
  },
  {
    path: "/about",
    name: "about",
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

export default router;
