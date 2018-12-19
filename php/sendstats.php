<?php
    $id = bin2hex(openssl_random_pseudo_bytes(64));
    $addr = dirname(dirname(__FILE__));    
    $pdf = $addr . "/php/temp/" . $id . ".pdf";
    $address = dirname(dirname(dirname(__FILE__)));
    $next = $address . "/html/vendor/autoload.php";
    require($next);
    use Spipu\Html2Pdf\Html2Pdf;
    $html2pdf = new HTML2PDF('P', 'A4');
    $html2pdf->writeHTML($_POST['data']);
    $file = $html2pdf->Output($pdf,'F');
    $newdata = $id;
    $body = "Statistics of " . $_POST['type'] . " with id: " . $_POST['id'] . " is attached as a PDF file in this email";
    require_once('mail.php');
    $mail = new mail($body, $_POST['email'], "Statistics of " . $_POST['type'] . " with id: " . $_POST['id'], "Peachy Service Managment", $newdata);
    unset($pdf);
?>