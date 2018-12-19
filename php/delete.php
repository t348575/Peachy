<?php
/*$addre = dirname(dirname(dirname(__FILE__)));
$next = $addre . "/html/vendor/autoload.php";
require_once($next);
$addr = dirname(dirname(__FILE__));
$type = $_POST['type'];
if (isset($_POST["id"])) {
    $id = $_POST['id'];
}
if (isset($_POST["mail"])) {
    $mail = $_POST['mail'];
}
if(isset($_POST["email"])) {
    $email = $_POST['email'];
}
else {
    $email = 0;
}
if($type=="delete") {
    delete($email);
}
else {
    $tipe = $type;
    other($tipe, $id, $mail, $email);
}
function delete($email) {
    require_once('connect.php');
    $db = new mysqli($db_host, $db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $query = "SELECT link, type FROM links WHERE email='" . $email . "';";
    $result = $db->query($query);
    if ($db->error) exit($db->error);
    $row_cnt = $result->num_rows;
    if ($row_cnt == 0) {
        deleteaccnt($email);
        $query1 = "DELETE FROM contact WHERE email='" . $email . "';";
        $result1 = $db->query($query1);
        if ($db->error) exit($db->error);
        $ip = getRealIpAddr();
        $query2 = "DELETE FROM tempval WHERE ip='" . $ip . "';";
        $result2 = $db->query($query2);
        if ($db->error) exit($db->error);
    } else {
        for ($i = 0; $i < $row_cnt; $i++) {
            $row = $result->fetch_row();
            switch ($row[1]) {
                case "poll": {
                    other("poll", $row[0], "no", 0);
                }
                case "msgboard": {
                    other("msgboard", $row[0], "no", 0);
                }
                case "poll": {
                    other("quiz", $row[0], "no", 0);
                }
            }
        }
        $query1 = "DELETE FROM contact WHERE email='" . $email . "';";
        $result1 = $db->query($query1);
        if ($db->error) exit($db->error);
        $ip = getRealIpAddr();
        $query2 = "DELETE FROM tempval WHERE ip='" . $ip . "';";
        $result2 = $db->query($query2);
        if ($db->error) exit($db->error);
    }
}
function other($tipee, $ide, $maile, $emaile) {
    $addr = dirname(dirname(__FILE__));
    switch ($tipee) {
        case "poll":
            {
                if ($maile == "yes") {
                    $struct = file_get_contents($addr . "/data/poll/" . $ide . ".json");
                    $values = file_get_contents($addr . "/stats/poll/values/" . $ide . ".json");
                    sendemail($ide, $emaile, $struct, $values);
                }
                unlink($addr . "/data/poll/" . $ide . ".json");
                unlink($addr . "/stats/poll/completed/" . $ide . ".list");
                unlink($addr . "/stats/poll/values/" . $ide . ".json");
                dbmanage($ide);
                break;
            }
        case "msgboard":
            {
                if ($maile == "yes") {
                    $struct = file_get_contents($addr . "/data/msgboard/" . $ide . ".json");
                    $values = file_get_contents($addr . "/stats/msgboard/values/" . $ide . ".json");
                    $values += "\n";
                    $values += file_get_contents($addr . "/stats/msgboard/data/" . $ide . ".json");
                    sendemail($ide, $emaile, $struct, $values);
                }
                unlink($addr . "/data/msgboard/" . $ide . ".json");
                unlink($addr . "/stats/msgboard/data/" . $ide . ".json");
                unlink($addr . "/stats/msgboard/values/" . $ide . ".json");
                dbmanage($ide);
                break;
            }
        case "quiz":
            {
                if ($maile == "yes") {
                    $struct = file_get_contents($addr . "/data/quiz/" . $ide . ".json");
                    $values = file_get_contents($addr . "/stats/quiz/" . $ide . ".json");
                    sendemail($ide, $emaile, $struct, $values);
                }
                unlink($addr . "/data/quiz/" . $ide . ".json");
                unlink($addr . "/stats/quiz/" . $ide . ".json");
                dbmanage($ide);
                break;
            }
    }
}
function sendemail($id, $email, $struct, $values) {
    $body = "Service number " . $id . " has been deleted. Following is the data obtained from the service: " . $struct . "  " . $values;
    $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, "ssl"))
        ->setUsername('users.peachy@gmail.com')
        ->setPassword('bkwejrxmosqvpiee');
    $mailer = new Swift_Mailer($transport);
    $message = (new Swift_Message('Peachy service concerning ' . $id))
        ->setFrom(['users.peachy@gmail.com' => 'Peachy Services Managment'])
        ->setTo([$email => ''])
        ->setBody($body);
    $mailer->send($message);
}
function deleteaccnt($email) {
    $body = "Account at https://peachy.localtunnel.me with this email has been deleted!";
    $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, "ssl"))
        ->setUsername('users.peachy@gmail.com')
        ->setPassword('bkwejrxmosqvpiee');
    $mailer = new Swift_Mailer($transport);
    $message = (new Swift_Message('Peachy Account Termination'))
        ->setFrom(['users.peachy@gmail.com' => 'Peachy Account Managment'])
        ->setTo([$email => ''])
        ->setBody($body);
    $mailer->send($message);
}
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

function dbmanage($ideee) {
    $db_host = "localhost";
    $db_user = "root";
    $db_password = "porkmeat";
    $db_name = "linklist";
    $db = new mysqli($db_host, $db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $query = "DELETE FROM links where link='" . $ideee . "';";
    $result = $db->query($query);
    if ($db->error) exit($db->error);
    $ip = getRealIpAddr();
    $query1 = "SELECT total FROM contact WHERE ip='" . $ip . "';";
    $result1 = $db->query($query1);
    if ($db->error) exit($db->error);
    $row = $result1->fetch_row();
    $total = $row[0] - 1;
    $query2 = "UPDATE contact SET total=" . $total . " WHERE ip='" . $ip . "';";
    $result2 = $db->query($query2);
    if ($db->error) exit($db->error);
}*/
    $id = $_POST['id'];
    require_once('connect_delete.php');
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $selectemail = 'SELECT type,email FROM links WHERE link=?';
    $query = $db->prepare($selectemail);
    $query->bind_param('s', $id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_row();
    $selectemail = 'DELETE FROM links WHERE link=?';
    $query = $db->prepare($selectemail);
    $query->bind_param('s', $id);
    $query->execute();
    require_once('connect_write.php');
    $db = new mysqli($db_host,$db_user, $db_password, $db_name);
    if ($db->connect_errno) {
        echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
    }
    $selectemail = 'UPDATE users SET total=total-1 WHERE email=?';
    $query = $db->prepare($selectemail);
    $query->bind_param('s', $row[1]);
    $query->execute();
    $addr = dirname(dirname(__FILE__));
    unlink($addr . "/data/" . $row[0] . "/" . $id . ".json");
    switch($row[0]) {
        case "poll": {
            unlink($addr . "/stats/poll/users/" . $id . ".json");
            unlink($addr . "/stats/poll/values/" . $id . ".json");
            unlink($addr . "/stats/poll/completed/" . $id . ".txt");
            for($i=1;$i<=20;$i++) {
                unlink($addr . "/data/img/" . $id . $i);
            }
            break;
        }
        case "msgboard": {
            unlink($addr . "/stats/msgboard/users/" . $id . ".json");
            unlink($addr . "/stats/msgboard/values/" . $id . ".json");
            unlink($addr . "/stats/msgboard/data/" . $id . ".json");
        }
        case "quiz": {
            unlink($addr . "/stats/quiz/users/" . $id . ".json");
            unlink($addr . "/stats/quiz/values/" . $id . ".json");
            for($i=1;$i<=15;$i++) {
                unlink($addr . "/data/img/" . $id . $i);
            }
        }
    }
?>