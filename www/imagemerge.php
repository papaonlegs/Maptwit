<?php

$num = 1;
//$dest = imagecreatefromgif()
$dest = imagecreatefromgif('assets/green/3/g2-2.gif');
$src = imagecreatefromgif('assets/red/4/r3-2.gif');
$src1 = imagecreatefromgif('assets/green/5/g4-2.gif');

// Copy and merge
imagecopymerge($dest, $src, 0, 0, 0, 0, 2653, 1568, 0);
imagecopymerge($dest, $src1, 0, 0, 0, 0, 2653, 1568, 0);

// Output and free from memory
header('Content-Type: image/gif');
imagegif($dest);

imagedestroy($dest);
imagedestroy($src);

?>