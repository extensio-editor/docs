<template>
  <h1>Search results for "{{ query }}"</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default defineComponent({
  name: "SearchView",
  data() {
    return {
      query: "",
    };
  },
  beforeRouteEnter(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    next((vm) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vm as any).query = to.params.q || "";
    });
  },
});
</script>
