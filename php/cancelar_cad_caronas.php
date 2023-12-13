<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["cod_ride"])) {
            $cod_ride = $_POST["cod_ride"];
            $result = cancel_carpool($conn, $cod_ride); // Alteração aqui

            if ($result) {
                echo "Carona cancelada com sucesso.";
            } else {
                echo "Erro ao cancelar a carona.";
            }
        } else {
            echo "Chave 'cod_ride' não está definida na requisição.";
        }
    }
} catch (PDOException $e) {
    echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
