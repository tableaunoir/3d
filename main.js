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
    const sensivityZoom = 0.5;
    orbitControl(sensivityRotation, sensivityRotation, sensivityZoom);

    scale(50);
    strokeWeight(2);

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