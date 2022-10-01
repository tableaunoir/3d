const initialfullURL = document.location.href;
const pureURL = initialfullURL.indexOf("?") > 0 ? initialfullURL.substring(0, initialfullURL.indexOf("?")) : initialfullURL;
function load() {
  const url = new URL(document.location.href);
  const params = url.searchParams;
  const com = decodeURIComponent(params.get('data'));
  code.value = LZString.decompressFromBase64(com);
}

load();


function pt(x, y, z) {
  push();
  translate(x, y, z);
  sphere(0.1)
  pop();
}

function bg(color) {
  background(color);
}

function tr(x, y, z) {
  translate(x, y, z);
}

function pts(points) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    pt(point[0], point[1], point[2]);
  }
}

function chain(points) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    pt(point[0], point[1], point[2]);
    if (i < points.length - 1)
      line(point[0], point[1], point[2], points[i + 1][0], points[i + 1][1], points[i + 1][2]);
  }
}


function grid2d(dx, dy) {
  for (let x = 0; x < dx; x++)
    for (let y = 0; y < dy; y++)
      pt(x, y);
}

function setup() {
  const canvas = createCanvas(1024, 768, WEBGL).elt;
  wrapper.appendChild(canvas);
  normalMaterial();
}

function draw() {
  try {
    error.hidden = true;
    background("white")
    stroke('black');
    const sensivityRotation = 5;
    const sensivityZoom = 0.1;
    orbitControl(sensivityRotation, sensivityRotation, sensivityZoom);

    scale(50);
    strokeWeight(1);

    eval(code.value);
  }
  catch (e) {
    error.hidden = false;
    error.innerHTML = e;
  }
}


code.onkeyup = () => {
  const com = LZString.compressToBase64(code.value);
  const encodecom = encodeURIComponent(com);
  console.log(com)
  console.log(encodecom)
  const newUrl = pureURL + "?data=" + encodecom;
  history.pushState({}, null, newUrl);
}