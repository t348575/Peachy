<?php
    class mail {
        private $body, $email, $subject, $from, $id;
        function __construct() {
            $argv = func_get_args();
            if(isset($argv[4])) {
                $this->id = $argv[4];
            }
            $this->body = $argv[0];
            $this->email = $argv[1];
            $this->subject = $argv[2];
            $this->from = $argv[3];
            $this->sendmail();
        }
        private function sendmail() {
            $address = dirname(dirname(dirname(__FILE__)));
            $next = $address . "/html/vendor/autoload.php";
            require_once($next);
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, "ssl"))
                ->setUsername('users.peachy@gmail.com')
                ->setPassword('bkwejrxmosqvpiee');
            $mailer = new Swift_Mailer($transport);
            $message = (new Swift_Message($this->subject))
                ->setFrom(['users.peachy@gmail.com' => $this->from])
                ->setTo([$this->email => ''])
                ->setBody($this->body);
                if(isset($this->id)) {
                    $addr = dirname(dirname(__FILE__));    
                    $temp = $addr . "/php/temp/" . $this->id . ".pdf";
                    $message->attach(Swift_Attachment::fromPath($temp));
                }
            $mailer->send($message);
        }
    }
?>