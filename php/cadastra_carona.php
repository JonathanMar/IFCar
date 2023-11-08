<?php

try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $address_ride = $_POST['address_ride'];
        $time_ride = $_POST['time_ride'];
        $max_quant_ride = $_POST['max_quant_ride'];
        $date_ride = $_POST['date_ride'];

        // var_dump($_POST); // Debug

        // Verifica se a carona já existe
        $result = checkIfRideExists($db, $address_ride, $time_ride, $max_quant_ride, $date_ride);

        if ($result) {
            echo "Esta carona já existe.";

            // echo "<div class=\'return'>";
            //     echo "Está carona já foi cadastrada!";
            // echo "</div>";
        } else {
            // Insere a carona no banco de dados
            insertRide($db, $address_ride, $time_ride, $max_quant_ride, $date_ride);
        }
    }
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>