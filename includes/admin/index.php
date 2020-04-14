<?php

require_once '../../load.php';

if (isset($_GET['tbl_user'])) {
    $result = getUser($pdo);
}

if (isset($_GET['all_user'])) {
    $result = getAllUsers($email);
}

echo json_encode($result);