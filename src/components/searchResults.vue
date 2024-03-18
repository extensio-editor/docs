<template>
  <div v-if="JSON.stringify(results) === '[]'">
    <h1>Searching...</h1>
  </div>
  <div class="flex flex-col" v-if="JSON.stringify(results) !== '[]'">
    <div
      v-for="result in results"
      :key="result.name"
      class="bg-backgroundAccent p-5 w-fit rounded-lg"
    >
      <a :href="`/#${result.path}`" class="flex flex-col">
        <span class="text-lg font-bold">{{ result.name }}</span>
        <span class="text-xs text-opacity-50"
          >{{ Math.round((1 - result.distance) * 100) }}% match</span
        >
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

interface searchResult {
  name: string;
  distance: number;
  path: string;
}

export default defineComponent({
  props: {
    results: {
      type: Object as PropType<searchResult[]>,
      required: true,
    },
  },
});
</script>
