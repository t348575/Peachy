<?php
    class base_command {
        private $password, $hash, $email, $key, $skey, $newpassword;
        function __construct() {
            $argv = func_get_args();
            if(func_num_args() == 0 || func_num_args() == 1) {
                if(isset($argv[0])) {
                    $this->key = $argv[0];
                    $this->skey = $this->rand_string(128);
                }
                $this->state();
                exit();
            }
            $this->email = $argv[0];
            $this->password = $argv[1];
            if($argv[2]=="login") {                
                $this->login();
                exit();
            }
            else if($argv[2]=="create"){
                $this->create_account();
                exit();
            }
            else if($argv[2]=="reset") {
                $this->password = $argv[1];
                $this->newpassword = $argv[3];
                $this->reset();
                exit();
            }
        }
        public function reset() {
            require_once('connect_read.php');
            $db = new mysqli($db_host,$db_user, $db_password, $db_name);
            if ($db->connect_errno) {
                echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
            }
            $searchforemail = 'SELECT pwd FROM users WHERE email=?';
            $query = $db->prepare($searchforemail);
            $query->bind_param('s', $this->email);
            $query->execute();
            $result = $query->get_result();
            $row = $result->fetch_row();
            $this->hash = $row[0];
            if($this->verify_hash()) {
                $this->password = $this->newpassword;
                require_once('connect_write.php');
                $db = new mysqli($db_host,$db_user, $db_password, $db_name);
                if ($db->connect_errno) {
                    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
                }
                $searchforemail = 'UPDATE users SET pwd=? WHERE email=?';
                $query = $db->prepare($searchforemail);
                $this->hash = $this->generate_hash_pwd();
                $query->bind_param('ss', $this->hash, $this->email);
                $query->execute();
                echo "valid";
            }
            else {
                echo "false";
            }
        }
        public function create_account() {
            require_once('connect_read.php');
            $db = new mysqli($db_host,$db_user, $db_password, $db_name);
            if ($db->connect_errno) {
                echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
            }
            $searchforemail = 'SELECT email FROM users WHERE email=?';
            $query = $db->prepare($searchforemail);
            $query->bind_param('s', $this->email);
            $query->execute();
            $result = $query->get_result();
            $row_cnt = $result->num_rows;
            if($row_cnt==0) {
                require_once('connect_write.php');
                $db = new mysqli($db_host,$db_user, $db_password, $db_name);
                if ($db->connect_errno) {
                    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
                }
                $insertaccount = 'INSERT INTO users VALUES(?,?,?,0)';
                $query = $db->prepare($insertaccount);
                $this->hash = $this->generate_hash_pwd();
                $verify = $this->rand_string(64);
                $query->bind_param('sss', $this->email, $this->hash, $verify);
                $query->execute();
                require_once('mail.php');
                $link = "https://peachy.serveo.net/verify.html?code=" . $verify;
                $body = "Welcome to Peachy event services. Click on the link to verify your email! " . $link;
                $subject = "Verify your Peachy account";
                $from = "Peachy Account Managment";
                $mail = new mail($body, $this->email, $subject, $from);
                echo "valid";
            }
            else {echo "false";}
        }
        public function login() {
            require_once('connect_read.php');
            $db = new mysqli($db_host,$db_user, $db_password, $db_name);
            if ($db->connect_errno) {
                echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
            }
            $selectemail = 'SELECT * FROM users WHERE email=?';
            $query = $db->prepare($selectemail);
            $query->bind_param('s', $this->email);
            $query->execute();
            $result = $query->get_result();
            $row = $result->fetch_row();
            $this->hash = $row[1];
            if($this->verify_hash()) {
                session_start();
                $_SESSION['email'] = $this->email;
                $_SESSION['pwd'] = $this->hash;
                if($row[2] == 0) {
                    if($row[3]>5) {
                        echo "full";
                    }
                    else {
                        echo "valid";
                    }    
                }
                else {
                    exit("notverify");
                }            
            }
            else {
                echo "no";
            }
        }
        public function state() {
            session_start();
            if(isset($_SESSION['email'])) {
                $this->email = $_SESSION['email'];
                $this->password = $_SESSION['pwd'];
                require_once('connect_read.php');
                $db = new mysqli($db_host,$db_user, $db_password, $db_name);
                if ($db->connect_errno) {
                    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
                }
                $selectemail = 'SELECT * FROM users WHERE email=? AND pwd=?';
                $query = $db->prepare($selectemail);
                $query->bind_param('ss', $this->email, $this->password);
                $query->execute();
                $result = $query->get_result();
                $row = $result->fetch_row();
                $row_cnt = $result->num_rows;
                if($row_cnt==1) {
                    if($row[2] == 0) {
                        if($row[3]>=5) {
                            echo "full";
                            if(isset($this->key)) {
                                $_SESSION['skey'] = $this->skey;
                                $_SESSION['key'] = $this->key;
                            }
                        }
                        else {
                            echo "valid";
                            if(isset($this->key)) {
                                $_SESSION['skey'] = $this->skey;
                                $_SESSION['key'] = $this->key;
                            }
                        }    
                    }
                    else {
                        exit("notverify");
                    }            
                }
                else {
                    echo "noexist";
                }
            }
            else {
                echo "end";
            }
        }
        public function rand_string($length) {
            return bin2hex(openssl_random_pseudo_bytes(32));;
        }
        private function generate_hash_pwd() {
            $options = array(
                'memory_cost' => 2048,
                'time_cost' => 1,
                'threads' => 1,
                'cost' => 12
            );
            return password_hash($this->password, PASSWORD_ARGON2I, $options);
        }
        private function verify_hash() {
            if(password_verify($this->password, $this->hash)) {
                return 1;
            } else {
              return 0;  
            }
        }
    }
?>