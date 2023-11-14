<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cod_ride'])) {
        $cod_ride = $_POST['cod_ride'];  

        $rideInfo = getRideInfo($db, $cod_ride);

        if ($rideInfo) {
            header('Content-Type: application/json');
            echo json_encode($rideInfo);
        } else {
            echo "Carona não encontrada.";
        }
    } else {
        echo json_encode(["error" => "Parâmetros inválidos na solicitação."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Erro ao obter informações da carona: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erro: " . $e->getMessage()]);
}
?>
