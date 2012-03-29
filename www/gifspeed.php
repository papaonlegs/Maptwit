<?php
include "GIFEncoder.class.php";
/*
    Build a frames array from sources...
*/
/*
$frames [0] = "framesb/Frame01.gif";
$frames [1] = "framesb/Frame02.gif";
$frames [2] = "framesb/Frame03.gif";
$frames [3] = "framesb/Frame04.gif";
$frames [4] = "framesb/Frame05.gif";
$frames [5] = "framesb/Frame06.gif";
$frames [6] = "framesb/Frame07.gif";
$frames [7] = "framesb/Frame08.gif";
$frames [8] = "framesb/Frame09.gif";
$frames [9] = "framesb/Frame10.gif";
$frames [10] = "framesb/Frame11.gif";
$frames [11] = "framesb/Frame12.gif";
$frames [12] = "framesb/Frame13.gif";
$frames [13] = "framesb/Frame14.gif";
$frames [14] = "framesb/Frame15.gif";
$frames [15] = "framesb/Frame16.gif";
$frames [16] = "framesb/Frame17.gif";
$frames [17] = "framesb/Frame18.gif";
*/

function checkFolder($location){
    //$trialer = opendir ( "assets/$_GET[c]/$_GET[w]/" );
    if(!file_exists($location)) throw new Exception("No such folder");
    else return $location;
}

try{
    $trial = checkFolder ( "assets/$_GET[c]/$_GET[w]/" );
}catch(Exception $e){
    Header ( 'Content-type:image/gif' );
    //echo "Error handling :".$e->getMessage();
    exit;
}



if ( $dh = opendir ( "assets/$_GET[c]/$_GET[w]/" ) ) {
	while ( false !== ( $dat = readdir ( $dh ) ) ) {
		if ( $dat != "." && $dat != ".." ) {
			$frames [ ] = "assets/$_GET[c]/$_GET[w]/$dat";
			$framed [ ] = $_GET['s'];
		}
	}
	closedir ( $dh );
    sort($frames);
}
$framesi = $frames;

if(isset($_GET['f']) && $_GET['f'] == 1){
    unset($framesi);
    /*if ( $dh = opendir ( "assets/$_GET[c]/static/$_GET[w]/" ) ) {
    while ( false !== ( $dat = readdir ( $dh ) ) ) {
		if ( $dat != "." && $dat != ".." ) {
			$framesi [ ] = "assets/$_GET[c]/static/$_GET[w]//$dat";
		}
	}
	closedir ( $dh );
    sort($frames);
    }*/
    $framesi[] = $frames[0];
    //$framesi[] = "assets/$_GET[c]/$_GET[w]/$dat";//$frames[1];
}

if(isset($_GET['im'])){
    //Header('Content-type:image/gif');
    $num = intval($_GET['im']);
    echo '<img src="'.$frames[$_GET['im']].'">';
    exit;
}
/*
		GIFEncoder constructor:
        =======================

		image_stream = new GIFEncoder	(
							URL or Binary data	'Sources'
							int					'Delay times'
							int					'Animation loops'
							int					'Disposal'
							int					'Transparent red, green, blue colors'
							int					'Source type'
						);
*/
$gif = new GIFEncoder	(
							$framesi,
							$framed,
							0,
							2,
							255, 255, 255,
							"url"
		);
/*
		Possibles outputs:
		==================

        Output as GIF for browsers :
        	- Header ( 'Content-type:image/gif' );
        Output as GIF for browsers with filename:
        	- Header ( 'Content-disposition:Attachment;filename=myanimation.gif');
        Output as file to store into a specified file:
        	- FWrite ( FOpen ( "myanimation.gif", "wb" ), $gif->GetAnimation ( ) );
*/
Header ( 'Content-type:image/gif' );
echo	$gif->GetAnimation ( );

//echo $frames[4];
//echo $frames[2];
?>
