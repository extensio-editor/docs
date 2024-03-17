<template>
  <div class="document">
    <mdRenderer :doc-data="docData" />
  </div>
</template>

<style>
h1 {
  font-weight: bold !important;
  font-size: xx-large !important;
}

h2 {
  font-weight: bold !important;
  font-size: x-large !important;
}

h3 {
  font-weight: bold !important;
  font-size: large !important;
}

h4 {
  font-weight: normal !important;
  font-size: large !important;
}

h5 {
  font-weight: bold !important;
  font-size: medium !important;
}

h6 {
  font-weight: normal !important;
  font-size: medium !important;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import mdRenderer from "@/components/mdRenderer.vue";

export default defineComponent({
  name: "DocView",
  components: {
    mdRenderer,
  },
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

      fetch(`/raw/${to.params.name}.md`, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then(async (result) => {
          const data = await result.text();
          return data;
        })
        .then((data) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (vm as any).docData = data.split(/\r?\n/).join("[~newline~]");
        });
    });
  },
});
</script>
