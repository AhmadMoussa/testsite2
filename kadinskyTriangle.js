function makeKadinskyTriangle(posx,posy,size){
  pg.push()
  pg.strokeWeight(sW / 2)
  pg.translate(posx,posy)
  pg.rotate(random(TAU))

  let vertices = []
  let vertices2 = []
  for(let a = 0; a < TAU; a+=TAU/3){
    let x = (size+random(-50,50))*cos(a+random(-0.1,0.1))
    let y = (size+random(-50,50))*sin(a+random(-0.1,0.1))

    x = constrain(posx+x,pad,PG_WID-pad)-posx
    y = constrain(posy+y,pad,PG_HEI-pad)-posy
    vertices.push({x: x, y: y})
    vertices2.push({x: x*0.9, y: y*0.9})
  }

  customShape(vertices, color(0,0,0,0) )

  customShape(vertices2, color(0,0,0,0), 1, random(highlightPalette))

  pg.pop()
}
