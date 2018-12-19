<?php
    require_once('users.php');
    $email = $_POST['email'];
    $password = $_POST['pwd'];
    $output = new base_command($email, $password, "create");
?>