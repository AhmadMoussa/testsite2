/*

  Kandinskomorphism

  Yet another exploration that began as an entry to @sableRaph's weekly creative coding challenge! This time around the chosen topic was "Kandisky". I spent some time studying the reocurring shapes in Kandinsky's artworks, with the main inspiration being his 1993 work 'Schnittlinien', and attempted to recreate those with code.

  Press 'S' to save your token as a PNG file.

*/

const sW = 8 // Overall strokeWeight

const debug = false // :-) shows the invisible line elements are placed on

const randSeed = fxrand() * 999999
const noiSeed = fxrand() * 999999

const WID_MOD = 1.2
const HEI_MOD = 1.5

const PG_SIZE = 1080

const PG_WID = PG_SIZE * WID_MOD
const PG_HEI = PG_SIZE * HEI_MOD

const pad = PG_SIZE/10

let firstRun = true

let positionArr = []

let pg;

function setup() {
  randomSeed(randSeed)
  noiseSeed(noiSeed)

  // let aspectRat = windowWidth/windowHeight
  // console.log(aspectRat)
  // if(aspectRat>0){
  //   widMod = aspectRat
  //   heiMod = 1
  // }else{
  //   widMod = 1
  //   heiMod = 1+aspectRat
  // }

  let w = min(windowWidth, windowHeight)
  wx = w * WID_MOD
  wy = w * HEI_MOD

  createCanvas(wx, wy);
  pixelDensity(2)

  pg = createGraphics(PG_WID, PG_HEI)
  pg.pixelDensity(2)

  ctx = pg.canvas.getContext('2d')

  strokeJoin(ROUND)
  blendMode(BLEND)

  pg.strokeJoin(ROUND)
  pg.blendMode(BLEND)

  colorObj = random(colorObjects)
  backgroundColor = random(colorObj.backgroundColors)
  highlightPalette = colorObj.highlightPalette

  // draw the graphics to the graphics buffer
  makeSketch()

  window.$fxhashFeatures = {
  "PALETTE": colorObj.name
  }

}
