<?php
function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
$type = $_POST['type'];
if($type=='poll') {
    $addr = dirname(dirname(__FILE__));
    $id = $_POST['id'];
    $res = $_POST['res'];
    $ip = getRealIpAddr();
    $ip = $ip . "\n";
    $file = $addr . "/stats/poll/completed/" . $id . ".list";
    $write = fopen($file, "a");
    fwrite($write, $ip);
    $new = $addr . "/stats/poll/values/" . $id . ".json";
    $jsonString = file_get_contents($new);
    $data = json_decode($jsonString, true);
    $curr = $data['option'][$res];
    $curr++;
    $data['option'][$res] = $curr;
    $newJsonString = json_encode($data);
    file_put_contents($new, $newJsonString);
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
}
else if($type=='msgboard') {
    if($_POST['mode'] == 'likes') {
        $addr = dirname(dirname(__FILE__));
        $id = $_POST['id'];
        $res = $_POST['res'];
        $new = $addr . "/stats/msgboard/data/" . $id . ".json";
        $jsonString = file_get_contents($new);
        $data = json_decode($jsonString, true);
        $curr = $data[$res]['likes'];
        if ($_POST['plus'] == 1) {
            $curr++;
            $data[$res]['likes'] = $curr;
            $newJsonString = json_encode($data);
            file_put_contents($new, $newJsonString);
        } else {
            $curr--;
            $data[$res]['likes'] = $curr;
            $newJsonString = json_encode($data);
            file_put_contents($new, $newJsonString);
        }
    }
    else if($_POST['mode'] == 'upvote') {
        $addr = dirname(dirname(__FILE__));
        $id = $_POST['id'];
        $res = $_POST['res'];
        $new = $addr . "/stats/msgboard/data/" . $id . ".json";
        $jsonString = file_get_contents($new);
        $data = json_decode($jsonString, true);
        $curr = $data[$res]['upvote'];
        $curr++;
        $data[$res]['upvote'] = $curr;
        $newJsonString = json_encode($data);
        file_put_contents($new, $newJsonString);
    }
    else {
        $addr = dirname(dirname(__FILE__));
        $id = $_POST['id'];
        $res = $_POST['res'];
        $new = $addr . "/stats/msgboard/data/" . $id . ".json";
        $jsonString = file_get_contents($new);
        $data = json_decode($jsonString, true);
        $curr = $data[$res]['downvote'];
        $curr++;
        $data[$res]['downvote'] = $curr;
        $newJsonString = json_encode($data);
        file_put_contents($new, $newJsonString);
    }
}
?>
