<?php

require_once '../../load.php';

if (isset($_POST['submit'])) {
    $fname = trim($_POST['fname']);
    $lname = trim($_POST['lname']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $result = createUser($fname, $lname, $email, $password);
    echo $result;
}