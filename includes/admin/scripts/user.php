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
        $insert_new_query = "INSERT INTO tbl_user (user_fname, user_lname, user_password, user_email, user_avatar, user_admin, user_permission) VALUES (:fname, :lname, :password, :email, :avatar, :admin, :per);";
        $user_add = $pdo->prepare($insert_new_query);
        $create_user_result = $user_add->execute(
            array(
                'fname'=>$fname,
                ':lname'=>$lname,
                ':email'=>$email,
                ':password'=>$password,
                ':avatar'=>'simon.svg',
                ':admin'=>'1',
                ':per'=>'2'
            )
        );

        if($create_user_result) {

            while($row = $user_add->fetch(PDO::FETCH_ASSOC)) {
                $last_inserted_id = $pdo->lastInsertId();
                $newuser = array();
                $newuser['id'] = $last_inserted_id;
                $newuser['name'] = $row['user_fname'];
                $newuser['email'] = $row['user_email'];

                return json_encode($newuser);
            }
            
        } else {
            $msg = 'something went wrong with the sign up';
            return json_encode($msg);
        }
    } else {
        $msg = 'user already exist';
        return json_encode($msg);
    }
}

function check($email, $password) {
    $pdo = Database::getInstance()->getConnection();

    $get_user_query = 'SELECT * FROM tbl_user WHERE user_email =:email AND user_pass =:pass';
    $matched = $pdo->prepare($get_user_query);
    $result = $matched->execute(
        array(
            ':email'=>$email,
            ':pass'=>$password
        )
    );
    
    if($row = $matched->fetch(PDO::FETCH_ASSOC)) {
            
        $users = array();

        $users['id'] = $row['user_id'];
        
        return json_encode($users);

    } else {
        $msg = 'incorrect password';
        return json_encode($msg);
    }
}