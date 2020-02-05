import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/mycv",
      name: "mycv",
      component: () => import("./views/MyCV.vue")
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/Guide.vue")
    },
    {
      path: "/cvtips",
      name: "cvtips",
      component: () => import("./views/CVtips.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("./views/Feedback.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Admin.vue")
    }
  ]
});
