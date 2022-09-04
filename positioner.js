let funcs = [{
    shape: makeBlob,
    params: [30, 150]
  },
  {
    shape: makeKadinskyArc,
    params: [80, 350]
  },
  {
    shape: makeKadinskyArc,
    params: [80, 350]
  },
  {
    shape: makeKadinskyLine,
    params: [150, 350]
  },
  {
    shape: multipleLines,
    params: [50, 450]
  },
  {
    shape: makeCtulhuEye,
    params: [20, 100]
  },
]

function positioner() {
  let r = dist(PG_WID / 2, PG_HEI / 2, 0, 0)
  let ang = random() * TAU

  let main_circle_x = PG_WID / 2 + r * cos(ang)
  let main_circle_y = PG_HEI / 2 + r * sin(ang)

  //ellipse(main_circle_x,main_circle_y,r*2)

  let circ = {
    radius: r,
    center: {
      x: main_circle_x,
      y: main_circle_y
    }
  }

  let lin1 = {
    p1: {
      x: 0,
      y: 0
    },
    p2: {
      x: PG_WID,
      y: 0
    }
  }

  let lin2 = {
    p1: {
      x: 0,
      y: 0
    },
    p2: {
      x: 0,
      y: PG_HEI
    }
  }

  let lin3 = {
    p1: {
      x: PG_WID,
      y: 0
    },
    p2: {
      x: PG_WID,
      y: PG_HEI
    }
  }

  let lin4 = {
    p1: {
      x: 0,
      y: PG_HEI
    },
    p2: {
      x: PG_WID,
      y: PG_HEI
    }
  }

  let inter1 = inteceptCircleLineSeg(circ, lin1)
  let inter2 = inteceptCircleLineSeg(circ, lin2)
  let inter3 = inteceptCircleLineSeg(circ, lin3)
  let inter4 = inteceptCircleLineSeg(circ, lin4)

  let points = [...inter1, ...inter2, ...inter3, ...inter4]

  ang1 = Math.atan2(points[0].y - main_circle_y,
    points[0].x - main_circle_x)

  ang2 = Math.atan2(points[1].y - main_circle_y, points[1].x - main_circle_x)

  overallAng = ang2 - ang1
  if (overallAng > PI) {
    temp = ang1
    ang1 = ang2
    ang2 = temp

    if (ang1 > ang2) {
      ang1 = ang1 - TAU
    }
  }

  if (overallAng < 0) {
    temp = ang1
    ang1 = ang2
    ang2 = temp

  }
  let divOptions = [5, 6, 7, 8, 9]
  let divs = floor(random() * divOptions.length)
  let step = abs(dist(ang2, 0, ang1, 0) / divs)

  if (step > PI / 4) {
    step = abs((ang1 - ang2) / divs)
  }

  ang1 = ang1 + step
  ang2 = ang2 - step

  for (let a = ang1 + step / 2; a < ang2; a += step) {
    let randOff = map(random(), 0, 1, -r / 4, r / 4)
    let x = main_circle_x + (r + randOff + 40) * cos(a)
    let y = main_circle_y + (r + randOff + 40) * sin(a)


    x = constrain(x, pad, PG_WID - pad)
    y = constrain(y, pad, PG_HEI - pad)
    drawItem(random(funcs), x, y)
  }
}


function drawItem(func, posx, posy) {
  let randSize = map(random(),0,1,...func.params)
  let placeable = true

  for (let n = 0; n < positionArr.length; n++) {
    let currPos = positionArr[n]

    if (dist(currPos[0], currPos[1], posx, posy) < randSize / 3 + currPos[2] / 3) {
      placeable = false
      break
    }
  }

  if (placeable) {
    func.shape(posx, posy, randSize)
    positionArr.push([posx, posy, randSize])
  }

  return placeable
}

function underneathShapes() {
  pg.strokeWeight(sW - 3)
  altBigLine(pad, random(pad, PG_HEI - pad), PG_WID - pad, random(pad, PG_HEI - pad), random(highlightPalette))

  altBigLine(random(pad, PG_WID - pad), random(pad, PG_HEI - pad),
              random(pad, PG_WID - pad), random(pad, PG_HEI - pad), random(highlightPalette))
}

function mainShapes() {

  bSize = random(300, 750)
  posArr = [
    random(pad * 2.5 + bSize / 2, PG_WID - pad * 2.5 - bSize / 2),
    random(pad * 2.5 + bSize / 2, PG_HEI - pad * 2.5 - bSize / 2)
  ]

  makeKadinskyBall(...posArr, bSize)
  positionArr.push([...posArr, bSize / 2])

  posArr = [random(pad, PG_WID - pad), PG_HEI / 2]

  pg.strokeWeight(sW - 3)
  makeBigLine(...posArr, PG_HEI - pad, 0, 1)

  altBigLine(pad, random(pad, PG_HEI - pad), PG_WID - pad, random(pad, PG_HEI - pad), 0)

  pg.push()
  pg.noStroke()
  tSize = random(150, 350)
  posArr = [
    random(pad * 2 + tSize / 2, PG_WID - pad * 2 - tSize / 2),
    random(pad * 2 + tSize / 2, PG_HEI - pad * 2 - tSize / 2)
  ]

  makeKadinskyTriangle(...posArr, tSize)
  positionArr.push([...posArr, tSize])

  tSize = random(250, 650)
  posArr = [
    random(pad * 2 + tSize / 2, PG_WID - pad * 2 - tSize / 2),
    random(pad * 2 + tSize / 2, PG_HEI - pad * 2 - tSize / 2)
  ]
  makeKadinskyTriangle(...posArr, tSize)
  positionArr.push([...posArr, tSize])

  pg.pop()

  makeSlantGrids()

  posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
  makeBigLineBarrage(...posArr, random(150, 500), random([PI, PI / 2]))

}

function afterShapes() {
  posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
  let particleFunc = {
    shape: makeParticles,
    params: [150, 350]
  }
  while (!drawItem(particleFunc, ...posArr)) {
    posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
  }

  posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
  particleFunc = {
    shape: makeParticles,
    params: [150, 350]
  }
  while (!drawItem(particleFunc, ...posArr)) {
    posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
  }
}


function makeSlantGrids() {
  for (let s = 0; s < 2; s++) {
    posArr = [random(pad * 2, PG_WID - pad * 2), random(pad * 2, PG_HEI - pad * 2)]
    let size1 = random(50, 150)
    let size2 = random(50, 150)
    let size = (size1 + size2) / 2
    let placeable = true

    for (let n = 0; n < positionArr.length; n++) {
      let currPos = positionArr[n]

      if (dist(currPos[0], currPos[1], posArr[0], posArr[1]) < size + currPos[2] / 3) {
        placeable = false
        break
      }
    }

    if (placeable) {
      pg.strokeWeight(sW - 4)
      drawSlantGrid(...posArr, size1, size2, random(TAU), 0)

      positionArr.push([...posArr, size * 1.25])
    }
  }
}

function tryDrawItem() {
  for (let k = 0; k < 30; k++) {
    let f = random(funcs)
    let maxSize = f.params[1] / 2
    drawItem(f,
      map(random(), 0, 1, pad + maxSize, PG_WID - pad - maxSize),
      map(random(), 0, 1, pad + maxSize, PG_HEI - pad - maxSize)

    )
  }
}
