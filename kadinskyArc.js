function makeKadinskyArc(posx,posy,size){
  pg.push()
  pg.translate(posx,posy)
  pg.rotate(random(TAU))

  customCircle(0,0,size,color(0,0,0,0),0,0+random(-0.2,0.5),PI+random(-0.5,0.2))
  if(random()>.5){
    let randAngOffset = random(TAU)
    customCircle(0,0,size-30,color(0,0,0,0),0,randAngOffset+random(-0.2,0.5),PI+random(-0.5,0.1)+randAngOffset)
  }

  pg.strokeWeight(sW-3)
  let angi = random(PI/8,PI-PI/8)
  customLine( (size/2-10)*cos(angi), (size/2-10)*sin(angi),
              (size/2+10)*cos(angi), (size/2+10)*sin(angi),
            )
  customLine( (size/2-10)*cos(angi+0.1), (size/2-10)*sin(angi+0.1),
              (size/2+10)*cos(angi+0.1), (size/2+10)*sin(angi+0.1),
            )

  pg.pop()
}
