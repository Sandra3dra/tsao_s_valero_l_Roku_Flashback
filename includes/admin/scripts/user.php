<?php

function getAllUsers($email, $per){
    $pdo = Database::getInstance()->getConnection();

    $get_user_query = 'SELECT * FROM tbl_user WHERE user_email =:email AND user_permission =:per';
    $users = $pdo->prepare($get_user_query);
    $result = $users->execute(
        array(
            ':email'=>$email,
            ':per'=>$per
        )
    );
    
    if($users){
        $result = array();

        while($row = $users->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}

function createUser($fname, $lname, $email, $password) {
    $pdo = Database::getInstance()->getConnection();

    $getUser = 'SELECT COUNT(*) FROM `tbl_user` WHERE user_email =:email';
    $user = $pdo->prepare($getUser);
    $found_user = $user->execute(
        array(
            ':email'=>$email
        )
    );

    if($found_user->fetchColumn()<=0){
        $insert_new_query = "INSERT INTO tbl_user (user_fname, user_lname, user_email, user_password) VALUES (:fname, :lname, :email, :password);";
        $user_add = $pdo->prepare($insert_new_query);
        $create_user_result = $user_add->execute(
            array(
                'fname'=>$fname,
                ':lname'=>$lname,
                ':email'=>$email,
                ':password'=>$password
            )
        );

        if($create_user_result) {
            $create_user_result = array();

            while($row = $user_add->fetch(PDO::FETCH_ASSOC)) {
                $create_user_result[] = $row;
            }

            return $create_user_result;
        } else {
            $msg = 'something went wrong with the sign up';
            return $msg;
        }
    } else {
        $msg = 'user already exist';
        return $msg;
    }
}