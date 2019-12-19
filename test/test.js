/* eslint-env mocha */
const assert = require("assert");
const {createSVG} = require("..");
const validator = require("html-validator");

const CASES = [
  {
    name: "example in tetris-fumen",
    data: "v115@vhGRQYHAvItJEJmhCAUGJKJJvMJTNJGBJFKYPAUEzP?EJG98AQmqhECDdCA"
  },
  {
    name: "hambuger",
    data: "m115@RhBtIeBtQeAgHAhG8DeF8CeG8CeG8JeAAAvhBFlBkf?BsgG8DeF8CeG8neAAAvhCFbBJkBAAA"
  },
  {
    name: "fin TSD",
    data: "v115@0gC8GeA8HeB8HeB8BeH8AeG8JeAgH0giHGegHveAAA?vhClgfNqBAAA"
  },
  {
    name: "cleared line should be lighten",
    data: "v115@bhD8BeD8JeTLJ",
    test: svg => {
      assert(svg.includes("tXl"));
    }
  }
];

describe("createSVG", () => {
  for (const c of CASES) {
    it(c.name, async () => {
      const svg = createSVG({data: c.data});
      await validateSVG(svg);
      checkDuplicatedComment(svg);
      if (c.test) {
        await c.test(svg);
      }
    });
  }
});

function checkDuplicatedComment(svg) {
  const rx = /[^<>]+<\/text>/g;
  const found = new Set;
  let match;
  while ((match = rx.exec(svg))) {
    if (found.has(match[0])) {
      throw new Error(`Found duplicated text: ${match[0]}`);
    }
    found.add(match[0]);
  }
}

async function validateSVG(svg) {
  const result = await validator({
    data: svg,
    headers: {
      "Content-Type": "image/svg+xml"
    }
  });
  const {messages} = JSON.parse(result);
  if (messages.length > 1 || messages.some(m => m.type !== "info")) {
    console.log(messages); // eslint-disable-line no-console
    throw new Error("Validation failed");
  }
}
