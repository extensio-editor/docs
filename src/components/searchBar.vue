<template>
  <div
    class="flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:justify-center"
  >
    <input
      type="text"
      placeholder="Search"
      class="w-full h p-3 rounded-lg bg-backgroundAccent"
      @keyup.self.enter="initializeSearch"
      id="searchBar"
    />
    <div
      class="w-full text-center text-backgroundAccent bg-foreground rounded-lg p-3 cursor-pointer sm:w-1/6 sm:!mt-0"
      @click="initializeSearch"
    >
      Go
    </div>
  </div>
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
