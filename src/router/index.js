import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../components/ContactList")
    },
    {
      path: "/tambah",
      name: "Tambah",
      component: () => import("../components/CreateContact")
    },
    {
      path: "/edit/:id",
      name: 'Edit',
      component: () => import("../components/EditContact.vue")
    }
  ]
});