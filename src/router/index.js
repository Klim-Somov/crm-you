import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home-vue.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/Login-vue.vue"),
  },
  {
    path: "/register",
    name: "Register-vue",
    meta: { layout: "empty" },
    component: () => import("../views/Register-vue.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories-vue.vue"),
  },
  {
    path: "/Detail-record/:id",
    name: "Detail-record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Detail-record.vue"),
  },
  {
    path: "/History-vue",
    name: "History-vue",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History-vue.vue"),
  },

  {
    path: "/Planing",
    name: "Planing-vue",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planing-vue.vue"),
  },
  {
    path: "/Profile",
    name: "Profile-vue",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile-vue.vue"),
  },
  {
    path: "/New-record",
    name: "New-record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/New-record.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
