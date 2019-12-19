fumen-svg
==============================

[![Build Status](https://travis-ci.org/eight04/fumen-svg.svg?branch=master)](https://travis-ci.org/eight04/fumen-svg)
[![codecov](https://codecov.io/gh/eight04/fumen-svg/branch/master/graph/badge.svg)](https://codecov.io/gh/eight04/fumen-svg)
[![install size](https://packagephobia.now.sh/badge?p=fumen-svg)](https://packagephobia.now.sh/result?p=fumen-svg)

Convert fumen data into animated SVG.

![example](https://raw.githack.com/eight04/fumen-svg/master/example.svg)

Installation
------------

```
npm install fumen-svg
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

This module exports following members:

* `createSVG`

### createSVG

```js
createSVG({
  data: String,
  index?: Number,
  delay?: Number,
  size?: Number,
  comment?: String
}) => output: String
```

`data` is the fumen data.

If `index` is specified, create an SVG of the specified frame instead of an animated image.

`delay` controls the delay between each frame. Unit: ms. Default: `500`.

`size` is the width/height of a single tile. Unit: px. Default: `16`.

Use `comment` to control whether to draw the comment box. Available values:

* `"always"` - always draw the comment box.
* `"none"` - don't draw the comment box.
* `"auto"` (default) - draw the comment box if there is a comment.

Changelog
---------

* 0.1.4 (Dec 19, 2019)

  - Fix: lines to be cleared should be lighten.

* 0.1.3 (Dec 19, 2019)

  - Fix: draw background before minos.
  - Fix: can't fill piece error.
  - Fix: images height is not an integer.
  - Fix: remove duplicated comment.
  - Add: grid to background.

* 0.1.2 (Dec 19, 2019)

  - Add: `comment` option.

* 0.1.1 (Dec 19, 2019)

  - Fix: deps.

* 0.1.0 (Dec 19, 2019)

  - Initial release.
