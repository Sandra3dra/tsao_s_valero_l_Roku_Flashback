<?php

require_once '../../load.php';

if (isset($_GET['all_user'])) {
    $email = trim($_GET['email']);
    $per = trim($_GET['per']);
    $result = getAllUsers($email, $per);
}

if (isset($_GET['all_items'])) {
    $tbl = trim($_GET['tbl']);
    $result = getAll($tbl);
}

if (isset($_GET['all_k_items'])) {
    $tbl = trim($_GET['tbl']);
    $per = trim($_GET['per']);
    $result = getAllK($tbl, $per);
}

if (isset($_GET['one_ko_item'])) {
    $tbl = trim($_GET['tbl']);
    $per = trim($_GET['per']);
    $result = getOneKo($tbl, $per);
}

if (isset($_GET['one_f_item'])) {
    $tbl = trim($_GET['tbl']);
    $result = getOneF($tbl);
}

if (isset($_GET['one_item'])) {
    $tbl = trim($_GET['tbl']);
    $id = trim($_GET['id']);
    $result = getOne($tbl, $id);
}

echo json_encode($result);