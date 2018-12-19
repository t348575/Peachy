<?php 
require_once('connect.php');
$email = $_POST['email'];
$db = new mysqli($db_host, $db_user, $db_password, $db_name);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
$query = "SELECT pwd FROM contact WHERE email='" . $email . "';";
$result = $db->query($query);
if ($db->error) exit($db->error);
$row = $result->fetch_row();
echo $row[0];
?>