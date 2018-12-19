<?php
require_once('connect_write.php');
$link = $_POST['code'];
$name = $_POST['name'];
$dob = $_POST['dob'];
$db = new mysqli($db_host,$db_user, $db_password, $db_name);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
$search = '';
$search = 'SELECT email FROM users WHERE login=?;';
$query = $db->prepare($search);
$query->bind_param('s', $link);
$query->execute();
$result = $query->get_result();
$row = $result->fetch_row();
$email = $row[0];
$search = '';
$search = 'UPDATE users SET login=0 WHERE login=?;';
$query = $db->prepare($search);
$query->bind_param('s', $link);
if($query->execute()) {
    $search = '';
    $search = 'INSERT INTO details VALUES(?,?,?);';
    $query = $db->prepare($search);
    $query->bind_param('sss', $row[0], $name, $dob);
    $query->execute();
    exit("Account Verified");
}
else {
    exit('Not Verified');
}
?> 