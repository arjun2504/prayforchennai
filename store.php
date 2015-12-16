<?php
	include "ImageResize.php";
	use \Eventviva\ImageResize;
	$url = $_POST['img'];

	$image = new ImageResize($url);
	$image->resizeToWidth(500, 500);


	$path_dissect = pathinfo($url);
	$dis = strtok($path_dissect['basename'],'?');

	

	$img = 'dp/'.$dis;

	$image->save($img);

	//file_put_contents($img, file_get_contents($url));
	//echo "http://cryptlife.com/prayforchennai/".$img;

	/*$png = imagecreatefromjpeg($img);
    $jpeg = imagecreatefrompng('overlay.png');
	list($width, $height) = getimagesize('overlay.png');
	list($newwidth, $newheight) = getimagesize($img);
	$out = imagecreatetruecolor("500", "500");
	imagecopyresampled($out, $jpeg, 0, 0, 0, 0, "500", "500", $width, $height);
	imagecopyresampled($out, $png, 0, 0, 0, 0, "500", "500", $newwidth, $newheight);
	imagejpeg($out, 'final/'.$dis, 100);*/

	/*$png = imagecreatefrompng('overlay.png');
	$jpeg = imagecreatefromjpeg($img);

	list($width, $height) = getimagesize('overlay.png');
	list($newwidth, $newheight) = getimagesize($img);
	$out = imagecreatetruecolor($newwidth, $newheight);
	imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
	imagecopyresampled($out, $png, 0, 0, 0, 0, $newwidth, $newheight, $newwidth, $newheight);
	imagejpeg($out, 'final/'.$dis, 100);*/


	$width = 500;
    $height = 500;

    $base_image = imagecreatefromjpeg($img);
    $top_image = imagecreatefrompng("overlay.png");

    imagesavealpha($top_image, false);
    imagealphablending($top_image, false);
    imagecopy($base_image, $top_image, 0, 0, 0, 0, $width, $height);
    imagepng($base_image, "final/".$dis);


	echo "http://prayforchennai.in/final/".$dis;

?>