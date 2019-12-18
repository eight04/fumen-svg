/* eslint-env mocha */
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
  }
];

describe("createSVG", () => {
  for (const c of CASES) {
    it(c.name, async () => {
      await validateSVG(createSVG({data: c.data}));
    });
  }
});

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
