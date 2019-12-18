/* eslint-env mocha */
const {createSVG} = require("..");

describe("createSVG", () => {
  it("example in tetris-fumen", () => {
    const data = "v115@vhGRQYHAvItJEJmhCAUGJKJJvMJTNJGBJFKYPAUEzP?EJG98AQmqhECDdCA";
    const svg = createSVG({data});
  });
});
