function makeBigLine(posx,posy,leng,ang,chnc){
  pg.push()
  pg.translate(posx,posy)


  pg.rotate(ang)

  let vertices = []

  let wid = random(5,10)

  vertices.push({x: -wid, y: -leng/2})
  vertices.push({x: wid,  y: -leng/2})
  vertices.push({x: wid,  y: leng/2})
  vertices.push({x: -wid, y: leng/2})

  customShape(vertices, 0, chnc)

  let secondLeng = leng/random(2,6)

  let randTogg = random([-1,1])
  pg.translate(0,secondLeng/2*randTogg)

  vertices = []


  vertices.push({x: -wid/2, y: -secondLeng/2})
  vertices.push({x: wid/2,  y: -secondLeng/2})
  vertices.push({x: wid/2,  y: secondLeng/2})
  vertices.push({x: -wid/2, y: secondLeng/2})

  customShape(vertices,255,chnc)

  pg.translate(0,-secondLeng/2*randTogg)

  // let randomRat = random(1)
  // let randomPos = map(randomRat,0,1,-leng/2, leng/2)
  //
  // let angRot = ang + PI/2
  //
  // let x = 0
  // let y = randomPos

  // strokeWeight(sW - 2)
  // customLine(x-random(20,30), y+random(-10,10),
  //             x+random(20,30), y+random(-10,10))

  if(random()>.85){
    pg.translate(wid*2,0)
    customLine(0,-leng/2,0,leng/2)
  }
  pg.pop()
}

function makeBigLineBarrage(posx, posy, leng, ang){
  pg.push()
  pg.translate(posx,posy)
  pg.rotate(ang)

  makeBigLine(0,0,leng,PI/2, 1)

  pg.translate(0,-50)
  makeBigLine(0,0,leng,PI/2, 1)

  pg.translate(0,100)
  makeBigLine(0,0,leng,PI/2, 1)

  pg.pop()
}

function altBigLine(x1,y1,x2,y2, col){
  let vertices = []

  let wid = random(5,10)

  let ang = atan2(y2 - y1, x2 - x1 )

  console.log(ang)

  vertices.push({x: x1+wid*cos(ang-PI/2), y: y1+wid*sin(ang-PI/2) })
  vertices.push({x: x1+wid*cos(ang+PI/2),  y: y1+wid*sin(ang+PI/2) })
  vertices.push({x: x2+wid*cos(ang+PI/2),  y: y2+wid*sin(ang+PI/2) })
  vertices.push({x: x2+wid*cos(ang-PI/2), y: y2+wid*sin(ang-PI/2) })

  customShape(vertices, col, 1)

  if(col == 0){
    vertices = []

    wid = wid/2


    vertices.push({
        x: x1+wid*cos(ang-PI/2)  ,
        y: y1+wid*sin(ang-PI/2)
      })
    vertices.push({
        x: x1+wid*cos(ang+PI/2) ,
        y: y1+wid*sin(ang+PI/2)
      })
    vertices.push({
        x: x2+wid*cos(ang+PI/2) ,
        y: y2+wid*sin(ang+PI/2)
      })
    vertices.push({
        x: x2+wid*cos(ang-PI/2) ,
        y: y2+wid*sin(ang-PI/2)
      })


    customShape(vertices,255,1, color(0,0,0,0))
  }
}
