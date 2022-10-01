const initialfullURL = document.location.href;
const pureURL = initialfullURL.indexOf("?") > 0 ? initialfullURL.substring(0, initialfullURL.indexOf("?")) : initialfullURL;
function load() {
  const url = new URL(document.location.href);
  const params = url.searchParams;
  const com = params.get('data');
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


function setup() {
  createCanvas(1024, 768, WEBGL);
  normalMaterial();
}

function draw() {
  try {
    background("white")
    stroke('black');
    scale(50);
    strokeWeight(2);

    orbitControl();
      eval(code.value);
  }
  catch (e) {
    console.log(e)
  }
}


code.onkeyup = () => {
  const com = LZString.compressToBase64(code.value);

  const newUrl = pureURL + "?data=" + com;
  history.pushState({}, null, newUrl);



}