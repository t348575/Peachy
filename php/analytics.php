<?php
    $id = $_POST['id'];
    $type = $_POST['type'];
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
    $ip = getRealIpAddr();
    $addr = dirname(dirname(__FILE__));
    $address = $addr . "/stats/" . $type . "/users/" . $id . ".json";
    $temp = file_get_contents($address);
    $string = json_decode($temp, true);
    $size = count($string);
    $size = $size + 1;
    $nexttemp = file_get_contents("https://tools.keycdn.com/geo.json?host=" . $ip);
    if($nexttemp === false) {
        exit("error");
    }
    else {
        $obj = json_decode($nexttemp, false);
        $newobj = new stdClass();
        $newobj->isp = $obj->data->geo->isp;
        $newobj->ip = $obj->data->geo->ip;
        $newobj->code = $obj->data->geo->country_code;
        $newobj->country = $obj->data->geo->country_name;
        $newobj->city = $obj->data->geo->city;
        $newobj->time = $_POST['time'];
        $newobj->latitude = $obj->data->geo->latitude;
        $newobj->longitude = $obj->data->geo->longitude;
        $string['val' . $size] = $newobj;
        $newstring = json_encode($string);
        file_put_contents($address, $newstring);
    }
?>