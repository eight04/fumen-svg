fumen-svg
==============================

[![Build Status](https://travis-ci.org/eight04/fumen-svg.svg?branch=master)](https://travis-ci.org/eight04/fumen-svg)
[![codecov](https://codecov.io/gh/eight04/fumen-svg/branch/master/graph/badge.svg)](https://codecov.io/gh/eight04/fumen-svg)
[![install size](https://packagephobia.now.sh/badge?p=fumen-svg)](https://packagephobia.now.sh/result?p=fumen-svg)

Convert fumen data into animated SVG.

Installation
------------

```
npm install -D fumen-svg
```

Usage
-----

```js
const {createSVG} = require("fumen-svg");

const output = createSVG({
  data: FUMEN_DATA
});

// save to the disk
const fs = require("fs");
fs.writeFileSync("animated.svg", output);
```

API
----

This module exports folling members:

* `createSVG`

### createSVG

```js
createSVG({
  data: String,
  index?: Number,
  delay?: Number = 500,
  size?: Number = 16
}) => output: String
```

`data` is the fumen data.

If `index` is specified, create an SVG of the specified frame instead of an animated image.

`delay` controls the delay between each frame. Unit: ms.

`size` is the width/height of a single tile. Unit: px.

Changelog
---------

* 0.1.0 (Aug 5, 2018)

  - Initial release.
