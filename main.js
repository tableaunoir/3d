const initialfullURL = document.location.href;
const pureURL = initialfullURL.indexOf("?") > 0 ? initialfullURL.substring(0, initialfullURL.indexOf("?")) : initialfullURL;

/**
 * load the code of the image from the URL
 */
function load() {
  const url = new URL(document.location.href);
  const params = url.searchParams;
  const com = decodeURIComponent(params.get('data'));
  code.value = LZString.decompressFromBase64(com);
}

load();

/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z
 * @description draw a point 
 */
function pt(x, y, z) {
  push();
  translate(x, y, z);
  sphere(0.05)
  pop();
}

/**
 * 
 * @param {*} color
 * @description change background color 
 */
function bg(color) {
  background(color);
}


function tr(x, y, z) {
  translate(x, y, z);
}


/**
 * 
 * @param {*} points an array of points, e.g. [[0, 0, 0], [1, 0, 0], [1, 1, 0]]
 * @description draw all the points
 */
function pts(points) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    pt(point[0], point[1], point[2]);
  }
}




function pl(points) {
  for (let i = 0; i < points.length - 1; i++) {
    const point = points[i];
    line(point[0], point[1], point[2], points[i + 1][0], points[i + 1][1], points[i + 1][2]);
  }
}


/**
 * 
 * @param {*} points an array of points, e.g. [[0, 0, 0], [1, 0, 0], [1, 1, 0]]
 * @description draw all the points + the polyline
 */
function chain(points) {
  pts(points);
  pl(points);
}

/**
 * 
 * @param {*} dx 
 * @param {*} dy
 * @description draw a grid of points 
 */
function grid2d(dx, dy) {
  for (let x = 0; x < dx; x++)
    for (let y = 0; y < dy; y++)
      pt(x, y);
}


/**
 * @description processing.js setup
 */
function setup() {
  const canvas = createCanvas(1024, 768, WEBGL).elt;
  wrapper.appendChild(canvas);
  normalMaterial();
}


/**
 * @description processing.js draw
 */
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

/**
 * @description when the code is changed, we change the URL
 */
code.onkeyup = () => {
  const com = LZString.compressToBase64(code.value);
  const encodecom = encodeURIComponent(com);
  const newUrl = pureURL + "?data=" + encodecom;
  history.pushState({}, null, newUrl);
}