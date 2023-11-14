<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $cod_ride = $_POST["cod_ride"];
        $result = getAllRides($db);

        if ($result) {
            cancel_carpool($db, $cod_ride);
            echo "Carona cancelada com sucesso.";
        } else {
            echo "Registro não encontrado.";
        }
    }
} catch (PDOException $e) {
    echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>