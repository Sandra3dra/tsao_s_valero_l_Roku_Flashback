<?php

require_once '../../load.php';

if (isset($_POST['useremail'])) {
    $email = trim($_POST['useremail']);
    $password = trim($_POST['password']);
    $result = login($email, $password);
    echo $result;
}