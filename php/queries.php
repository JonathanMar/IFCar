<?php
// Verifica se a carona já foi cadastrada 
function checkIfRideExists($db, $address_ride, $time_ride, $max_quant_ride, $date_ride)
{
    // echo "Veridy rides..."; // Debug
    $stmt = $db->prepare("SELECT * FROM rides_tb WHERE address_ride = :address_ride AND time_ride = :time_ride AND max_quant_ride = :max_quant_ride AND date_ride = :date_ride");
    $stmt->bindParam(':address_ride', $address_ride);
    $stmt->bindParam(':time_ride', $time_ride);
    $stmt->bindParam(':max_quant_ride', $max_quant_ride);
    $stmt->bindParam(':date_ride', $date_ride);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Salva a carona no banco de dados
function insertRide($db, $address_ride, $time_ride, $max_quant_ride, $date_ride)
{
    // echo "Inserting ride..."; // Debug
    $stmt = $db->prepare("INSERT INTO rides_tb (address_ride, time_ride, max_quant_ride, date_ride) VALUES (:address_ride, :time_ride, :max_quant_ride, :date_ride)");
    $stmt->bindParam(':address_ride', $address_ride);
    $stmt->bindParam(':time_ride', $time_ride);
    $stmt->bindParam(':max_quant_ride', $max_quant_ride);
    $stmt->bindParam(':date_ride', $date_ride);
    $stmt->execute();
}

// Seleciona todas as caronas do banco de dados
function getAllRides($db)
{
    // echo "Selecting rides..."; // Debug
    $stmt = $db->prepare("SELECT * FROM rides_tb");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function updateAcceptedRide($db, $accepted_ride, $cod_ride)
{
    echo "Update accepted..."; // Debug
    $stmt_update = $db->prepare("UPDATE rides_tb SET accepted_ride = :accepted_ride WHERE cod_ride = :cod_ride");
    $stmt_update->bindParam(':accepted_ride', $accepted_ride);
    $stmt_update->bindParam(':cod_ride', $cod_ride);
    $stmt_update->execute();
}

function loginUser($db, $email_user, $password_user)
{
    // echo "Login user..."; // Debug
    $stmt_select = $db->prepare("SELECT email_user, password_user FROM users_tb WHERE email_user = :email_user AND password_user = :password_user");
    $stmt_select->bindParam(':email_user', $email_user);
    $stmt_select->bindParam(':password_user', $password_user);
    $stmt_select->execute();
    return $stmt_select->fetchAll(PDO::FETCH_ASSOC);
}
function createAccount($db, $email_user, $password_user)
{
    // echo "Create user..."; // Debug
    $stmt = $db->prepare('INSERT INTO users_tb (email_user, password_user) VALUES (:email_user, :password_user)');
    $stmt->bindParam(':email_user', $email_user);
    $stmt->bindParam(':password_user', $password_user);
    $stmt->execute();
    return true;
}

function address_ride_check($db, $address_id): ?array {
    $stmt = $db->prepare("SELECT * FROM address_ride WHERE cod_address = :address_id");
    $stmt->bindParam(':address_id', $address_id);
    $stmt->execute();
    $meeting_points = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $meeting_points;
}