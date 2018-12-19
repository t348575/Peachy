<?php
$type = $_POST['type'];
$addr = dirname(dirname(__FILE__));
require_once('users.php');
switch ($type) {
    case 'poll': {
            session_start();
            $output = new create_link($_SESSION['email'], $_POST['time'], "poll");
            $output->re_try();
            $address = $addr . "/data/poll/";
            $val = new stdClass();
            $obj = new stdClass();
            $obj->link = $output->num;
            echo $output->num;
            $obj->title = $_POST['title'];
            $option = $_POST['option'];
            $obj->time = $_POST['time'];
            $optionsize = sizeof($option);
            $keyso = array();
            $keysi = array();
            for($i=1; $i<=$optionsize; $i++){
                $keyso[$i] = "opt" . $i;
            }
            $key1 = array();
            $key2 = array();
            for ($i = 1; $i <= $optionsize; $i++) {
                $key1[$i] = $i;
                $key2[$i] = 0;
            }
            $keyt = array_combine($key1, $key2);
            $val->option = $keyt;
            $data2 = json_encode($val);
            for ($i = 1; $i <= $optionsize; $i++) {
                $keysi[$i] = "img" . $i;
            }
            $img = array(); 
            $obj->imgwant = $_POST['imgwant'];
            if(isset($_POST['img'])) {
                $img = $_POST['img'];
            }
            else if($obj->imgwant == "file") {
                $obj->imgwant = "yes";
                for ($i = 0; $i < $optionsize; $i++) {
                    $img[$i] = "/data/img/" . $obj->link . ($i+1);
                }
                $img = array_combine($keysi,$img);
                $obj->img = $img;
            }
            if(isset($_POST['img'])) {
                $img = array_combine($keysi,$img);
                $obj->img = $img;
            }
            $option = array_combine($keyso, $option);
            $obj->option = $option;
            $data = json_encode($obj);
            $file = $address;
            $file = $file . $obj->link . ".json";
            $write = fopen($file, "w");
            fwrite($write, $data);
            fclose($write);
            $file2 = $addr . "/stats/poll/values/" . $obj->link . ".json";
            $write2 = fopen($file2, "w");
            fwrite($write2, $data2);
            fclose($write2);
            $file3 = $addr . "/stats/poll/users/" . $obj->link . ".json";
            $write3 = fopen($file3, "w+");
            fclose($write3);
            $file4 = $addr . "/stats/poll/completed/" . $obj->link . ".txt";
            $write4 = fopen($file4, "w+");
            fclose($write4);
            break;
        }
    case "msgboard": {
        session_start();
            $output = new create_link($_SESSION['email'], $_POST['time'], "msgboard");
            $output->re_try();
        $obj = new stdClass();
        $obj->link = $output->num;
        echo $output->num;
        $address = $addr . "/data/msgboard/" . $obj->link . ".json";
        $obj->name = $_POST['name'];
        $obj->topic = $_POST['topic'];
        $obj->time = $_POST['time'];
        $data = json_encode($obj);
        $file = $address;
        $write = fopen($file, "w");
        fwrite($write, $data);
        fclose($write);
        $file1 = $addr . "/stats/msgboard/data/" . $obj->link . ".json";
        $file2 = $addr . "/stats/msgboard/values/" . $obj->link . ".json";
        $write = fopen($file1, "w");
        fclose($write);
        $write = fopen($file2, "w");
        fclose($write);
        $file3 = $addr . "/stats/msgboard/users/" . $obj->link . ".json";
            $write3 = fopen($file3, "w+");
            fclose($write3);
        break;
    }
    case "quiz": {
        session_start();
        $output = new create_link($_SESSION['email'], $_POST['time'], "quiz");
        $output->re_try();
        $address = $addr . "/data/quiz/";
        $obj = new stdClass();
        $obj->link = $output->num;
        echo $output->num;
        $obj->time = $_POST['time'];
        $obj->title = $_POST['title'];
        $optionsize = sizeof($_POST['question']);
        $keyso = array();
        $keysi = array();
        for ($i = 1; $i <= $optionsize; $i++) {
            $keysi[$i] = "img" . $i;
        }
        $img = array(); 
        $obj->imgwant = $_POST['imgwant'];
        if(isset($_POST['img'])) {
            $img = $_POST['img'];
        }
        else if($obj->imgwant == "file") {
            $obj->imgwant = "yes";
            for ($i = 0; $i < $optionsize; $i++) {
                $img[$i] = "/data/img/" . $obj->link . ($i+1);
            }
            $img = array_combine($keysi,$img);
            $obj->img = $img;
            }            if(isset($_POST['img'])) {
            $img = array_combine($keysi,$img);
            $obj->img = $img;
        }      
        for($i=1; $i<=$optionsize; $i++){
            $keyso[$i] = "ques" . $i;
        }
        $option = $_POST['question'];
        $question = array_combine($keyso, $option);
        $obj->question = $question;
        if(isset($_POST['option'])){
            $opt = array();
            $opt = $_POST['option'];
            $obj->option = $opt;
        }
        $obj->quiztype = $_POST['quiztype'];
        $json = json_encode($obj);  
        $file = $address . $obj->link . ".json";
        $write = fopen($file, "w+");
        fwrite($write, $json);
        fclose($write);
        $file1 = $addr . "/stats/quiz/users/" . $obj->link . ".json";
        $file2 = $addr . "/stats/quiz/values/" . $obj->link . ".json";
        $write1 = fopen($file1, "w+");
        $write2 = fopen($file2, "w+");
        fclose($write1);
        fclose($write2);
        break;
    }
}
?>