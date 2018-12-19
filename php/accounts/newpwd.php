<?php
$email = $_POST['email'];
$newpwd = $_POST['newpwd'];
require_once('connect.php');
$db = new mysqli($db_host, $db_user, $db_password, $db_name);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
$query = "UPDATE contact SET pwd='" . $newpwd . "' WHERE email='" . $email . "';";
$result = $db->query($query);
if ($db->error) exit($db->error);
exit('Success!');
?>