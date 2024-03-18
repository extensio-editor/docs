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

      // Notes (block quotes but shh)
      let tmp = parsedData.split("<br />");
      for (let i = 0; i < tmp.length; i++) {
        const line = tmp[i];
        if (line.startsWith(">")) {
          const note = line.split("[~newline~]");
          for (let j = 0; j < note.length; j++) {
            note[j].startsWith("> ")
              ? (note[j] = note[j].slice(2, note[j].length))
              : note[j].slice(1, note[j].length);

            if (j == 0) note[j] = `<b>${note[j]}</b>`;
          }
          tmp[
            i
          ] = `<div class="w-fit p-3 border-l-backgroundAccent border-l-8 bg-backgroundAccent/[.3] rounded-lg">${note.join(
            "<br />"
          )}</div>`;
        }
      }
      parsedData = tmp.join("<br />");

      // Links
      const links = parsedData.matchAll(/[^!]\[([^\]]*)\]\(([^)]*)\)/g);
      let indexOffset = 0;
      tmp = parsedData.split("");
      for (const link of links) {
        const altText = link[1];
        const href = link[2];
        // eslint-disable-next-line
        const index = link.index! + indexOffset;
        const originalLength = link[0].length;
        tmp.splice(index, originalLength - 1);
        console.log(href);
        tmp[index] = `&nbsp;<a ${
          href.includes("https://docs.extensio.xyz/") || href.startsWith("/")
            ? "target=_top"
            : 'target="_blank"'
        } class="underline" href=${href}>${altText}</a>`;
        indexOffset -= originalLength - 1;
      }
      parsedData = tmp.join("");

      return parsedData;
    },
  },
});
</script>
