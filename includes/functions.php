<?php

require('connect.php');

function getUser($conn) {
    $getUser = 'SELECT * FROM users';
    $runQuery = $conn->query($getUser);

    $result = array();

    while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {
        $result[] = $row;
    }

    return $result;
}
