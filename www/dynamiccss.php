body{

    overflow: hidden;
}
<?php for($i=0; $i<23;$i++){?>
#map{

    position:relative;
	background-image: url(http://creativspace.creativitlab.com/farouk/glasto.png);
    /*background-image: url(gifspeed.php?speed=2&speed2=6&which=0 <br> gifspeed.php?speed=2&speed2=6&which=0);*/
	background-repeat: no-repeat;
	cursor: move;
    z-index: 1;
}

#controlPanel{
    
    background-color:transparent;
    position:absolute;
    z-index: 4;
}

.birdie{
	
	position: absolute;
	width: 100px;
	height: 100px;
    z-index: 3;
}

.ripple{
    
	position: absolute;
	width: 100px;
	height: 100px;
    z-index: 2;
}

div#qTip {
 padding: 3px;
 border: 1px solid #666;
 border-right-width: 2px;
 border-bottom-width: 2px;
 display: none;
 background: #999;
 color: #FFF;
 font: bold 9px Verdana, Arial, sans-serif;
 text-align: left;
 position: absolute;
 z-index: 1000;
}