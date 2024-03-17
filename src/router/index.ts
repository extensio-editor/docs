import DocView from "@/views/DocView.vue";
import SearchResultsView from "@/views/SearchResultsView.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "@/views/SearchView.vue"),
  },
  {
    path: "/search/:q(.*)",
    name: "searchResults",
    component: SearchResultsView,
  },
  {
    path: "/:name(.*)",
    name: "doc",
    component: DocView,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
