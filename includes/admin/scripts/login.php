<?php
function login($email, $password) {
    $pdo = Database::getInstance()->getConnection();

    $getUser = 'SELECT COUNT(*) FROM tbl_user WHERE user_email =:email';
    $user = $pdo->prepare($getUser);
    $found_user = $user->execute(
        array(
            ':email'=>$email
        )
    );

    if($user->fetchColumn()>0){
        $matchPass = 'SELECT * FROM tbl_user WHERE user_email =:email AND user_pass =:password';
        $matching = $pdo->prepare($matchPass);
        $found_matched = $matching->execute(
            array(
                ':email'=>$email,
                ':password'=>$password
            )
        );

        if($row = $matching->fetch(PDO::FETCH_ASSOC)) {
            
            $users = array();

            $users['id'] = $row['user_id'];
            $users['fname'] = $row['user_fname'];
            $users['lname'] = $row['user_lname'];
            $users['email'] = $row['user_email'];
            // $users['password'] = $row['user_pass'];
            $users['avatar'] = $row['user_avatar'];
            $users['per'] = $row['user_permission'];
            $users['isAdmin'] = $row['user_admin'];
            
            return json_encode($users);

        } else {
            $msg = 'incorrect password';
            return json_encode($msg);
        }
    } else {
        $msg = 'user does not exist';
        return json_encode($msg);
    }
}