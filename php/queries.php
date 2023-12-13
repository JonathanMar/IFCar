<?php
// Verifica se a carona já foi cadastrada 
function checkIfRideExists($conn, $address_ride, $time_ride, $max_quant_ride)
{
    $stmt = $conn->prepare("SELECT * FROM rides_tb WHERE address_ride = ? AND time_ride = ? AND max_quant_ride = ?");
    $stmt->bind_param('sss', $address_ride, $time_ride, $max_quant_ride);

    if (!$stmt->execute()) {
        die('Erro na execução da query de seleção: ' . $stmt->error);
    }

    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Salva a carona no banco de dados
function insertRide($conn, $address_ride, $time_ride, $max_quant_ride, $date_ride)
{
    $stmt = $conn->prepare("INSERT INTO rides_tb (address_ride, time_ride, max_quant_ride, date_ride) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $address_ride, $time_ride, $max_quant_ride, $date_ride);

    if (!$stmt->execute()) {
        die('Erro na execução da query de inserção: ' . $stmt->error);
    }
}

// Seleciona todas as caronas do banco de dados
function getAllRides($conn)
{
    $stmt = $conn->prepare("SELECT * FROM rides_tb WHERE status_ride > 0");
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Seleciona a carona pelo cod_ride
function getRideInfo($conn, $cod_ride)
{
    $stmt = $conn->prepare("SELECT * FROM rides_tb WHERE cod_ride = ?");
    $stmt->bind_param('s', $cod_ride);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Atualiza a quantidade de carona aceita
function updateAcceptedRide($conn, $accepted_ride, $cod_ride)
{
    $stmt_update = $conn->prepare("UPDATE rides_tb SET accepted_ride = ? WHERE cod_ride = ?");
    $stmt_update->bind_param('ss', $accepted_ride, $cod_ride);
    $stmt_update->execute();
}

// Faz o login do usuário
function selectUser($conn, $email_user)
{
    $stmt_select = $conn->prepare("SELECT email_user FROM users_tb WHERE email_user = ?");
    $stmt_select->bind_param('s', $email_user);
    $stmt_select->execute();
    return $stmt_select->get_result();
}

// Criar a conta
function createAccount($conn, $email_user, $password_user)
{
    $stmt = $conn->prepare('INSERT INTO users_tb (email_user, password_user) VALUES (?, ?)');
    $stmt->bind_param('ss', $email_user, $password_user);
    return $stmt->execute();
}

function getPasswordHashByEmail($conn, $email_user)
{
    $stmt_select = $conn->prepare("SELECT password_user FROM users_tb WHERE email_user = ?");
    $stmt_select->bind_param('s', $email_user);
    $stmt_select->execute();
    $result = $stmt_select->get_result();
    $row = $result->fetch_assoc();

    return $row['password_user'] ?? null;
}

function address_ride_check($conn, $address_id)
{
    $stmt = $conn->prepare("SELECT * FROM address_ride WHERE cod_address = ?");
    $stmt->bind_param('s', $address_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $meeting_points = $result->fetch_all(MYSQLI_ASSOC);

    return $meeting_points;
}

function accepted_ride_list($conn)
{
    $stmt_select = $conn->prepare("SELECT * FROM rides_tb WHERE accepted_ride > 0");
    $stmt_select->execute();
    $result = $stmt_select->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

function cancel_carpool($conn, $cod_ride)
{
    $stmt = $conn->prepare("UPDATE rides_tb SET status_ride = 0 WHERE cod_ride = ?");
    $stmt->bind_param('s', $cod_ride);
    $stmt->execute();
}
?>
