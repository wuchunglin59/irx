<?php

$fileList = [];

$type = $_POST["type"];
$dirName = $_POST["dirName"];

$dir = "images\\".$type."\\".$dirName;

if ($handle = opendir($dir)) {
    while (false !== ($entry = readdir($handle))) {
        //if ($entry != "." && $entry != "..") {
            if (preg_match("/^[^\?]+\.(jpg|jpeg|gif|png)(?:\?|$)/", strtolower($entry)) 
                && is_file($dir.'\\'.$entry)) {
                $fileList[] = $entry;
            }
        //}
    }
    closedir($handle);
}

if (!empty($fileList)) {
    sort($fileList);
}

//var_dump($fileList);

echo json_encode($fileList);

?>
