function makeKadinskyBall(posx,posy,size){
  pg.push()
  pg.translate(posx,posy)

  makeBlob(0,0,size)

  makeKadinskyArc(0,0,size/2)

  makeKadinskyArc(0,0,size)

  if(random()>.75){
    makeKadinskyArc(0,0,size*1.5)
  }

  if(random()>.5){
    multipleLines(random(-10,10), random(-10,10), random(40,100))
  }

  pg.pop()
}

function makeParticles(posx,posy,size){
  pg.push()

  for(let n = 0; n<25; n++){
    let r = random(.2,.75)
    let ang = random(TAU)

    let x = posx + (size+20)*r*cos(ang)
    let y = posy + (size+20)*r*sin(ang)

    x = constrain(x,pad,PG_WID-pad)
    y = constrain(y,pad,PG_HEI-pad)

    let randSize = random(size/15, size/5)
    if(random()>.5){
      makeBlob(x,y,randSize)
    }

    customCircle(x,y, randSize/2, 0,0 )

  }

  pg.pop()
}



function makeManyArcs(posx,posy,sizei){
  pg.push()
  pg.translate(posx,posy,sizei)

  for(let n = 0; n<25; n++){
    let r = random(.2,.75)
    let ang = random(TAU)

    let xx = (sizei+20)*r*cos(ang)
    let yy = (sizei+20)*r*sin(ang)

    let randSize = random(sizei/20, sizei/10)
    if(random()>.5){
      makeBlob(xx,yy,randSize*2)
    }
    //console.log(randSize/2)
    //makeKadinskyArc(xx,yy, randSize/2 )
    makeBlob(xx,yy,randSize)
  }

  pg.pop()
}
