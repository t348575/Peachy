<?php
    $addr = dirname(dirname(__FILE__));
    $mode = $_POST['mode'];
    $id = $_POST['id'];
    $obj = new stdClass();
    $val = new stdClass();
    if($mode == 0) {
        $one = 1;
        $data = array();
        $data[0] = $_POST['name'];
        $data[1] = $_POST['msg'];
        $obj->$one = $data;
        $newJsonString = json_encode($obj);
        $file = $addr . "/stats/msgboard/values/" . $id . ".json";
        $file1 = $addr . "/stats/msgboard/data/" . $id . ".json";
        $val->$one->likes = 0;
        $val->$one->upvote = 0;
        $val->$one->downvote = 0;
        $newJsonString1 = json_encode($val);
        file_put_contents($file, $newJsonString);
        file_put_contents($file1, $newJsonString1);
        echo $newJsonString[0];
    }
    else {
        $file = $addr . "/stats/msgboard/values/" . $id . ".json";
        $file1 = $addr . "/stats/msgboard/data/" . $id . ".json";
        $put = file_get_contents($file);
        $put1 = file_get_contents($file1);
        $at = json_decode($put,true);
        $at1 = json_decode($put1, true);
        $data = array();
        $data[0] = $_POST['name'];
        $data[1] = $_POST['msg'];
        $count = $_POST['count'];
        $val->likes = 0;
        $val->upvote = 0;
        $val->downvote = 0;
        $count++;
        $at[$count] = $data;
        $at1[$count] = $val;
        $tt = json_encode($at);
        $tt1 = json_encode($at1);
        file_put_contents($file, $tt);
        file_put_contents($file1, $tt1);
        echo json_encode($tt);
    }    
?>