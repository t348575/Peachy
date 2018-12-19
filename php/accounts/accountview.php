<?php
    session_start();
    if(isset($_SESSION['key'])) {
        $check = $_SESSION['key'];
    }
    else {
        exit("false");
    }
    $key = $_POST['key'];
    if($check==$key) {
        unset($_SESSION['key']);
        require_once('connect_read.php');
        $db = new mysqli($db_host,$db_user, $db_password, $db_name);
        if ($db->connect_errno) {
            echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
        }
        $selectemail = 'SELECT * FROM links WHERE email=?';
        $query = $db->prepare($selectemail);
        $query->bind_param('s',$_SESSION['email']);
        $query->execute();
        $result = $query->get_result();
        $row_cnt = $result->num_rows;
        $returndata = array();
        for($i=0;$i<$row_cnt;$i++) {
            $row = $result->fetch_row();
            $returndata["value" . $i] = $row;
        }
        exit(json_encode($returndata));
    }   
    else {
        exit("false");
    }
    /*$returndata = array();
    for($i=0;$i<$row_cnt;$i++) {
        $row = $result1->fetch_row();
        $returndata["value" . $i] = $row;
    }
    exit(json_encode($returndata));*/
?>