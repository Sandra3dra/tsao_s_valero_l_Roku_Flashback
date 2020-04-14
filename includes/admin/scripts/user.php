<?php

function getUser($conn) {
    $liveuser = $_POST["user_name"];

    $getUser = 'SELECT * FROM tbl_user WHERE user_name="' .$liveuser. '"';
    $runQuery = $conn->query($getUser);

    $result = array();

    while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {
        // push each row of data into our arry to make it easy to iterate over
        $result[] = $row;
    }

    return $result;
}

function getAllUsers($email){
    $pdo = Database::getInstance()->getConnection();

    $get_user_query = 'SELECT * FROM `tbl_user` WHERE email =:email';
    $users = $pdo->prepare($get_user_query);
    $result = $users->execute(
        array(
            ':email'=>$email
        )
    );

    if($result){
        return $result;
    }else{
        return false;
    }
}
