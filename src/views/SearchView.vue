<template>
  <h1>Search page</h1>
  <searchBar />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import searchBar from "@/components/searchBar.vue";

export default defineComponent({
  name: "SearchView",
  components: {
    searchBar,
  },
});
</script>
