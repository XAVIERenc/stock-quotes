// All Javascript written by Jeffrey B. Madden 2019.

function statusMsg( msg )
{
var status = document.getElementById("status") ;
var span = document.createElement("span") ;
var span_txt = document.createTextNode(msg) ;
span.appendChild(span_txt) ;
status.appendChild(span) ;
span.scrollIntoView(false) ;
}

function addEntry( th )
{
var symbol_field_list = document.getElementById("symbol_field_list") ;
var atom = symbol_field_list.firstElementChild ;
var clone = atom.cloneNode(true) ;
var field1 = clone.children[0] ;
field1.value = "" ;
if ( clone.children.length > 2 ) { var field2 = clone.children[1] ; field2.value = "" ; }
var rem_btn = th.previousElementSibling ;
var cl = rem_btn.getAttribute("onclick") ;

if ( (cl == null) || (cl == "") )
   {
   rem_btn.setAttribute("onclick" , "removeEntry(this)") ;
   rem_btn.removeAttribute("style") ;
   }

symbol_field_list.appendChild(clone) ;
}

function removeEntry( th )
{
var symbol_field_list = document.getElementById("symbol_field_list") ;
var atom = symbol_field_list.lastElementChild ;

if ( symbol_field_list.children.length > 1 ) { symbol_field_list.removeChild(atom) ; }
if ( symbol_field_list.children.length === 1 )
   {
   th.style.opacity = "0.5" ;
   th.removeAttribute("onclick") ;
   }
}

function clearField( th ) { th.value = "" ; }
