<template>
  <div class="about">
    <div>{{ docData }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default defineComponent({
  name: "DocView",
  data() {
    return {
      docName: "",
      docData: "",
    };
  },
  beforeRouteEnter(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    next((vm) => {
      console.log(`attempting to load doc for ${to.params.name}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vm as any).docName = to.params.name || "";

      fetch(`/raw/${to.params.name}.md`)
        .then((result) => {
          const data = result.text();

          return data;
        })
        .then((data) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (vm as any).docData = data;
        });
    });
  },
});
</script>
