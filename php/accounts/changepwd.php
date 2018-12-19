<?php
    require_once('users.php');
    session_start();
    $output = new base_command($_SESSION['email'], $_POST['pwd'], "reset", $_POST['newpwd']);
?>