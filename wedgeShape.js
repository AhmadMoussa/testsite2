function makeWedgeShape(posx,posy,size,ang){
  push()
  translate(posx,posy)
  rotate(ang)
  strokeWeight(sW-3)

  size = size/2
  let r1 = size/3
  let r2 = size/3*2

  console.log(r1,r2)
  let maxAng = random(PI/4, PI/2)
  let inc = maxAng/20

  let divs = random([6,7,8,9,10,11,12])
  let step = maxAng/divs

  let vertices = []
  for(let a = -step/2; a < maxAng+step/2; a+=inc){
    let x1 = r2 * cos(a)
    let y1 = r2 * sin(a)

    vertices.push({x: x1, y:y1})
  }

  for(let a = maxAng+step/2; a >-step/2; a-=inc){
    let x1 = r1 * cos(a)
    let y1 = r1 * sin(a)

    vertices.push({x: x1, y:y1})
  }

  //customShape(vertices, backgroundColor, 1, color(0,0,0,0))

  for(let a = step/2; a < maxAng; a+=step){
    let x1 = (r1+20) * cos(a)
    let y1 = (r1+20) * sin(a)

    let x2 = (r2-20) * cos(a)
    let y2 = (r2-20) * sin(a)

    customLine(x1,y1,x2,y2)
  }

  customCircle(0,0,(r1+20)*2,color(0,0,0,0),0,step/2,maxAng-step/2)
  customCircle(0,0,((r1+20)*0.333 + (r2-20)*0.666)*2,color(0,0,0,0),0,step/2,maxAng-step/2)
  customCircle(0,0,((r1+20)*0.666 + (r2-20)*0.333)*2,color(0,0,0,0),0,step/2,maxAng-step/2)
  customCircle(0,0,(r2-20)*2,color(0,0,0,0),0,step/2,maxAng-step/2)


  pop()
}
