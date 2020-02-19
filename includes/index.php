<?php

require('functions.php');

if (isset($_GET['user'])) {
    $user = getUser($pdo);
}

echo json_encode($user);