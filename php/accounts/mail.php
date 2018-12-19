<?php
    class mail {
        private $body, $email, $subject, $from;
        function __construct($par1, $par2, $par3, $par4) {
            $this->body = $par1;
            $this->email = $par2;
            $this->subject = $par3;
            $this->from = $par4;
            $this->sendmail();
        }
        private function sendmail() {
            $address = dirname(dirname(dirname(__FILE__)));
            $next = $address . "/vendor/autoload.php";
            require_once($next);
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, "ssl"))
                ->setUsername('users.peachy@gmail.com')
                ->setPassword('bkwejrxmosqvpiee');
            $mailer = new Swift_Mailer($transport);
            $message = (new Swift_Message($this->subject))
                ->setFrom(['users.peachy@gmail.com' => $this->from])
                ->setTo([$this->email => ''])
                ->setBody($this->body);
            $mailer->send($message);
        }
    }
?>