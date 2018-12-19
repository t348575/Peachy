<?php
require_once('userinfo.php');
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
switch($type) {
    case "poll": {
        $id = $_POST['id'];
        $loc = dirname(dirname(__FILE__));
        $file = $loc . "/stats/poll/completed/" . $id . ".txt";
        if(!file_exists($file)) {
            die("non_exist");
        }
        if(isset($_COOKIE[$id])){
            echo "voted";
        }
        else {
            echo "clear";
        }
        /*$ip = getRealIpAddr();
            $addr = "";
        if(isset($_POST['ip'])){
            $local = $_POST['local'];
            $addr = $ip . ":" . $local . UserInfo::get_ip() . UserInfo::get_os() . UserInfo::get_browser() . UserInfo::get_device() . "\n";
        }
        else {
            $addr = $ip . UserInfo::get_ip() . UserInfo::get_os() . UserInfo::get_browser() . UserInfo::get_device() . "\n";
        }
            $file = $loc . "/stats/poll/completed/" . $id . ".txt";
            $handle = fopen($file, "r") or die('non_exist');
            $valid = false;
            while (($buffer = fgets($handle)) !== false) {
                if (strpos($buffer, $addr) !== false) {
                    $valid = true;
                    break;
                }
            }
            fclose($handle);
            if ($valid == true) {
                echo "voted";
            } else {
                echo "clear";
            }*/
        break;
    }
    case "pollw": {
        $id = $_POST['id'];
        $ip = getRealIpAddr();
        $addr = "";
        if(isset($_POST['ip'])){
            $local = $_POST['local'];
            $addr = $ip . ":" . $local . UserInfo::get_ip() . UserInfo::get_os() . UserInfo::get_browser() . UserInfo::get_device() . "\n";
        }
        else {
            $addr = $ip . UserInfo::get_ip() . UserInfo::get_os() . UserInfo::get_browser() . UserInfo::get_device() . "\n";
        }
        $time = (int)$_POST['time'];
        setcookie($id, $id, $time, "/");
        $loc = dirname(dirname(__FILE__));
        $file = $loc . "/stats/poll/completed/" . $id . ".txt";
        file_put_contents($file, $addr, FILE_APPEND);
        $file = $loc . "/stats/poll/values/" . $_POST['id'] . ".json";
        $x = file_get_contents($file);
        $jsonstring = json_decode($x,true);
        $jsonstring['option'][$_POST['count']] = $jsonstring['option'][$_POST['count']] + 1;
        $jsonnew = json_encode($jsonstring);
        file_put_contents($file,$jsonnew);
        break;
    }
    case "msgboard": {
        $id = $_POST['id'];
        $loc = dirname(dirname(__FILE__));
        $file = $loc . "/data/msgboard/" . $id . ".json";
        if(!file_exists($file)) {
            die("0");
        }
        else {
            exit("1");
        }
        break;
    }
    case "quiz": {
        $id = $_POST['id'];
        $loc = dirname(dirname(__FILE__));
        $file = $loc . "/data/quiz/" . $id . ".json";
        if(!file_exists($file)) {
            die("0");
        }
        else {
            exit("1");
        }
        break;
    }
}
?>
