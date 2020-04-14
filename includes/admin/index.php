<?php

require_once '../../load.php';

if (isset($_GET['all_user'])) {
    $email = trim($_GET['email']);
    $per = trim($_GET['per']);
    $result = getAllUsers($email);
}

echo json_encode($result);