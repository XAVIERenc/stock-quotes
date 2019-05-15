<?php
// All PHP written by Jeffrey B. Madden 2019.
$rt = $_SERVER['DOCUMENT_ROOT'] . "/symbols/" ;
$quote = $_REQUEST['quote'] ;
$symbol = strtoupper( $_REQUEST['symbol'] ) ;
$n = $rt . $symbol . ".xml" ;

if ( !file_exists( $n ) ) { echo( $symbol . ' does not exist.' ) ; }
else
   {
   $doc = new DOMDocument() ;
   $doc -> load( $n ) or die( "Action denied" ) ;
   $xml = $doc -> documentElement ;
   $first = $xml -> firstChild ;

   $arr = dateIt() ;
   $arr['price'] = $quote ;
   $ele = appIt( $doc , $xml , "quote" , "" , "id" , $arr['unix'] , $first ) ;
   unset( $arr['unix'] ) ;
   listIt( $doc , $arr , $ele ) ;

   $doc -> save( $n ) ;
   echo( 'Quote added.' ) ;
   }

function appIt( $root , $ele , $nme , $val , $attr , $attrval , $first )
{
$xxx = $root -> createElement( $nme ) ;
if ( $attr !== NULL ) { attIt( $root , $xxx , $attr , $attrval ) ; }
$yyy = $root -> createTextNode( $val ) ;
$xxx -> appendChild( $yyy ) ;
if ( $first ) { $ele -> insertBefore( $xxx , $first ) ; }
else { $ele -> appendChild( $xxx ) ; }
return $xxx ;
}

function attIt( $root , $ele , $nme , $val )
{
$xxx = $root -> createAttribute( $nme ) ;
$yyy = $root -> createTextNode( $val ) ;
$xxx -> appendChild( $yyy ) ;
$ele -> appendChild( $xxx ) ;
}

function listIt( $root , $arr , $ele )
{
foreach ( $arr as $key => $val )
   {
   appIt( $root , $ele , $key , $val , NULL , NULL , NULL ) ;
   }
}

function dateIt()
{
date_default_timezone_set( "UTC" ) ;
$date = date_create() ;
$unix = date_timestamp_get( $date ) ;
$m = date_format( $date , "m" ) ;
$d = date_format( $date , "d" ) ;
$y = date_format( $date , "Y" ) ;
$h = date_format( $date , "G" ) ;
$i = date_format( $date , "i" ) ;
$s = date_format( $date , "s" ) ;
$ch = date_format( $date , "a" ) ;

$date_arr = array( "unix" => $unix ,
   "month" => $m ,
   "day" => $d ,
   "year" => $y ,
   "hours" => $h ,
   "minutes" => $i ,
   "seconds" => $s ,
   "meridian" => $ch
   ) ;

return $date_arr ;
}
?>
