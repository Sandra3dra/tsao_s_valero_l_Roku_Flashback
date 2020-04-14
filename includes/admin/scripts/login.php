<?php
function login($username, $password, $ip, $reqtime){
    // return sprintf('You are logging in with username=>%s, password=>%s', $username, $password);

    $pdo = Database::getInstance()->getConnection();

    // check existance  SELECT * FROM "tbl_user" WHERE "user_name" =' .$username 'AND "user_pass" =' .$password
    $check_exist_query = 'SELECT COUNT(*) FROM `tbl_user` WHERE user_name =:username';
    $user_set = $pdo->prepare($check_exist_query);
    $user_set->execute(
        array(
            ':username'=>$username
        )
    );

    if($user_set->fetchColumn()>0){
        // check if match
        $check_if_locked = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
        $user_lock = $pdo->prepare($check_if_locked);
        $user_lock->execute(
            array(
                ':username'=>$username
            )
        );
        while($founduser = $user_lock->fetch(PDO::FETCH_ASSOC)){
            $lock = $founduser['user_locked'];
            $fail_time = $founduser['user_fail_start'];
            $hash = $founduser['user_pass'];
            $hashed = substr( $hash, 0, 60 );
            // echo $hashP;
            // exit;
            $_SESSION['user_fname'] = $founduser['user_fname'];
            $newuser = $founduser['user_new'];
            $createtime = $founduser['user_newstart'];
            $newleft = strtotime($reqtime) - strtotime($createtime);
            $newcount = 86400 - $newleft;
            if($newuser === "N"){
                if($newcount <= 0){
                    $update_sus_query = 'UPDATE `tbl_user` SET user_sus =:suspended WHERE user_name =:username';
                    $sus_set = $pdo->prepare($update_sus_query);
                    $sus_set->execute(
                        array(
                            ':username'=>$username,
                            ':suspended'=>"SUSPENDED"
                        )
                    );
                    return '<p>Sorry, account suspended due to not logging in 24 housrs after being created.</p>';
                } else {
                    if($lock === "YES"){
                        // check lock time
                        $time_count = strtotime($reqtime) - strtotime($fail_time);
                        $time_left = 300 - $time_count;
                        if($time_left <= 0){
                            $check_match_query = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                            // $check_match_query .= ' AND user_pass=:password';
                            $user_match = $pdo->prepare($check_match_query);
                            $user_match->execute(
                                array(
                                    ':username'=>$username
                                    // ':password'=>$password
                                )
                            );
        
                            if(password_verify($password, $hashed)){
                                while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                                    $id = $founduser['user_id'];
                                    $lastlogin = $founduser['user_currentlogin'];
                                    $_SESSION['lastlogin'] = $lastlogin;
                                    $newuser = $founduser['user_new'];
                                    
                                    $update_current_query = 'UPDATE `tbl_user` SET user_currentlogin =:reqtime, user_lastlogin =:lasttime, user_ip =:ip, user_locked =:unlocked, user_fail_start =:emptytime, user_attempts =:zero_attempt WHERE user_id =:id';
                                    $current_set = $pdo->prepare($update_current_query);
                                    $current_set->execute(
                                        array(
                                            ':id'=>$id,
                                            ':reqtime'=>$reqtime,
                                            ':lasttime'=>$lastlogin,
                                            ':ip'=>$ip,
                                            ':unlocked'=>"NO",
                                            ':emptytime'=>$reqtime,
                                            ':zero_attempt'=>"0"
                                        )
                                    );
                                }
                                redirect_to('admin_edit_account.php');
                            } else {
                                $check_attempt = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                                $user_at = $pdo->prepare($check_attempt);
                                $user_at->execute(
                                    array(
                                        ':username'=>$username
                                    )
                                );
                                while($founduser = $user_at->fetch(PDO::FETCH_ASSOC)){
                                    $attempts = $founduser['user_attempts'];
                                    $id = $founduser['user_id'];
                                    $fail_time = $founduser['user_fail_start'];
                                    $time_left = strtotime($reqtime) - strtotime($fail_time);
                                    $time_left = 300 - $time_count;
                                    if($attempts < 2){
                                        $more_attempts = $attempts + 1;
                                        $left_attempt = 3 - $more_attempts;
                                        $update_add_attempt = 'UPDATE `tbl_user` SET user_attempts =:more_attempt WHERE user_id =:id';
                                        $add_attempt = $pdo->prepare($update_add_attempt);
                                        $add_attempt->execute(
                                            array(
                                                ':id'=>$id,
                                                ':more_attempt'=>$more_attempts
                                            )
                                        );
                                        return '<p>Wrong password, please try agian</p>
                                        <p>You have '.$left_attempt.' more attempts left.</p>';
                                    }else{
                                        // return 'Account Locked';
                                        $update_lock = 'UPDATE `tbl_user` SET user_locked =:locked, user_fail_start =:lockedtime WHERE user_id =:id';
                                        $lock_attempt = $pdo->prepare($update_lock);
                                        $lock_attempt->execute(
                                            array(
                                                ':id'=>$id,
                                                ':locked'=>"YES",
                                                ':lockedtime'=>$reqtime
                                            )
                                        );
                                        return '<p>Account locked</p>
                                        <p>you still have '.$time_left.' seconds until you can try again.</p>';
                                    }
                                }
                            }
                        }else{
                            return '<p>Account locked</p>
                            <p>you still have '.$time_left.' seconds until you can try again.</p>';
                        }
                    } else {
                        // if(password_verify($password, $hashed)){
                        //     echo password_hash($password, PASSWORD_DEFAULT);
                        //     echo $hashed;
                        //     exit;
                        // }else{
                        //     echo password_hash($password, PASSWORD_DEFAULT);
                        //     echo $hashed;
                        //     exit;
                        // }
                        $check_match_query = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                        // $check_match_query .= ' AND user_pass=:password';
                        $user_match = $pdo->prepare($check_match_query);
                        $user_match->execute(
                            array(
                                ':username'=>$username
                                // ':password'=>$password
                            )
                        );
        
                        if(password_verify($password, $hashed)){
                            while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                                $id = $founduser['user_id'];
                                $lastlogin = $founduser['user_currentlogin'];
                                $_SESSION['lastlogin'] = $lastlogin;
                                $_SESSION['user_id'] = $id;
                                $_SESSION['user_fname'] = $founduser['user_fname'];     
                                $newuser = $founduser['user_new'];                    
            
                                $update_current_query = 'UPDATE `tbl_user` SET user_currentlogin =:reqtime, user_lastlogin =:lasttime, user_ip =:ip, user_locked =:unlocked, user_fail_start =:emptytime, user_attempts =:zero_attempt WHERE user_id =:id';
                                $current_set = $pdo->prepare($update_current_query);
                                $current_set->execute(
                                    array(
                                        ':id'=>$id,
                                        ':reqtime'=>$reqtime,
                                        ':lasttime'=>$lastlogin,
                                        ':ip'=>$ip,
                                        ':unlocked'=>"NO",
                                        ':emptytime'=>$reqtime,
                                        ':zero_attempt'=>"0"
                                    )
                                );
                            }
                            redirect_to('admin_edit_account.php');
                        } else {
                            $check_attempt = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                            $user_at = $pdo->prepare($check_attempt);
                            $user_at->execute(
                                array(
                                    ':username'=>$username
                                )
                            );
                            while($founduser = $user_at->fetch(PDO::FETCH_ASSOC)){
                                $attempts = $founduser['user_attempts'];
                                $id = $founduser['user_id'];
                                $fail_time = $founduser['user_fail_start'];
                                $time_count = strtotime($reqtime) - strtotime($fail_time);
                                $time_left = 300 - $time_count;
                                if($attempts < 2){
                                    $more_attempts = $attempts + 1;
                                    $left_attempt = 3 - $more_attempts;
                                    $update_add_attempt = 'UPDATE `tbl_user` SET user_attempts =:more_attempt WHERE user_id =:id';
                                    $add_attempt = $pdo->prepare($update_add_attempt);
                                    $add_attempt->execute(
                                        array(
                                            ':id'=>$id,
                                            ':more_attempt'=>$more_attempts
                                        )
                                    );
                                    return '<p>Wrong password, please try agian</p>
                                    <p>You have '.$left_attempt.' more attempts left.</p>';
                                }else{
                                    // return 'Account Locked';
                                    $update_lock = 'UPDATE `tbl_user` SET user_locked =:locked, user_fail_start =:lockedtime WHERE user_id =:id';
                                    $lock_attempt = $pdo->prepare($update_lock);
                                    $lock_attempt->execute(
                                        array(
                                            ':id'=>$id,
                                            ':locked'=>"YES",
                                            ':lockedtime'=>$reqtime
                                        )
                                    );
                                    return '<p>Account locked</p>
                                    <p>you still have '.$time_left.' seconds until you can try again.</p>';
                                }
                            }
                        }
                    }
                }
            } else {
                if($lock === "YES"){
                    // check lock time
                    $time_count = strtotime($reqtime) - strtotime($fail_time);
                    $time_left = 300 - $time_count;
                    if($time_left <= 0){
                        $check_match_query = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                        // $check_match_query .= ' AND user_pass=:password';
                        $user_match = $pdo->prepare($check_match_query);
                        $user_match->execute(
                            array(
                                ':username'=>$username
                                // ':password'=>$password
                            )
                        );
    
                        if(password_verify($password, $hashed)){
                            while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                                $id = $founduser['user_id'];
                                $lastlogin = $founduser['user_currentlogin'];
                                $_SESSION['lastlogin'] = $lastlogin;
                                $newuser = $founduser['user_new'];
                                
                                $update_current_query = 'UPDATE `tbl_user` SET user_currentlogin =:reqtime, user_lastlogin =:lasttime, user_ip =:ip, user_locked =:unlocked, user_fail_start =:emptytime, user_attempts =:zero_attempt WHERE user_id =:id';
                                $current_set = $pdo->prepare($update_current_query);
                                $current_set->execute(
                                    array(
                                        ':id'=>$id,
                                        ':reqtime'=>$reqtime,
                                        ':lasttime'=>$lastlogin,
                                        ':ip'=>$ip,
                                        ':unlocked'=>"NO",
                                        ':emptytime'=>$reqtime,
                                        ':zero_attempt'=>"0"
                                    )
                                );
                            }
                            redirect_to('index.php');
                        } else {
                            $check_attempt = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                            $user_at = $pdo->prepare($check_attempt);
                            $user_at->execute(
                                array(
                                    ':username'=>$username
                                )
                            );
                            while($founduser = $user_at->fetch(PDO::FETCH_ASSOC)){
                                $attempts = $founduser['user_attempts'];
                                $id = $founduser['user_id'];
                                $fail_time = $founduser['user_fail_start'];
                                $time_left = strtotime($reqtime) - strtotime($fail_time);
                                $time_left = 300 - $time_count;
                                if($attempts < 2){
                                    $more_attempts = $attempts + 1;
                                    $left_attempt = 3 - $more_attempts;
                                    $update_add_attempt = 'UPDATE `tbl_user` SET user_attempts =:more_attempt WHERE user_id =:id';
                                    $add_attempt = $pdo->prepare($update_add_attempt);
                                    $add_attempt->execute(
                                        array(
                                            ':id'=>$id,
                                            ':more_attempt'=>$more_attempts
                                        )
                                    );
                                    return '<p>Wrong password, please try agian</p>
                                    <p>You have '.$left_attempt.' more attempts left.</p>';
                                }else{
                                    // return 'Account Locked';
                                    $update_lock = 'UPDATE `tbl_user` SET user_locked =:locked, user_fail_start =:lockedtime WHERE user_id =:id';
                                    $lock_attempt = $pdo->prepare($update_lock);
                                    $lock_attempt->execute(
                                        array(
                                            ':id'=>$id,
                                            ':locked'=>"YES",
                                            ':lockedtime'=>$reqtime
                                        )
                                    );
                                    return '<p>Account locked</p>
                                    <p>you still have '.$time_left.' seconds until you can try again.</p>';
                                }
                            }
                            
                        }
                        
                    }else{
                        return '<p>Account locked</p>
                        <p>you still have '.$time_left.' seconds until you can try again.</p>';
                    }
                } else {
                    // if(password_verify($password, $hashed)){
                    //     echo password_hash($password, PASSWORD_DEFAULT);
                    //     echo $hashed;
                    //     exit;
                    // }else{
                    //     echo password_hash($password, PASSWORD_DEFAULT);
                    //     echo $hashed;
                    //     exit;
                    // }
                    $check_match_query = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                    // $check_match_query .= ' AND user_pass=:password';
                    $user_match = $pdo->prepare($check_match_query);
                    $user_match->execute(
                        array(
                            ':username'=>$username
                            // ':password'=>$password
                        )
                    );
    
                    if(password_verify($password, $hashed)){
                        while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                            $id = $founduser['user_id'];
                            $lastlogin = $founduser['user_currentlogin'];
                            $_SESSION['lastlogin'] = $lastlogin;
                            $_SESSION['user_id'] = $id;
                            $_SESSION['user_fname'] = $founduser['user_fname'];     
                            $newuser = $founduser['user_new'];                    
        
                            $update_current_query = 'UPDATE `tbl_user` SET user_currentlogin =:reqtime, user_lastlogin =:lasttime, user_ip =:ip, user_locked =:unlocked, user_fail_start =:emptytime, user_attempts =:zero_attempt WHERE user_id =:id';
                            $current_set = $pdo->prepare($update_current_query);
                            $current_set->execute(
                                array(
                                    ':id'=>$id,
                                    ':reqtime'=>$reqtime,
                                    ':lasttime'=>$lastlogin,
                                    ':ip'=>$ip,
                                    ':unlocked'=>"NO",
                                    ':emptytime'=>$reqtime,
                                    ':zero_attempt'=>"0"
                                )
                            );
                        }
                        redirect_to('index.php');  
                    } else {
                        $check_attempt = 'SELECT * FROM `tbl_user` WHERE user_name =:username';
                        $user_at = $pdo->prepare($check_attempt);
                        $user_at->execute(
                            array(
                                ':username'=>$username
                            )
                        );
                        while($founduser = $user_at->fetch(PDO::FETCH_ASSOC)){
                            $attempts = $founduser['user_attempts'];
                            $id = $founduser['user_id'];
                            $fail_time = $founduser['user_fail_start'];
                            $time_count = strtotime($reqtime) - strtotime($fail_time);
                            $time_left = 300 - $time_count;
                            if($attempts < 2){
                                $more_attempts = $attempts + 1;
                                $left_attempt = 3 - $more_attempts;
                                $update_add_attempt = 'UPDATE `tbl_user` SET user_attempts =:more_attempt WHERE user_id =:id';
                                $add_attempt = $pdo->prepare($update_add_attempt);
                                $add_attempt->execute(
                                    array(
                                        ':id'=>$id,
                                        ':more_attempt'=>$more_attempts
                                    )
                                );
                                return '<p>Wrong password, please try agian</p>
                                <p>You have '.$left_attempt.' more attempts left.</p>';
                            }else{
                                // return 'Account Locked';
                                $update_lock = 'UPDATE `tbl_user` SET user_locked =:locked, user_fail_start =:lockedtime WHERE user_id =:id';
                                $lock_attempt = $pdo->prepare($update_lock);
                                $lock_attempt->execute(
                                    array(
                                        ':id'=>$id,
                                        ':locked'=>"YES",
                                        ':lockedtime'=>$reqtime
                                    )
                                );
                                return '<p>Account locked</p>
                                <p>you still have '.$time_left.' seconds until you can try again.</p>';
                            }
                        }
                    }
                }
            }
        }
    }else{
        return '<p>User does not exist</p>
        <p>Would you like to <a href="admin_signup.php">sign up</a>?</p>';
    }

}

function confirm_logged_in() {
    if(!isset($_SESSION['user_id'])){
        redirect_to('admin_login.php');
    }
}

function logout() {
    session_destroy();
    redirect_to('admin_login.php');
}