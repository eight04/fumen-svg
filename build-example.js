const fs = require("fs");
const {createSVG} = require(".");
const data = "v115@vhGRQYHAvItJEJmhCAUGJKJJvMJTNJGBJFKYPAUEzP?EJG98AQmqhECDdCA";
fs.writeFileSync("example.svg", createSVG({data}));
