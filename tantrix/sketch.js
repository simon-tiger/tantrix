let tilesOnBoard;
let playerTiles;
let n;
let scl;
let r;
let hexagons = [];
let tilesPerRow = 0;

function setup() {
  createCanvas(640, 480);
  tiles.splice(56, 3);
  console.log(tiles);
  n = sin(PI / 3);
  scl = 80;
  r = 4;

  let i = 0;
  let off = sqrt(3) * scl;
  for (let sy = -((2 * r - 1) * scl); sy < (2 * r - 1) * scl; sy += 3 * scl / 4) {
    tilesPerRow = 0;
    for (let sx = -((2 * r - 1) * scl); sx < (2 * r - 1) * scl; sx += n * scl) {
      hexagons.push(createVector(sx + ((i % 2 === 0) ? 0 : off/4), sy));
      tilesPerRow++;
    }
    i++;
  }

  tilesOnBoard = new Array(hexagons.length).fill(0);
}

function draw() {
  background(126);
  translate(width/2, height/2);

  let record = Infinity;
  let index = -1;

  hexagons.forEach((hex, i) => {
    let d = dist(hex.x, hex.y, mouseX - width / 2, mouseY - height / 2);

    if (d < record) {
      record = d;
      index = i;
    }
  });

  let hex = hexagons[index];

  stroke(0);
  strokeWeight(1);
  noFill();

  beginShape();

  for (let a = -PI / 2; a < 3 * PI / 2; a += PI / 3) {
    let x = hex.x + scl / 2 * cos(a);
    let y = hex.y + scl / 2 * sin(a);
    vertex(x, y);
  }

  endShape();

  tilesOnBoard.forEach((hex, i) => {
    if (hex) {
      if (hex === 1) {
        fill(200, 255, 200);
      } else {
        stroke(0);
        strokeWeight(1);
        fill(0);
      }

      beginShape();

      for (let a = -PI / 2; a < 3 * PI / 2; a += PI / 3) {
        let x = hexagons[i].x + scl / 2 * cos(a);
        let y = hexagons[i].y + scl / 2 * sin(a);
        vertex(x, y);
      }

      endShape();

      stroke(255, 255, 0);
      strokeWeight(12);
      strokeCap(SQUARE);
      //arc(hexagons[i].x, hexagons[i].y - scl / 2, scl / 2, scl / 2, PI / 6, 5 * PI / 6);
      line(hexagons[i].x - scl / 2 + 6, hexagons[i].y, hexagons[i].x + scl / 2 - 6, hexagons[i].y)
    }
  });
}

function mousePressed() {
  let record = Infinity;
  let index = -1;

  hexagons.forEach((hex, i) => {
    let d = dist(hex.x, hex.y, mouseX - width / 2, mouseY - height / 2);

    if (d < record) {
      record = d;
      index = i;
    }
  });

  tilesOnBoard[index] = 2;

}
