function makeCtulhuEye(posx, posy, size){
  pg.push()
  pg.translate(posx,posy)

  for(let n = 0; n<25; n++){
    let r = random(.4,.75)
    let ang = random(TAU)

    let x = (size+20)*r*cos(ang)
    let y = (size+20)*r*sin(ang)

    customCircle(x,y,random(size/20, size/10), 0,0 )

  }

  customCircle(0,0, size+30, 0, 0)
  customCircle(0,0, size, 255, 255)
  customCircle(0,0, size/2, 0, 0)
  pg.pop()
}

function makePaintBlob(posx, posy, size){
  pg.push()
  pg.translate(posx,posy)

  for(let n = 0; n<350; n++){
    let r = sqrt(random(.75))
    let ang = random(TAU)

    let x = (size+20)*r*cos(ang)
    let y = (size+20)*r*sin(ang)

    colr = color(0,0,random(255))
    customCircle(x,y,random(size/20, size/10), colr, colr )

  }

  pg.pop()
}




function makeBlob(posx,posy,size){
  pg.push()
  pg.translate(posx,posy)

  customCircle(0,0, size, random(highlightPalette), color(0,0,0,0))
  customCircle(0,0, size/2, random(highlightPalette), color(0,0,0,0))
  pg.pop()
}

function makeParticlesEverywhere(){
  pg.push()
  let size = PG_HEI


  for(let n = 0; n<15; n++){


    let x = random(pad*2,PG_WID-pad*2)
    let y = random(pad*2,PG_HEI-pad*2)

    let randSize = random(size/35, size/25)

    //customCircle(x,y, randSize, backgroundColor, color(0,0,0,0))
    customCircle(x,y, randSize/2, random([color(0,0,0,0), 0]), 0)

    positionArr.push([x,y,randSize])

  }

  pg.pop()
}
