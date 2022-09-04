function makeKadinskyLine(posx,posy,leng){
  pg.push()
  pg.translate(posx,posy)
  let rot = random(TAU)

  pg.rotate(rot)

  pg.strokeWeight(sW)
  //customCircle(0,0,random(leng/5, leng/3),color(0,0,0,0),0,-PI/2,PI/2)

  let segs = random([3,4,5,6,7])
  for(let l = 0; l < 1-.01; l+=1/segs){
    let px = map(l,0,1,-leng/2, leng/2)
    if(random()>.25){
          customCircle(0,px+leng/segs/2,leng/segs-random(leng/segs/4),random(highlightPalette),0,-PI/2,PI/2)
    }

  }

  pg.strokeWeight(sW-3)
  customLine(
    0, 0-leng/2, 0, 0+leng/2
  )

  pg.pop()
}

function multipleLines(posx,posy,leng){
  pg.push()
  pg.translate(posx,posy)
  pg.rotate(random(TAU))

  pg.strokeWeight(sW-3)
  customLine(0, 0-leng/2+random(-10,10), 0, 0+leng/2+random(-10,10))
  customLine(random(5,20), 0-leng/2+random(-10,10),
              random(5,20), 0+leng/2+random(-10,10))
  customLine(-random(5,20), 0-leng/2+random(-10,10), -random(5,20), 0+leng/2+random(-10,10))

  pg.pop()
}
