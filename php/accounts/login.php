<?php
ini_set('display_errors', 1);
    require_once('users.php');
    $email = $_POST['email'];
    $password = $_POST['pwd'];
    $output = new base_command($email, $password, "login");
?>
