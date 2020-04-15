<?php

require_once '../../load.php';

if (isset($_POST['email'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $result = check($email, $password);
    echo $result;
}