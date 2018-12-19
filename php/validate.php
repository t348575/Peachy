<?php
require_once('connect.php');
$date = $_POST['date'];
$id = $_POST['id'];
$db = new mysqli($db_host, $db_user, $db_password, $db_name);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
$query = "SELECT time FROM links WHERE link='" . $id . "';";
$result = $db->query($query);
if ($db->error) exit($db->error);
$row_cnt = $result->num_rows;
if($row_cnt==0){
    echo "none";
}
else {
    $row = $result->fetch_row();
    $date1 = new DateTime($date);
    $date2 = new DateTime($row[0]);
    var_dump($date1 <= $date2);
    $str = ob_get_contents();
    ob_end_clean();
   if($str == true) {
        echo "clear";
    }
    else {
        echo "expired";
    }
}
?>