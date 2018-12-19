<?php
    require_once('connect_read.php');
    $id = $_POST['id'];
    $addr = dirname(dirname(__FILE__));
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $search = 'SELECT type FROM links WHERE link=?';
    $query = $db->prepare($search);
    $query->bind_param('s', $id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_row();
    $address;
    switch($row[0]) {
        case "poll": {
            $address = $addr . "/data/poll/" . $id . ".json";
            break;
        }
        case "msgboard": {
            $address = $addr . "/data/msgboard/" . $id . ".json";
            break;
        }
        case "quiz": {
            $address = $addr . "/data/quiz/" . $id . ".json";
            break;
        }
    }
    $string = file_get_contents($address);
    $nstring = json_decode($string, true);
    $nstring['time'] = $_POST['time'];
    $jsonstring = json_encode($nstring);
    file_put_contents($address, $jsonstring);
    require_once('connect_write.php');
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $search = 'UPDATE links SET time=? WHERE link=?';
    $query = $db->prepare($search);
    $query->bind_param('ss', $_POST['time'], $id);
    $query->execute();
    $result = $query->get_result();
?>