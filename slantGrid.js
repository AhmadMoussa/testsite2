
function drawSlantGrid(posx,posy,wid, hei,ang,slant){
  let size1 = random(hei/4*3,hei+hei/4)
  let size2 = random(0,hei/4*3)

  let p1 = {x: wid, y:  size1}
  let p2 = {x: wid, y:  -size1}

  let p3 = {x: -wid, y: size2}
  let p4 = {x: -wid, y: -size2}

  pg.push()

  pg.translate(posx,posy)
  pg.rotate(ang)

  if(random()>.5){
    drawLine(p1,p2)
    drawLine(p3,p4)
    drawLine(p1,p3)
    drawLine(p2,p4)
  }


  let segs = random([3,4,5])

  let interps1 = interpolator(p1,p2,segs)
  let interps2 = interpolator(p3,p4,segs)

  let interps3 = interpolator(p1,p3,segs+4)
  let interps4 = interpolator(p2,p4,segs+4)


  let grid = []
  for(let k = 0; k < interps3.length; k++){
    let interInterPs = interpolator(interps3[k], interps4[k], segs)
    drawPoints(interInterPs)

    grid.push(interInterPs)
  }



  for(let k = 0; k< segs+4; k++){
    for(let q = 0; q< segs; q++){
      let vertices = []

      // beginShape()
      // vertex(grid[k][q].x, grid[k][q].y)
      // vertex(grid[k][q+1].x, grid[k][q+1].y)
      // vertex(grid[k+1][q+1].x, grid[k+1][q+1].y)
      // vertex(grid[k+1][q].x, grid[k+1][q].y)
      // endShape(CLOSE)

      vertices.push({x: grid[k][q].x, y: grid[k][q].y})
      vertices.push({x: grid[k][q+1].x, y: grid[k][q+1].y})
      vertices.push({x: grid[k+1][q+1].x, y: grid[k+1][q+1].y})
      vertices.push({x: grid[k+1][q].x, y: grid[k+1][q].y})

      pg.strokeWeight(sW/2)
      pg.stroke(0)
      customShape(vertices, random(highlightPalette))
    }
  }

  pg.pop()
}

function drawLine(p1, p2){
  pg.line(p1.x, p1.y, p2.x, p2.y)
}

function interpolator(p1,p2,segs){
  let step = 1/segs
  let points = []
  for(let l = 0; l < 1.01; l+=step){
    let interx = p1.x*l + p2.x*(1-l)
    let intery = p1.y*l + p2.y*(1-l)

    points.push({x: interx, y: intery})
  }

  return points
}

function drawPoints(ps){
  for(let n = 0; n < ps.length; n++){
    let p = ps[n]
    //point(p.x, p.y)
  }
}
