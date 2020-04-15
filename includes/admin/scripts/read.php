<?php

function getAll($tbl){
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT * FROM :tbl';
    $items = $pdo->prepare($get_item_query);
    $result = $items->execute(
        array(
            ':tbl'=>$tbl
        )
    );
    
    if($items){
        $result = array();

        while($row = $items->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}

function getAllK($tbl, $per){
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT * FROM '.$tbl. ' WHERE item_permission =:per';
    $items = $pdo->prepare($get_item_query);
    $result = $items->execute(
        array(
            ':per'=>$per
        )
    );
    
    if($items){
        $result = array();

        while($row = $items->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}

function getOneKo($tbl, $per) {
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT TOP 1 FROM '.$tbl.' WHERE item_permission =:per';
    $items = $pdo->prepare($get_item_query);
    $result = $items->execute(
        array(
            ':per'=>$per
        )
    );
    
    if($items){
        $result = array();

        while($row = $items->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}

function getOneF($tbl) {
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT TOP 1 FROM :tbl';
    $items = $pdo->prepare($get_item_query);
    $result = $items->execute(
        array(
            ':tbl'=>$tbl
        )
    );
    
    if($items){
        $result = array();

        while($row = $items->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}

function getOne($tbl, $id){
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT TOP 1 FROM '.$tbl. ' WHERE id =:id';
    $items = $pdo->prepare($get_item_query);
    $result = $items->execute(
        array(
            ':id'=>$id
        )
    );
    
    if($items){
        $result = array();

        while($row = $items->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        
        return $result;
    }else{
        return false;
    }
}