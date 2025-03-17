<template>
  <div id="doc" v-html="parse(docData!)"></div>
</template>

<script lang="tsx">
import { defineComponent } from "vue";
import syntaxHighlight from "@extensio/html-syntax-highlighting";

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

      // Code blocks
      const codeBlocks = [
        ...parsedData.matchAll(/```(.*?)\[~newline~\](.*?)\[~newline~\]```/gs),
      ];

      let tmp_ = parsedData;
      let temp = parsedData;
      for (const codeBlock of codeBlocks) {
        const code = codeBlock[2]
          .replaceAll("<br />", "\n")
          .replaceAll("[~newline~]", "\n");

        const id =
          Date.now().toString(36) + Math.random().toString(36).substr(2);

        let highlighted = `<div class="code" id="${id}"><span class="linenr">1&nbsp</span>&nbsp${syntaxHighlight(
          code,
          {
            language: codeBlock[1],
            useBreaks: true,
          }
        )}</div>`;

        let i = 1;
        const getLineNumber = () => {
          i = i + 1;
          return i;
        };

        highlighted = highlighted.replaceAll(
          "<br>",
          () => `<br><span class="linenr">${getLineNumber()}&nbsp;</span>&nbsp`
        );

        tmp_ = tmp_.replace(codeBlock[0], highlighted);

        const items = document.createElement("div");
        items.innerHTML = tmp_;
        const lineNrItems = items
          .querySelector(`#${id}`)!
          .querySelectorAll(".linenr");
        const lastItemLength = (
          lineNrItems[lineNrItems.length - 1] as HTMLSpanElement
        ).innerText.length;

        lineNrItems.forEach((lineNrItem) => {
          lineNrItem.innerHTML = `${(
            lineNrItem as HTMLSpanElement
          ).innerText.padStart(lastItemLength, "0")}&nbsp;`;
        });

        temp = items.innerHTML.toString();
      }

      parsedData = temp;

      // Inline code
      const code = [...parsedData.matchAll(/`(.*?)`/g)];
      code.forEach((item) => {
        parsedData = parsedData.replace(item[0], `<code>${item[1]}</code>`);
      });

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
        const prevChar = tmp[index];
        tmp.splice(index, originalLength - 1);
        tmp[index] = `${prevChar}<a ${
          href.includes("https://docs.extensio.xyz/") || href.startsWith("/")
            ? "target=_top"
            : 'target="_blank"'
        } class="underline" href=${href}>${altText}</a>`;
        indexOffset -= originalLength - 1;
      }
      parsedData = tmp.join("");

      // Images
      const images = parsedData.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g);
      indexOffset = 0;
      tmp = parsedData.split("");
      for (const image of images) {
        const altText = image[1];
        const href = image[2];
        // eslint-disable-next-line
        const index = image.index! + indexOffset;
        const originalLength = image[0].length;
        tmp.splice(index + 1, originalLength - 1);
        tmp[
          index
        ] = `<img class="w-full lg:w-1/3 rounded-lg" alt="${altText}" src=${href} />`;
        indexOffset -= originalLength - 1;
      }
      parsedData = tmp.join("");

      parsedData = parsedData.split("[~newline~]").join("\n");

      return parsedData;
    },
  },
});
</script>

<style>
#doc {
  white-space: pre-line;
}

.code code {
  all: inherit;
}

.code {
  font-family: monospace;
  background-color: #2a1f31;
  border-radius: 5px;
  padding: 10px;
}

.linenr {
  border-right: 1px grey solid;
  height: 100%;
  user-select: none;
}
</style>
