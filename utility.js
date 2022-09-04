function granulate_random(amount) {
    pg.loadPixels();
    const d = pg.pixelDensity();
    const pixelsCount = 4 * (pg.width * d) * (pg.height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        grainAmount = random(-amount, amount);
        pg.pixels[i] = pg.pixels[i] + random(-amount, amount);
		pg.pixels[i+1] = pg.pixels[i+1] + random(-amount, amount);
		pg.pixels[i+2] = pg.pixels[i+2] + random(-amount, amount);
	  }
	  pg.updatePixels();
}

// code from: https://stackoverflow.com/a/37225895/6688750
function inteceptCircleLineSeg(circle, line){
    var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = line.p2.x - line.p1.x;
    v1.y = line.p2.y - line.p1.y;
    v2.x = line.p1.x - circle.center.x;
    v2.y = line.p1.y - circle.center.y;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
    if(isNaN(d)){ // no intercept
        return [];
    }
    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;
    retP1 = {};   // return points
    retP2 = {}
    ret = []; // return array
    if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
        retP1.x = line.p1.x + v1.x * u1;
        retP1.y = line.p1.y + v1.y * u1;
        ret[0] = retP1;
    }
    if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
        retP2.x = line.p1.x + v1.x * u2;
        retP2.y = line.p1.y + v1.y * u2;
        ret[ret.length] = retP2;
    }
    return ret;
}


function customCircle(posx, posy, rad, colr, strkColr, startAng, endAng) {
  let offset = random(999, 99999);
  pg.push();

  pg.noStroke()

  col = colr

  sAng = (startAng)?startAng:0;
  eAng = (endAng)?endAng:TAU;


  pg.stroke(col)
  let step = (TAU / (max(rad,0.1) * 1.5));

  for (let a = sAng; a < eAng; a += step) {

    let randoffr = randomGaussian(0, 0.5) + map(random(),0,1,-1, 1)
    let x = posx + ((rad -sW/2 + randoffr) * cos(a)) / 2;
    let y = posy + ((rad -sW/2+ randoffr) * sin(a)) / 2;

      pg.strokeWeight(
        ((noise(x * 0.005 + offset, y * 0.005 + offset) * sW) / 4) * 3 +
        map(random(),0,1,sW / 4, (sW / 4) * 1.5)
      );


    pg.point(x, y);
  }

  pg.fill(col)
  pg.arc(posx, posy, rad-sW, rad-sW, sAng, eAng);

    pg.stroke(strkColr)


  for (let a = sAng; a < eAng; a += step) {
    let randoffr = randomGaussian(0, 0.25) + map(random(),0,1,-0.25, 0.25)
    let x = posx + ((rad + randoffr) * cos(a)) / 2;
    let y = posy + ((rad + randoffr) * sin(a)) / 2;


      pg.strokeWeight(
        ((noise(x * 0.005 + offset, y * 0.005 + offset) * sW) / 4) * 3 +
        map(random(),0,1,sW / 4, (sW / 4) * 1.5)
      );


    pg.point(x, y);
  }
  pg.pop();


}

function customLine(px1, py1, px2, py2) {
  let offset = random(999, 99999);
  pg.push();
  d = dist(px1, py1, px2, py2)

  const step = sW/4

  for (let l = 0; l < d; l += step) {
    let interp = map(l, 0, d, 0, 1);

    let x = px1 * interp + px2 * (1 - interp);
    let y = py1 * interp + py2 * (1 - interp);

    if (noise((x * 0.05) / scale + offset, (y * 0.05) / scale + offset) < 0.305) {
      pg.strokeWeight(0);
    } else {
      pg.strokeWeight(
        ((noise((x * 0.02) / scale + offset, (y * 0.02) / scale + offset) *
          sW) /
          4.5) *
          3 +
          map(random(),0,1,sW / 4, (sW / 4) * 2) / 2
      );
    }


    pg.point(
      x + randomGaussian(0, 0.25) + map(random(),0,1,-0.25, 0.25),
      y + randomGaussian(0, 0.25) + map(random(),0,1,-0.25, 0.25)
    );
  }

  pg.pop();
}

function customShape(vertices, colr, chnc, strkCol){
  let offset = random(999, 99999);

  pg.push()
  //blendMode(OVERLAY)
  pg.fill(colr)
  let chc = (chnc)?chnc:.25;
  if(random()>chc){
    pg.noFill()
  }


  pg.beginShape()
  for(let n = 0; n < vertices.length; n++){
    pg.vertex(vertices[n].x, vertices[n].y)
  }
  pg.endShape(CLOSE)

  pg.stroke(0)
  if(strkCol){
    pg.stroke(strkCol)
  }
  for(let n = 0; n < vertices.length; n++){
    customLine(
      vertices[n].x, vertices[n].y,
      vertices[(n+1)%vertices.length].x, vertices[(n+1)%vertices.length].y
    )
  }

  pg.pop()
}

// Source: https://stackoverflow.com/a/5624139/6688750
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function keyPressed(){
  if(keyCode === 83){
    saveImage()
  }
}

function saveImage(){
  save('mini_kandinsky_randomSeed_'+(randSeed+'')+'_noiseSeed_'+(noiSeed+'')+'.png')
}

backgroundColors = ['#fff1d0', '#f9b4ab', '#f5487f', "#22344A", "#BBA07E", "#4A311C", "#EEF3E7"]

backgroundColors = ['#BEC29D','#99ABA3','#CD433F','#4C231F','#DDBB73','#C6A80C','#525B58', "#22344A", "#4A311C", '#f9b4ab']
highlightPalette = ["#E10504", "#29689D", "#F3E314", "#436239", "#F06909"]

// highlightPalette = ["#fffbe6", "#050505", "#abcd5e", "#29ac9f", "#14976b", "#b3dce0", "#62b6de", "#2b67af", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]

// highlightPalette = ["#f2eb8a", "#fed000", "#fc8405", "#ed361a", "#e2f0f3", "#b3dce0", "#4464a1", "#203051", "#ffc5c7", "#f398c3", "#cf3895", "#6d358a", "#06b4b0", "#4b8a5f"]

// highlightPalette = ["#f2eb8a", "#fed000", "#fc8405", "#ed361a", "#e2f0f3", "#b3dce0", "#4464a1", "#203051", "#ffc5c7", "#f398c3", "#cf3895", "#6d358a", "#06b4b0", "#4b8a5f","#E10504", "#29689D", "#F3E314", "#436239", "#F06909"]

// highlightPalette = ['#65493A',' #4392A3',' #90834F',' #E0B372',' #375E71',
// '#7EB8BC',' #D6CCB5',' #A3402C',' #EBC350',' #DB8E4A']




//highlightPalette =  ['#ffec00',"#ffb703",'#a5be00',"#F24C00"]
//
//


// backgroundColors = ["#87A00E","#FBBF05"]
// highlightPalette = ["#687627","#FB4470","#0f0f0f","#FBBF05","#F6D7B8","#F24C00"]
//
// backgroundColors = ['#fff1d0', '#dd1c1a',"#F24C00", '#cdb380', '#036564', '#033649','#8a9b0f']
// highlightPalette =  ['#f0c808', '#679436','#a5be00', "#62b6de", "#fffbe6", '#031634']

highlightPalette = ['#e8ddcb', '#cdb380', '#036564', '#033649', '#031634']






backgroundColors = ['#155e63']
highlightPalette = ['#1f306e', '#553772', '#8f3b76', '#c7417b', '#f5487f',"#dddf00",'#ffec00',"#ffb703",'#a5be00',"#F24C00"]


backgroundColors = ['#155e63','#1f306e', '#553772', '#8f3b76','#c7417b']
highlightPalette = ['#f5487f',"#dddf00",'#ffec00',"#ffb703",'#a5be00',"#F24C00"]







// Blaues Bild
// backgroundColors = ["#32345A","#3C739D","#2A3462","#2A2D3F","#2B6E66","#768C97"]
// highlightPalette = ["#CFB606","#38734C","#006A64",
// "#BD242D","#C46881","#649458","#202020","#AC6218","#6F8844","#D02B67","#D1720B","#433E73"]

// Kreise in einem Kreis
// backgroundColors = ["#D0B27E"]
// highlightPalette = ["#434635","#C8172B","#294C76","#65907E","#E6BBB4","#C86548","#106975"]

// Stille Harmonie
// backgroundColors = ["#D6B705"]
// highlightPalette = ["#243042","#E12823","#2F2155","#1A2B2A","#E15F09","#D9A689","#0F5C8D"]


colorObjects = [
  // {
  //   name:  ,
  //   backgroundColors:    ,
  //   highlightPalette:
  // },

  {
    name: "ATOMIC TOAD",
    backgroundColors:['#155e63','#1f306e', '#553772', '#8f3b76','#c7417b'],
    highlightPalette:
    ['#f5487f',"#dddf00",'#ffec00',"#ffb703",'#a5be00',"#F24C00"]
  },

  {
    name:  "BLAUES BILD",
    backgroundColors:    ["#32345A","#3C739D","#2A3462","#2A2D3F","#2B6E66","#768C97"],
    highlightPalette: ["#CFB606","#38734C","#006A64","#BD242D","#C46881","#649458",
      "#202020","#AC6218","#6F8844","#D02B67","#D1720B","#433E73"]
  },



  {
    name:  "STILLE HARMONIE",
    backgroundColors:  ["#B8604F","#D8C004","#367970","#A0A5B1","#081B17"],
    highlightPalette:["#243042","#E12823","#2F2155","#1A2B2A",
                        "#E15F09","#D9A689","#0F5C8D"]
  },

  {
    name: "KREISE IN EINEM KREIS" ,
    backgroundColors: ["#202528","#D1B073","#5E9881","#7A445B","#9D7932"],
    highlightPalette: ["#434635","#C8172B","#294C76","#65907E","#E6BBB4","#C86548","#106975"]
  },

  {
    name: "SCHNITTLINIEN" ,
    backgroundColors: [ '#f9b4ab', '#f5487f', "#22344A", "#BBA07E", "#4A311C"],
    highlightPalette: ["#E10504", "#29689D", "#F3E314", "#436239", "#F06909"]
  },


  {
    name: "SCHWERROT",
    backgroundColors: ["#4B6D6C","#2C4272","#89202E","#653823","#5285AA"],
    highlightPalette: ["#AF7752","#B68C16","#9B84A1","#486E40","#00685C"]
  }
]

// {
//   name:  "STILLE HARMONIE",
//   backgroundColors:  ["#D6B705"],
//   highlightPalette:["#243042","#E12823","#2F2155","#1A2B2A",
//                       "#E15F09","#D9A689","#0F5C8D"]
// },

// {
//   name: "KREISE IN EINEM KREIS" ,
//   backgroundColors: ["#D0B27E"],
//   highlightPalette: ["#434635","#C8172B","#294C76","#65907E","#E6BBB4","#C86548","#106975"]
// },

// {
//   name: "SCHWERROT",
//   backgroundColors: ["#4B6D6C","#2C4272","#89202E","#653823","#5285AA"],
//   highlightPalette: ["#AF7752","#B68C16","#4C5979","#486E40","#00685C"]
// }
