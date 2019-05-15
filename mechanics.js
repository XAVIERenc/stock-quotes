// All Javascript written by Jeffrey B. Madden 2019.

// XMLHttpRequest Parser
function getVal( tar , tag ) { return tar.getElementsByTagName(tag)[0].childNodes[0].nodeValue ; }

function loadPrs( func , symbol , req )
{
var parsreq = new XMLHttpRequest() ;

parsreq.onreadystatechange = function() {
if ( (parsreq.readyState === 4) && (parsreq.status === 200) )
   {
   var xml = parsreq.responseXML ;
   var listing = xml.getElementsByTagName("stock_quotes")[0] ;
   func(listing , symbol) ;
   }
if ( (parsreq.readyState === 4) && (parsreq.status === 404) )
   {
   var err = 'Symbol "' + symbol + '" not found.' ;
   statusMsg(err) ;
   }
} ;

var loc = "symbols/" + symbol + ".xml" ;
parsreq.open(req , loc , true) ;
parsreq.send() ;
}

function getQuote()
{
var quote_entry = document.getElementById("quote_entry") ;
if ( quote_entry.value ) { fillQuotes(quote_entry.value) ; }
else { statusMsg("Enter a symbol.") ; }
}

function clearQuotes()
{
var recent_quote_symbol = document.getElementById("recent_quote_symbol") ;
var status = document.getElementById("status") ;
var quote_entry = document.getElementById("quote_entry") ;
var recent_quotes = document.getElementById("recent_quotes") ;
var tbody = recent_quotes.getElementsByTagName("tbody")[0] ;
var recent_quote_item = document.getElementById("recent_quote_item") ;
var recent_quote_diff = document.getElementById("recent_quote_diff") ;
var recent_quote_time_date = document.getElementById("recent_quote_time_date") ;
var charts_list = document.getElementById("charts_list") ;
var ch = tbody.children ;

var x ;
var len = ch.length ;
for ( x = 0 ; x < len ; x++ )
   {
   var td = ch[x].children ;
   td[0].innerHTML = "" ;
   td[1].innerHTML = "" ;
   td[2].innerHTML = "" ;
   }

status.innerHTML = "" ;
var span = document.createElement("span") ;
var span_txt = document.createTextNode("Ready...") ;
span.appendChild(span_txt) ;
status.appendChild(span) ;

quote_entry.value = "" ;
recent_quote_symbol.innerHTML = "~" ;
recent_quote_item.innerHTML = "$0.00" ;
recent_quote_diff.innerHTML = "" ;
recent_quote_time_date.innerHTML = "" ;
charts_list.innerHTML = "" ;
}

function fillQuotes( symbol )
{
loadPrs(quotesFilled , symbol , "GET") ;
}

function quotesFilled( resp , symbol )
{
clearQuotes() ;
var recent_quote_symbol = document.getElementById("recent_quote_symbol") ;
var recent_quotes = document.getElementById("recent_quotes") ;
var tbody = recent_quotes.getElementsByTagName("tbody")[0] ;
var recent_quote_item = document.getElementById("recent_quote_item") ;
var recent_quote_diff = document.getElementById("recent_quote_diff") ;
var recent_quote_time_date = document.getElementById("recent_quote_time_date") ;
var ch = tbody.children ;
var company = resp.getAttribute("company") ;
var respch = resp.children ;
var old ;
var nw ;
var graph_data = [] ;

var x ;
var respchlen = respch.length ;
for ( x = 0 ; (x < respchlen) && (x < 24) ; x++ )
   {
   var quote_obj = getQuoteData(respch[x]) ;

   if ( x < 5 )
      {
      var td = ch[x].children ;
      td[0].innerHTML = quote_obj.price ;
      td[1].innerHTML = quote_obj.date + " - " + quote_obj.time ;
      }
   if ( x === 0 )
      {
      recent_quote_symbol.innerHTML = company ;
      recent_quote_item.innerHTML = "$" + quote_obj.price ;
      recent_quote_time_date.innerHTML = quote_obj.date + " - " + quote_obj.time ;
      nw = quote_obj.price ;
      var obj = { price : nw } ;
      graph_data.push(obj) ;
      }
   if ( x >= 1 )
      {
      old = quote_obj.price ;
      var obj = percentageDiff(old , nw) ;
      nw = quote_obj.price ;
      obj.price = nw ;
      graph_data.push(obj) ;

      if ( x === 1 )
         {
         recent_quote_diff.innerHTML = obj.sign + obj.diff + ", " + obj.sign + obj.perc + "%" ;
         recent_quote_diff.style.color = obj.color ;
         }

      if ( x < 6 )
         {
         var td = ch[x - 1].children ;
         td[2].innerHTML = obj.sign + obj.diff + ", " + obj.sign + obj.perc + "%" ;
         td[2].style.color = obj.color ;
         }
      }
   }

var charts_list = document.getElementById("charts_list") ;
createGraph("price" , charts_list , graph_data) ;
createGraph("percentages" , charts_list , graph_data) ;
createGraph("increase_decrease_histogram" , charts_list , graph_data) ;
}

function getQuoteData( q )
{
var obj = {} ;
obj.month = getVal(q , "month") ;
obj.day = getVal(q , "day") ;
obj.year = getVal(q , "year") ;
obj.date = obj.month + "-" + obj.day + "-" + obj.year ;
obj.hours = getVal(q , "hours") ;
obj.minutes = getVal(q , "minutes") ;
obj.meridian = getVal(q , "meridian") ;
obj.time = obj.hours + ":" + obj.minutes + obj.meridian ;
obj.price = getVal(q , "price") ;
return obj ;
}

function percentageDiff( old , nw )
{
var diff_obj = {} ;
old = Math.floor(Number(old) * 100) ;
nw = Math.floor(Number(nw) * 100) ;

if ( old < nw )
   {
   var d = nw - old ;
   diff_obj.diff = d / 100 ;
   diff_obj.sign = "+" ;
   diff_obj.color = "Green" ;
   }
else if ( old === nw )
   {
   var d = 0 ;
   diff_obj.diff = d ;
   diff_obj.sign = "~" ;
   diff_obj.color = "Black" ;
   }
else
   {
   var d = old - nw ;
   diff_obj.diff = d / 100 ;
   diff_obj.sign = "-" ;
   diff_obj.color = "Red" ;
   }

var perc = (d / old) * 100 ;
perc = perc.toFixed(2) ;
diff_obj.perc = perc ;
return diff_obj ;
}

function rnd( d ) { d = Number(d) ; return Math.round(d) ; }

function roundDec( d , p )
{
if ( (p == null) || (p == undefined) ) { p = 1 ; }
var m = Math.pow(10 , p) ;
return Math.round(d * m) / m ;
}
