<?php

function getAll($tbl, $per){
    $pdo = Database::getInstance()->getConnection();

    $get_item_query = 'SELECT * FROM '.$tbl. ' WHERE permission =:per';
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

    $get_item_query = 'SELECT * FROM '.$tbl.' WHERE permission =:per LIMIT 1';
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

    $get_item_query = 'SELECT * FROM '.$tbl.' LIMIT 1';
    $items = $pdo->query($get_item_query);
    
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

    $get_item_query = 'SELECT * FROM '.$tbl. ' WHERE id =:id';
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