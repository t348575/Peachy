<?php
$addr = dirname(dirname(__FILE__));
$id = $_POST['id'];
$new = $addr . "/stats/poll/values/" . $id . ".json";
$jsonString = file_get_contents($new);
$data = json_decode($jsonString, true);
$hold = array();
$percent = array();
foreach ($data['option'] as $new => $entry) {
    $hold[$new - 1] = $data['option'][$new];
}
$num = count($data['option']);
$sum = 0;
for ($i = 0; $i < $num; $i++) {
    $sum += $hold[$i];
}
for ($i = 0; $i < $num; $i++) {
    $percent[$i] = (($hold[$i] / $sum) * 100);
    $percent[$i] = round($percent[$i], 2);
}
echo json_encode($percent);
?>