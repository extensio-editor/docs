<template>
  <input
    type="text"
    placeholder="Search"
    class="w-full p-3 rounded-lg bg-backgroundAccent"
    @keyup.self.enter="initializeSearch"
    id="searchBar"
  />
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    initializeSearch() {
      console.log(
        `starting search for ${
          (document.getElementById("searchBar") as HTMLInputElement)
            .value as string
        }`
      );
      router.push({
        path: `/search/${
          (document.getElementById("searchBar") as HTMLInputElement)
            .value as string
        }`,
      });
    },
  },
});
</script>
