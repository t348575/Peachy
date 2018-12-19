<?php
    class create_link {
        private $email, $time, $type;
        public $num;
        function __construct($par1, $par2, $par3) {
            $this->email = $par1;
            $this->time = $par2;
            $this->type = $par3;
        }
        public function re_try() {
            require_once('connect_read.php');
            $this->num = $this->random_code();
            $db = new mysqli($db_host,$db_user, $db_password, $db_name);
            if ($db->connect_errno) {
                echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
            }
            $search = 'SELECT * FROM links WHERE link=?';
            $query = $db->prepare($search);
            $query->bind_param('s', $this->num);
            $query->execute();
            $result = $query->get_result();
            $row_cnt = $result->num_rows;
            if($row_cnt==0) {
                require_once('connect_write.php');
                $dbw = new mysqli($db_host,$db_user, $db_password, $db_name);
                if ($dbw->connect_errno) {
                    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
                }   
                $addlink = 'INSERT INTO links VALUES(?,?,?,?)';
                $query = $dbw->prepare($addlink);
                $query->bind_param('ssss', $this->email, $this->num, $this->time, $this->type);
                $query->execute();
                $addtotal = 'UPDATE users SET total=total+1 WHERE email=?';
                $query1 = $dbw->prepare($addtotal);
                $query1->bind_param('s', $this->email);
                $query1->execute();
            }
            else {
                $this->re_try();
            }
        }
        public function random_code() {
            return bin2hex(openssl_random_pseudo_bytes(4));
        }
    }
?>