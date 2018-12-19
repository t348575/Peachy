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
$ip = getRealIpAddr();
$db = new mysqli($db_host, $db_user, $db_password, $db_name);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
$query = "SELECT total FROM contact WHERE ip='" . $ip . "';";
$result = $db->query($query);
if ($db->error) exit($db->error);
$row = $result->fetch_row();
$var = $row[0];
$var = $var + 1;
$query1 = "UPDATE contact SET total=" . $var . " WHERE ip='" . $ip . "';";
$result1 = $db->query($query1);
if ($db->error) exit($db->error);
?>
