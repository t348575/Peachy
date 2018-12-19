<?php
    $id = $_POST['id'];
    session_start();
    $email = $_SESSION['email'];
    require_once('connect_read.php');
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $selectemail = 'SELECT email FROM links WHERE link=?';
    $query = $db->prepare($selectemail);
    $query->bind_param('s', $id);
    $query->execute();
    $result = $query->get_result();
    $row_cnt = $result->num_rows;
    if($row_cnt==1) {
        $row = $result->fetch_row();
        if($row[0] === $email) {
            echo "yes";
        }
        else {
            echo "no";
        }
    }
    else {
        echo "no";
    }
?>