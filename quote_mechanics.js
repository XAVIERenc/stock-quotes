// All Javascript written by Jeffrey B. Madden 2019.

// XMLHttpRequest Parser
function sendQuote( func , quote , symbol )
{
var parsreq = new XMLHttpRequest() ;

parsreq.onreadystatechange = function() {
if ( (parsreq.readyState === 4) && (parsreq.status === 200) )
   {
   func(parsreq.responseText) ;
   }
} ;

var loc = "hand/quote_flex.php?symbol=" + symbol + "&quote=" + quote ;
parsreq.open("POST" , loc , true) ;
parsreq.send() ;
}

function addQuote( th )
{
var quote = th.previousElementSibling ;
var symbol = quote.previousElementSibling ;
sendQuote(quoteSent , quote.value , symbol.value) ;
}

function quoteSent( resp )
{
statusMsg(resp) ;
}
