<?php
$addr = dirname(dirname(__FILE__));
$id = $_POST['id'];
$new = $addr . "/stats/msgboard/values/" . $id . ".json";
$jsonString = file_get_contents($new);
echo strlen($jsonString);
?>