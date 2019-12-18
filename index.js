const {decoder} = require("tetris-fumen");
const escape = require("escape-html");

const tiles = {
  _: "#000",
  X: "#999",
  Xl: "#ccc",
  I: "#099",
  Il: "#0ff",
  L: "#960",
  Ll: "#f90",
  O: "#990",
  Ol: "#ff0",
  Z: "#c33",
  Zl: "#f00",
  T: "#909",
  Tl: "#f0f",
  J: "#00b",
  Jl: "#00f",
  S: "#090",
  Sl: "#0f0"
};

function pageToFrame(page) {
  const field = page.field.copy();
  field.fill(page.operation);
  const output = Array(200);
  
  // extract field data
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      output[y * 10 + x] = {
        type: field.at(x, y),
        light: false
      };
    }
  }
  
  // FIXME: make the current operation lighter
  // https://github.com/knewjade/tetris-fumen/issues/1
  
  // FIXME: only lighten lines that's related to the operation pieces
  for (let y = 0; y < 20; y++) {
    if (isLineFilled(field, y)) {
      for (let x = 0; x < 10; x++) {
        output[y * 10 + x].light = true;
      }
    }
  }
  return output;
}

function isLineFilled(field, y) {
  for (let x = 0; x < 10; x++) {
    if (field.at(x, y) === "_") {
      return false;
    }
  }
  return true;
}

function createSVG({
  data,
  pages = decoder.decode(data),
  index,
  delay = 500,
  size = 16,
  commentSize = 16
}) {
  if (index != null) {
    pages = pages.slice(index, index + 1);
  }
  const frames = pages.map(pageToFrame);
  const commentHeight = commentSize * 1.6;
  const commentOffset = commentSize * 1.2;
  const commentY = size * 20;
  const width = size * 10;
  const height = size * 20 + commentHeight; // comment box;
  
  // diff frames
  for (let i = frames.length - 1; i >= 1; i--) {
    for (let j = 0; j < frames[i].length; j++) {
      if (isTileEqual(frames[i - 1][j], frames[i][j])) {
        frames[i][j] = null;
      }
    }
  }
  
  const layers = [];
  const usedTiles = new Set;
  for (let i = 0; i < frames.length; i++) {
    const layer = createLayer(frames[i], size);
    for (const t of layer.used) {
      usedTiles.add(t);
    }
    layers.push(`
      <svg viewBox="0 0 ${width} ${height}">
        ${layer.tiles.join("")}
        ${createComment(pages[i].comment, width, commentHeight, commentY, commentSize, commentOffset)}
        ${createAnimate(i, frames.length, delay)}
      </svg>`);
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="font-family: sans-serif">
      <defs>${createDefs(usedTiles, size)}</defs>
      ${layers.join("")}
      ${createProgress(frames.length, width, delay)}
    </svg>`;
}

function createProgress(total, width, delay) {
  if (total === 1) {
    return "";
  }
  return `
    <path d="M 0,0 H${width}" stroke="silver" stroke-width="${width / 50}" stroke-dasharray="${width}">
      <animate attributeName="stroke-dashoffset" values="${createValues()}" calcMode="discrete" dur="${total * delay}ms" repeatCount="indefinite"/>
    </path>`;
  
  function createValues() {
    const values = [];
    for (let i = 0; i < total; i++) {
      values.push((total - i - 1) / total * width);
    }
    return values.join(";");
  }
}

function createComment(text, width, height, y, size, offset) {
  if (!text) {
    return "";
  }
  return `
    <rect fill="grey" y="${y}" width="${width}" height="${height}"/>
    <text x="${width / 2}" y="${y + offset}" text-anchor="middle" font-size="${size}" fill="white">${escape(text)}</text>`;
}

function createAnimate(i, total, delay) {
  if (i === 0) {
    return "";
  }
  return `<animate attributeName="display" values="none;inline" calcMode="discrete" keyTimes="0;${i/total}" dur="${delay * total}ms" repeatCount="indefinite" />`;
}

function createDefs(include, size) {
  const els = [];
  for (const [name, style] of Object.entries(tiles)) {
    if (!include.has(name)) {
      continue;
    }
    els.push(`<rect id="t${name}" fill="${style}" width="${size}" height="${size}"/>`);
  }
  return els.join("");
}

function createLayer(buffer, size) {
  const tiles = [];
  const used = new Set;
  for (let i = 0; i < buffer.length; i++) {
    if (!buffer[i]) {
      continue;
    }
    const name = `${buffer[i].type}${buffer[i].light ? "l" : ""}`;
    used.add(name);
    const y = Math.floor(i / 10);
    const x = i % 10;
    tiles.push(`<use href="#t${name}" x="${x * size}" y="${(20 - y - 1) * size}"/>`);
  }
  return {
    used,
    tiles
  };
}

function isTileEqual(a, b) {
  return a.type === b.type && a.light === b.light;
}

module.exports = {createSVG};
