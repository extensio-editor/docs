<template>
  <div id="doc" v-html="parse(docData!)"></div>
</template>

<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "mdRenderer",
  props: {
    docData: {
      type: String,
    },
  },
  methods: {
    parse(data: string) {
      let parsedData = data;

      // headers
      let split = parsedData.split("[~newline~]");
      for (let i = 0; i < split.length; i++) {
        const line = split[i];
        if (line[0] == "#") {
          let headerType = 0;
          while (line[headerType] === "#") {
            headerType++;
          }
          split[i] = `${i == 0 ? "" : "<br />"}<h${headerType}>${line.slice(
            headerType + 1,
            line.length
          )}</h${headerType}>`;
        }
      }
      parsedData = split.join("[~newline~]");

      // newlines
      parsedData = parsedData.split("[~newline~][~newline~]").join("<br />");

      // Bold text
      parsedData = parsedData.split("**").join("<b>");
      let charArr = [...parsedData];
      let inBold = false;

      for (let i = 0; i < charArr.length; i++) {
        if (
          charArr[i] === "<" &&
          charArr[i + 1] === "b" &&
          charArr[i + 2] === ">"
        ) {
          if (inBold) {
            charArr[i + 1] = "/b";
          }
          inBold = !inBold;
        }
      }
      parsedData = charArr.join("");

      // Italic text
      parsedData = parsedData.split("*").join("<em>");
      charArr = [...parsedData];
      let inItalic = false;

      for (let i = 0; i < charArr.length; i++) {
        if (
          charArr[i] === "<" &&
          charArr[i + 1] === "e" &&
          charArr[i + 2] === "m" &&
          charArr[i + 3] === ">"
        ) {
          if (inItalic) {
            charArr[i + 1] = "/e";
          }
          inItalic = !inItalic;
        }
      }
      parsedData = charArr.join("");

      return parsedData;
    },
  },
});
</script>
