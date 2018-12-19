<?php
    require_once('connect_read.php');
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    session_start();
    $email = $_SESSION['email'];
    if(isset($_SESSION['display'])) {
        exit("false");
    }
    else {
        $search = 'SELECT name FROM details WHERE email=?;';
        $query = $db->prepare($search);
        $query->bind_param('s', $email);
        $query->execute();
        $result = $query->get_result();
        $row = $result->fetch_row();
        $_SESSION['display'] = "true";
        echo $row[0];
    }
?>