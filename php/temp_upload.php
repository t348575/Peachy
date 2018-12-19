<?php
    $id = $_POST['id'];
    $addr = dirname(dirname(__FILE__));
    $img = $_POST['img'];
    $num = (int)$_POST['index'];
    $num = $num + 1;
    $address = $addr . "/data/img/" . $id . $num;
    $write = fopen($address,"w+");
    fwrite($write, $img);
?> 