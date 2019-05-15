// All Javascript written by Jeffrey B. Madden 2019.

function createGraph( type , wrap , data )
{
var graph_wrap = document.createElement("div") ;
   var graph_wrap_att_class = document.createAttribute("class") ;
   graph_wrap_att_class.value = "graph_wrap" ;
   graph_wrap.setAttributeNode(graph_wrap_att_class) ;

switch ( type )
   {
   case "percentages" : commandGraph_01(graph_wrap , data) ; break ;
   case "increase_decrease_histogram" : commandGraph_02(graph_wrap , data) ; break ;
   case "price" : commandGraph_03(graph_wrap , data) ; break ;
   default : break ;
   }

wrap.appendChild(graph_wrap) ;
}

// TOOLS
// createCanvas, createGrid, createMarkers, createTxtArray, createTitle,
// createBarTitles, getHighLow

function createCanvas( wrap , width , height )
{
var canvas = document.createElement("canvas") ;
   var canvas_att_w = document.createAttribute("width") ;
   canvas_att_w.value = width ;
   canvas.setAttributeNode(canvas_att_w) ;
   var canvas_att_h = document.createAttribute("height") ;
   canvas_att_h.value = height ;
   canvas.setAttributeNode(canvas_att_h) ;

wrap.appendChild(canvas) ;
return canvas ;
}

function createGrid( settings )
{
var canvas = createCanvas(settings.wrap , settings.width , settings.height) ;
var ctx = canvas.getContext("2d") ;
ctx.strokeStyle = settings.grid_color ;
ctx.lineWidth = 1 ;

// Create horizontal lines
if ( settings.horizontal )
   {
   var x = 0 ;
   var y = 0 ;
   var z ;
   for ( z = 0 ; z < settings.factor_y + 1 ; z++ )
      {
      ctx.moveTo(0 , y) ;
      ctx.lineTo(settings.width , y) ;
      ctx.stroke() ;
      y += settings.size ;
      }
   }

// Create vertical lines
if ( settings.vertical )
   {
   x = 0 ;
   for ( z = 0 ; z < settings.factor_x + 1 ; z++ )
      {
      ctx.moveTo(x , 0) ;
      ctx.lineTo(x , settings.height) ;
      ctx.stroke() ;
      x += settings.size ;
      }
   }

canvas.style.left = settings.margin + "px" ;
canvas.style.top = settings.margin + "px" ;
canvas.style.border = settings.border + "px solid " + settings.grid_color ;
}

function createMarkers( settings , hl )
{
var padding = 3 ;
var canvas = createCanvas(settings.wrap , settings.margin , settings.height + settings.font_size) ;
var ctx = canvas.getContext("2d") ;
ctx.font = settings.font_size + "px Arial" ;
ctx.fillStyle = settings.text_color ;
ctx.textAlign = "right" ;

var y = 0 ;
var x ;
var len = settings.txt_arr.length ;
var chunk = rnd(settings.height / (len - 1)) ;
for ( x = 0 ; x < len ; x++ )
   {
   ctx.fillText(settings.txt_arr[x] , settings.margin - padding , y + settings.font_size) ;
   y += chunk ;
   }

var center = (settings.height / 2) + settings.border + settings.margin ;
canvas.style.top = (center - ((settings.height + settings.font_size) / 2)) - 1 + "px" ;
}

function createTxtArray( settings )
{
var arr = [] ;

if ( settings.centered )
   {
   var y = (settings.count - 1) * settings.inc ;
   var x ;
   for ( x = 0 ; x < settings.count ; x++ )
      {
      if ( y === 0 ) { arr.push(y + settings.symbol_a) ; }
      else { arr.push("+0." + y + settings.symbol_a) ; }
      y -= settings.inc ;
      }

   y = settings.inc ;
   for ( x = 0 ; x < settings.count - 1 ; x++ )
      {
      arr.push("-0." + y + settings.symbol_a) ;
      y += settings.inc ;
      }
   }
else
   {
   var y = settings.count * settings.inc ;
   var x ;
   for ( x = 0 ; x < settings.count + 1 ; x++ )
      {
      if ( settings.decimals )
         {
         var z = Number(settings.symbol_a + y) ;
         arr.push(z.toFixed(2) + settings.symbol_b) ;
         }
      else { arr.push(settings.symbol_a + y + settings.symbol_b) ; }

      y -= settings.inc ;
      }
   }

return arr ;
}

function createTitle( settings )
{
var canvas = createCanvas(settings.wrap , settings.width + (settings.border * 2) , settings.margin) ;
var ctx = canvas.getContext("2d") ;
ctx.font = (settings.font_size * 1.5) + "px Arial" ;
ctx.fillStyle = settings.text_color ;
ctx.textAlign = "center" ;
ctx.fillText(settings.title , settings.width / 2 , settings.margin / 1.5) ;
canvas.style.left = settings.margin + "px" ;
}

function createBarTitles( settings , marker_settings )
{
var canvas = createCanvas(settings.wrap , settings.width , settings.margin) ;
var ctx = canvas.getContext("2d") ;
ctx.font = settings.font_size + "px Arial" ;
ctx.fillStyle = settings.text_color ;
ctx.textAlign = "center" ;

var y = 3 ;
var x ;
var len = marker_settings.bar_arr.length ;
for ( x = 0 ; x < len ; x++ )
   {
   ctx.fillText(marker_settings.bar_arr[x] , ((settings.bar_width / 2) * y) , settings.margin / 2) ;
   y += 4 ;
   }

canvas.style.bottom = "0px" ;
canvas.style.left = settings.margin + settings.border + "px" ;
}

function getHighLow( d )
{
var highest = 0 ;
var lowest = Number(d[0].price) ;

var x ;
var len = d.length ;
for ( x = 0 ; x < len ; x++ )
   {
   var p = Number(d[x].price) ;
   if ( p > highest ) { highest = p ; }
   if ( p < lowest ) { lowest = p ; }
   }

return { high : highest , low : lowest } ;
}

// COMMANDS
// "percentages", "increase_decrease_histogram", "price"

// "percentages"
function commandGraph_01( graph_wrap , d )
{
var settings = { title : "Percentages Decrease-Increase" ,
   wrap : graph_wrap ,
   data : d ,
   size : 12 ,
   factor_x : 24 ,
   factor_y : 20 ,
   horizontal : true ,
   vertical : true ,
   margin : 40 ,
   border : 1 ,
   line_width : 2 ,
   font_size : 10 ,
   grid_color : "#e0e0e0" ,
   text_color : "#909090" ,
   graph_color : "#a0a0ff"
   } ;

var marker_settings = { count : 3 ,
   inc : 10 ,
   symbol_a : "" ,
   symbol_b : "%" ,
   centered : true ,
   decimals : true
   } ;

settings.txt_arr = createTxtArray(marker_settings) ;
settings.width = settings.size * settings.factor_x ;
settings.height = settings.size * settings.factor_y ;

graph_wrap.style.width = settings.width + settings.margin + (settings.border * 2) + "px" ;
graph_wrap.style.height = settings.height + settings.margin + (settings.border * 2) + "px" ;

createTitle(settings) ;
createMarkers(settings) ;
createGrid(settings) ;
drawGraph_01(settings) ;
}

// "increase_decrease_histogram"
function commandGraph_02( graph_wrap , d )
{
var settings = { title : "Increase vs Decrease" ,
   wrap : graph_wrap ,
   data : d ,
   size : 20 ,
   factor_y : 12 ,
   horizontal : true ,
   vertical : false ,
   margin : 30 ,
   border : 1 ,
   font_size : 10 ,
   grid_color : "#e0e0e0" ,
   text_color : "#909090" ,
   graph_color : "#a0a0ff"
   } ;

var marker_settings = { count : 12 ,
   inc : 2 ,
   symbol_a : "" ,
   symbol_b : "" ,
   centered : false ,
   decimals : false ,
   bar_arr : [ "Increase" , "Decrease" , "No change" ]
   } ;

settings.txt_arr = createTxtArray(marker_settings) ;
var len = marker_settings.bar_arr.length ;
settings.factor_x = (len * 2) + 1 ;
settings.bar_width = settings.size * 1.5 ;
settings.width = settings.bar_width * settings.factor_x ;
settings.height = settings.size * settings.factor_y ;

graph_wrap.style.width = settings.margin + settings.width + (settings.border * 2) + "px" ;
graph_wrap.style.height = (settings.margin * 2) + settings.height + (settings.border * 2) + "px" ;

createTitle(settings) ;
createMarkers(settings) ;
createBarTitles(settings , marker_settings) ;
createGrid(settings) ;
drawGraph_02(settings) ;
}

// "price"
function commandGraph_03( graph_wrap , d )
{
var settings = { title : "Price" ,
   wrap : graph_wrap ,
   data : d ,
   size : 18 ,
   factor_x : 24 ,
   factor_y : 10 ,
   horizontal : true ,
   vertical : true ,
   margin : 35 ,
   border : 1 ,
   line_width : 2 ,
   font_size : 10 ,
   grid_color : "#e0e0e0" ,
   text_color : "#909090" ,
   graph_color : "#a0a0ff"
   } ;

settings.width = settings.size * settings.factor_x ;
settings.height = settings.size * settings.factor_y ;
var hl = getHighLow(settings.data) ;
settings.high = Math.ceil(hl.high) ;
settings.low = Math.floor(hl.low) ;
settings.inc = settings.high - settings.low ;

var marker_settings = { count : 2 ,
   inc : settings.inc / 2 ,
   symbol_a : settings.low ,
   symbol_b : "" ,
   centered : false ,
   decimals : true
   } ;

settings.txt_arr = createTxtArray(marker_settings) ;
graph_wrap.style.width = settings.width + settings.margin + (settings.border * 2) + "px" ;
graph_wrap.style.height = settings.height + settings.margin + (settings.border * 2) + "px" ;

createTitle(settings) ;
createMarkers(settings) ;
createGrid(settings) ;
drawGraph_03(settings) ;
}

// CHARTS
// "percentages", "increase_decrease_histogram", "price"

// "percentages"
function drawGraph_01( settings )
{
var conversion = settings.height / 200 ;
var canvas = createCanvas(settings.wrap , settings.width , settings.height) ;
var ctx = canvas.getContext("2d") ;
ctx.strokeStyle = settings.graph_color ;
ctx.lineWidth = settings.line_width ;
var x = 0 ;
var y = settings.height - rnd(settings.data[0]) ;

ctx.moveTo(x , y) ;

var z ;
var datalen = settings.data.length - 1 ;
for ( z = datalen ; z >= 0 ; z-- )
   {
   var d = settings.data[z] ;
   if ( d.sign === "+" ) { y = (settings.height / 2) - rnd((conversion * d.perc) * 500) ; }
   else { y = (settings.height / 2) + rnd((conversion * d.perc) * 500) ; }
   ctx.lineTo(x , y) ;
   x += settings.size ;
   }

ctx.stroke() ;
canvas.style.left = settings.margin + settings.border + "px" ;
canvas.style.top = settings.margin + settings.border + "px" ;
}

// "increase_decrease_histogram"
function drawGraph_02( settings )
{
var canvas = createCanvas(settings.wrap , settings.width , settings.height) ;
var ctx = canvas.getContext("2d") ;
ctx.fillStyle = settings.graph_color ;

var plus = 0 ;
var minus = 0 ;
var no_change = 0 ;
var x ;
var len = settings.data.length ;
for ( x = 0 ; x < len ; x++ )
   {
   if ( settings.data[x].sign === "+" ) { plus += settings.size / 2 ; }
   else if ( settings.data[x].sign === "~" ) { no_change += settings.size / 2 ; }
   else { minus += settings.size / 2 ; }
   }

ctx.fillRect(settings.bar_width * 1 , settings.height - plus , settings.bar_width , plus) ;
ctx.fillRect(settings.bar_width * 3 , settings.height - minus , settings.bar_width , minus) ;
ctx.fillRect(settings.bar_width * 5 , settings.height - no_change , settings.bar_width , no_change) ;

canvas.style.left = settings.margin + settings.border + "px" ;
canvas.style.top = settings.margin + settings.border + "px" ;
}

// "price"
function drawGraph_03( settings )
{
function getDec( d )
   {
   var str = d + "" ;
   var n = str.indexOf(".") ;
   return Number(str.slice(n + 1)) ;
   }

var conversion = settings.height / (settings.inc * 100) ;
var canvas = createCanvas(settings.wrap , settings.width , settings.height) ;
var ctx = canvas.getContext("2d") ;
ctx.strokeStyle = settings.graph_color ;
ctx.lineWidth = settings.line_width ;
var dec = getDec(settings.data[0].price) ;
var x = 0 ;
var y = settings.height - rnd(dec * conversion) ;

ctx.moveTo(x , y) ;

var z ;
var datalen = settings.data.length ;
for ( z = datalen - 1 ; z >= 0 ; z-- )
   {
   dec = getDec(settings.data[z].price) ;
   var intg = 100 * Math.floor(settings.data[z].price - settings.low) ;
   y = settings.height - rnd((intg + dec) * conversion) ;
   x += settings.size ;
   ctx.lineTo(x , y) ;
   }

ctx.stroke() ;
canvas.style.left = settings.margin + settings.border + "px" ;
canvas.style.top = settings.margin + settings.border + "px" ;
}
