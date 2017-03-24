var yo = require('yo-yo')

/* ---------------------------------------------------
		COLORS
--------------------------------------------------- */
var dB = '#081b53' // darkBlue
var b  = '#3022bb' // blue
var lB = '#7766fc' // lightBlue
var lP = '#f989ff' // lightPink
var dP = '#730d61' // darkPink
var B  = '#080707' // black
var g  = '#2e3f41' // grey
var sY = '#f7da8b' // skinYellow
var W  = '#ffffff' // white
/* ---------------------------------------------------
		IMAGE
--------------------------------------------------- */

var image = [
b, b, b, b, b, b, lB, lB, lB, b, b, b, lB, b, b, b, b, lB, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, b, b, lB, lB, b, b,
b, b, lB, b, b, lB, lB, lB, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, lB, b, lB, b,
b, lB, lB, b, b, b, lB, b, lB, b, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, lB, lB, lB, lB, b, b, b, b, b, lB, b, b, lB, b,
b, lB, lB, lB, b, b, lB, lB, lB, lB, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, lB, b, lB, b, b, b, b, b, lB, b, lB, lB, b, b,
b, lB, b, b, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, lB, lB, b, b, b, b, b, lB, b, b, b,
b, lB, b, b, b, b, b, lB, b, b, lB, lB, b, b, b, b, b, b, b, b, b, b, lB, b, b, b, b, lB, b, b, b, lB, b, b, lB, lB, b, b, b, b,
b, b, b, b, lB, b, lB, b, b, lB, b, b, b, b, b, b, lB, b, b, b, b, b, b, lB, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, b, b,
b, lB, lB, lB, lB, lB, lB, lB, b, lB, b, b, b, lB, lB, b, b, b, b, b, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, lB, b, b, b,
b, b, lB, b, b, lB, lB, lB, b, b, b, b, lB, b, lB, lB, lB, b, lB, b, lB, b, lB, lB, b, lB, lB, b, b, b, b, b, b, lB, b, b, b, b, b, b,
b, lB, lB, b, lB, b, lB, b, b, b, b, lB, b, b, b, b, b, b, lB, b, b, lB, lB, lB, lB, b, b, lB, b, b, lB, b, lB, lB, lB, b, b, b, b, b,
b, b, b, b, lB, b, b, lB, b, b, b, lB, b, lB, b, lB, lB, b, lB, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, lB, b, b, b, b, lB, b,
b, b, b, lB, b, b, b, b, b, b, lB, b, b, b, lB, lB, lB, lB, b, b, lB, lB, lB, b, lB, lB, b, b, b, lB, b, b, b, b, b, b, lB, b, b, b,
b, lB, b, lB, b, b, b, b, b, b, b, b, b, lB, lB, b, b, lB, b, b, b, b, lB, lB, b, b, b, b, b, b, lB, lB, lB, b, b, b, b, b, b, b,
lB, lB, lB, b, lB, lB, b, b, b, b, b, b, b, lB, lB, lB, b, lB, b, b, b, b, b, b, b, b, b, b, b, lB, b, b, b, b, b, b, b, b, b, b,
lB, lB, lB, b, b, b, lB, b, b, b, b, b, b, b, lB, b, b, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, lB, b, lB, b, b, b, b, b, b,
lB, lB, lB, lB, b, lB, b, b, lB, b, b, b, lB, lB, b, b, b, b, b, b, b, b, lB, lB, b, b, b, b, b, lB, lB, lB, lB, b, b, b, b, b, b, b,
lB, lB, lB, b, b, lB, b, lB, b, lB, b, b, b, b, b, lB, b, b, b, b, b, lB, b, b, b, b, b, lB, b, lB, b, lB, b, b, b, b, b, b, b, b,
b, b, b, b, b, b, lB, lB, lB, b, lB, b, b, b, lB, b, b, b, b, lB, b, b, b, b, lB, b, b, lB, b, b, b, lB, lB, b, b, b, b, b, b, b,
b, b, b, b, lB, lB, lB, lB, b, lB, b, b, b, b, b, b, lB, b, b, b, b, b, lB, b, b, b, lB, b, lB, lB, b, lB, b, b, b, b, b, b, b, b,
b, b, b, lB, lB, b, lB, b, b, b, lB, lB, lB, lB, lB, b, lB, b, b, b, b, b, b, lB, b, b, b, lB, b, b, b, lB, lB, lB, b, b, b, b, b, b,
b, b, b, lB, b, b, b, lB, b, b, lB, lB, b, b, b, b, b, b, b, b, b, lB, lB, lB, b, b, b, b, b, lB, lB, lB, lB, b, b, b, b, b, b, b,
b, b, b, lB, b, lB, b, lB, lB, lB, b, lB, b, b, b, b, b, lB, b, lB, lB, b, b, b, lB, b, b, b, b, b, b, lB, lB, b, b, b, b, b, b, b,
b, b, b, b, b, lB, b, b, lB, b, lB, b, b, b, b, b, b, lB, b, b, b, lB, lB, b, b, b, lB, b, b, b, b, b, b, b, lB, b, lB, b, b, b,
b, b, b, lB, lB, b, b, b, b, lB, b, b, b, b, lB, b, b, lB, lB, b, b, b, b, lB, lB, b, lB, b, b, b, b, b, b, b, b, b, b, b, b, b,
b, b, b, b, b, lB, lB, lB, lB, b, b, b, b, b, b, b, lB, b, lB, b, b, b, lB, lB, lB, lB, lB, lB, lB, b, b, b, b, b, b, b, b, b, b, b,
]
/* ---------------------------------------------------
		FUNCTIONS
--------------------------------------------------- */
function draw () {
  var size = 10
  return image.map((x,i)=>yo`<rect x=${(i%40 * size)} y=${Math.floor(i/40)*size} width=${size} height=${size} fill='${x}'>`)
}

var el = yo`<svg viewbox="0 0 100 100" width="800" height="500" >${draw()} </svg>`
document.body.appendChild(el)
