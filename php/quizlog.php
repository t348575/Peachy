<?php
$addr = dirname(dirname(__FILE__));
$id = $_POST['id'];
$new = $addr . "/stats/quiz/" . $id . ".json";
$string = file_get_contents($new);
$string = $string + 1;
file_put_contents($new, $string);
?>