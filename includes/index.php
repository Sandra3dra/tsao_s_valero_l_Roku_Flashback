<?php

require('functions.php');

if (isset($_GET['tbl_user'])) {
    $user = getUser($pdo);
}

echo json_encode($user);