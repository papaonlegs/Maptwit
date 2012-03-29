<?php
class cropImage{
    var $imgSrc,$myImage,$cropHeight,$cropWidth,$x,$y,$thumb;
    
    function setImage($image)
    {
    
    //Your Image
       $this->imgSrc = $image; 
                         
    //getting the image dimensions
       list($width, $height) = getimagesize($this->imgSrc); 
                         
    //create image from the jpeg
       $this->myImage = imagecreatefrompng($this->imgSrc) or die("Error: Cannot find image!"); 
                
           if($width > $height) $biggestSide = $width; //find biggest length
           else $biggestSide = $height; 
                         
    //The crop size will be half that of the largest side 
       //$cropPercent = .5; // This will zoom in to 50% zoom (crop)
       //$this->cropWidth   = $biggestSide*$cropPercent; 
       //$this->cropHeight  = $biggestSide*$cropPercent; 
       
       $this->cropWidth = $_GET['w'];
       $this->cropHeight = $_GET['h'];
                         
    //getting the top left coordinate
       //$this->x = ($width-$this->cropWidth)/2;
       //$this->y = ($height-$this->cropHeight)/2;
       
       $this->x = $_GET['x'];
       $this->y = $_GET['y'];
                 
    }
    
    function createThumb()
    {
                        
      //$thumbSize = 250; // will create a 250 x 250 thumb
      $thumbSizew = $_GET['w'];
      $thumbSizeh = $_GET['h'];
      $this->thumb = imagecreatetruecolor($thumbSizew, $thumbSizeh); 
    
      imagecopyresampled($this->thumb, $this->myImage, 0, 0,$this->x, $this->y, $thumbSizew, $thumbSizeh, $this->cropWidth, $this->cropHeight); 
    }
    
    function renderImage()
    {
                         
       header('Content-type: image/png');
       imagepng($this->thumb);
       imagedestroy($this->thumb); 
    }
    
}

$src = 'http://creativspace.creativitlab.com/farouk/glasto.png';
$image = new cropImage;
$image->setImage($src);
$image->createThumb();
$image->renderImage();

?>