<?php
    require_once('connect.php');
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
    function random_code($limit) {
        return substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $limit);
    }
    function again() {
        $num = random_code(7);
        $query = "SELECT link FROM links WHERE link regexp '[[:<:]]" . $num . "[[:>:]]'";
        $result = $db->query($query);
        if( $db->error ) exit( $db->error );
        $row_cnt = $result->num_rows;
        if($row_cnt == 0) {
        $sql = "INSERT INTO links VALUES ('" . $num . "', '" . $email . "', '" . $type . "', '" . $time . "');";
            $result = $db->query($sql);
            if($db->error) exit($db->error);
            return $num;
        }
        else {
            return "invalid";
        }
    }
    $time = $_POST['time'];
    $type = $_POST['type'];
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $num = random_code(7);
    $ip = getRealIpAddr();
    $query0 = "SELECT email FROM contact WHERE ip='" . $ip . "';";
    $result0 = $db->query($query0);
    if ($db->error) exit($db->error);
    $row = $result0->fetch_row();
    $email = $row[0];
    $query = "SELECT link FROM links WHERE link = '" . $num . "';";
    $result = $db->query($query);
    if( $db->error ) exit( $db->error );
    $row_cnt = $result->num_rows;
    if($row_cnt == 0) { 
        $sql = "INSERT INTO links VALUES ('" . $num ."', '" . $email . "', '" . $type . "', '" . $time . "');";
        $result = $db->query($sql);
        if($db->error) exit($db->error);
        echo $num;
    }
    else {
        while(again() == "invalid"){}
    }
    $db->close();
?>