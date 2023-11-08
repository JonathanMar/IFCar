<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $cod_ride = $_POST["cod_ride"];

        $result = acceptedRide($db, $cod_ride);

        foreach ($result as $row) {
            $aceita = $row['accepted_ride'] + 1;
            if ($result) {
                $stmt_update = $db->prepare("UPDATE rides_tb SET accepted_ride = :accepted_ride WHERE cod_ride = :cod_ride");
                $stmt_update->bindParam(':accepted_ride', $accepted_ride);
                $stmt_update->bindParam(':cod_ride', $cod_ride);
                $stmt_update->execute();

            } else {
                echo "Registro não encontrado.";
            }

        }
    }
} catch (PDOException $e) {
    echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>