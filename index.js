function draw() {
  image(pg, 0, 0, wx, wy)
  noLoop()
}

function makeSketch(){
  pg.background(backgroundColor)
  pg.strokeWeight(sW)

  underneathShapes()
  mainShapes()
  makeParticlesEverywhere()

  positioner()

  afterShapes()
  tryDrawItem()

  granulate_random(20)

  if(firstRun){
    fxpreview()
    firstRun = false
  }
}

function windowResized(){
  let w = min(windowWidth, windowHeight)
  wx = w * WID_MOD
  wy = w * HEI_MOD

  resizeCanvas(wx, wy)
}
