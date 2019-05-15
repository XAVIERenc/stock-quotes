// All Javascript written by Jeffrey B. Madden 2019.

// XMLHttpRequest Parser
function createXML( func , symbol , company )
{
var parsreq = new XMLHttpRequest() ;

parsreq.onreadystatechange = function() {
if ( (parsreq.readyState === 4) && (parsreq.status === 200) )
   {
   func(parsreq.responseText) ;
   }
} ;

var loc = "hand/symbol_flex.php?symbol=" + symbol + "&company=" + company ;
parsreq.open("POST" , loc , true) ;
parsreq.send() ;
}

function addCompany( th )
{
var company = th.previousElementSibling ;
var symbol = company.previousElementSibling ;
if ( symbol.value && company.value ) { createXML(companyCreated , symbol.value , company.value) ; }
else { statusMsg("Field empty") ; }
}

function companyCreated( resp )
{
statusMsg(resp) ;
}
