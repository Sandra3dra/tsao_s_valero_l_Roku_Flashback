<?php
class Database
{
    // private $host = "us-cdbr-east-06.cleardb.net";

    // private $db_name = "heroku_300f1009dd8ccad";

    // private $username = "bddeedd8d251db";

    // private $password = "ccc90f52";

    private $host = "localhost";

    private $db_name = "db_roku_flashback";

    private $username = "root";

    private $password = "root";

    private static $instance = null;
    public $conn;

    private function __construct(){
        $db_dsn = array(
            'host'    => $this->host,
            'dbname'  => $this->db_name,
            'charset' => 'utf8',
        );

        try {
            $dsn        = 'mysql:' . http_build_query($db_dsn, '', ';');
            $this->conn = new PDO($dsn, $this->username, $this->password);
        } catch (PDOException $exception) {
            echo json_encode(
                array(
                    'error'   => 'Database connection failed',
                    'message' => $exception->getMessage(),
                )
            );
            exit;
        }
    }

    public static function getInstance(){
        if(!self::$instance){
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
