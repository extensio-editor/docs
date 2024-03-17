<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocView",
  beforeRouteEnter(to) {
    console.log(`attempting to load doc for ${to.params.name}`);
  },
});
</script>
