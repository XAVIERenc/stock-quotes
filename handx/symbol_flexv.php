<?php
// All PHP written by Jeffrey B. Madden 2019.
$rt = $_SERVER['DOCUMENT_ROOT'] . "/symbols/" ;
$symbol = strtoupper( $_REQUEST['symbol'] ) ;
$company = $_REQUEST['company'] ;
$n = $rt . $symbol . ".xml" ;

if ( file_exists( $n ) ) { echo( $symbol . ' already exists.' ) ; }
else
   {
   // XML Creator (DOM)
   $xml = new DOMDocument( "1.0" , "UTF-8" ) ;
   $stock_quotes = $xml -> createElement( "stock_quotes" ) ;
   $xml -> appendChild( $stock_quotes ) ;
   $att = $xml -> createAttribute( "company" ) ;
   $c = $xml -> createTextNode( $company ) ;
   $att -> appendChild( $c ) ;
   $stock_quotes -> appendChild( $att ) ;

   $xml -> save( $n ) ;
   echo( $symbol . ' created' ) ;
   }
?>
