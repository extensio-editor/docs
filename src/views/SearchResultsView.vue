<template>
  <a href="/#/search"><span>&lt;- new search</span></a>
  <br />
  <h1>Search results for "{{ query }}"</h1>
  <searchResults :results="results" />
</template>

<script lang="ts">
import searchResults from "@/components/searchResults.vue";
import router from "@/router";
import { defineComponent } from "vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

interface item {
  name: string;
  path: string;
}

export default defineComponent({
  name: "SearchView",
  data() {
    return {
      query: "",
      results: [],
    };
  },
  components: {
    searchResults,
  },
  methods: {
    async search() {
      // Get lookup table
      const lookup = await fetch("/lookup.json");
      const lookupData = await lookup.json();

      // Get all names in lookup table
      const items: item[] = this.getItems(lookupData as never);

      // Determine edit distance for each name
      let editDistances: { name: string; distance: number; path: string }[] =
        [];
      items.forEach((item: item) => {
        return editDistances.push({
          name: item.name,
          distance: this.getEditDistance(this.query, item.name),
          path: item.path,
        });
      });

      this.results = editDistances.sort((a, b) => {
        return a.distance - b.distance;
      }) as never;

      // this.results = editDistances as never;
    },
    getEditDistance(from: string, to: string): number {
      let levenshteinMatrix: number[][] = [];

      for (let i = 0; i < from.length + 1; i++) {
        levenshteinMatrix[i] = [];
        for (let j = 0; j < to.length + 1; j++) {
          levenshteinMatrix[i][j] = 0;
        }
      }

      for (let i = 1; i < from.length + 1; i++) {
        levenshteinMatrix[i][0] = i;
      }

      for (let i = 1; i < to.length + 1; i++) {
        levenshteinMatrix[0][i] = i;
      }

      for (let j = 1; j < to.length + 1; j++) {
        for (let i = 1; i < from.length + 1; i++) {
          let subCost =
            `0${from.toLowerCase()}`[i] === `0${to.toLowerCase()}`[j] ? 0 : 1;

          levenshteinMatrix[i][j] = Math.min(
            levenshteinMatrix[i - 1][j] + 1, // Deletion
            levenshteinMatrix[i][j - 1] + 1, // Insertion
            levenshteinMatrix[i - 1][j - 1] + subCost // Substitutiuon
          );
        }
      }

      let number = levenshteinMatrix[from.length][to.length];

      // Do some modifying to check if it contains the string
      if (
        from.toLowerCase().includes(to.toLowerCase()) ||
        to.toLowerCase().includes(from.toLowerCase())
      ) {
        number = number / 2;
      }

      return number / Math.max(from.length, to.length);
    },
    getItems(data: never) {
      let found: item[] = [];
      Object.keys(data).forEach((key: string) => {
        const element = data[key];
        if (key == "items") {
          found = found.concat(element);
        } else {
          found = found.concat(this.getItems(element));
        }
      });
      return found as item[];
    },
  },
  beforeRouteEnter(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    next((vm) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (vm as any).query = (to.params.q as string).trim() || "";

      if ((to.params.q as string).trim() === "") {
        router.push({ path: "/search" });
      }
    });
  },
  beforeMount() {
    this.search();
  },
});
</script>
