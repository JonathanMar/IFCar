<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $cod_ride = $_POST["cod_ride"];
        echo $cod_ride;
    
        $result = acceptedRide($db, $cod_ride, $accepted_ride);

        if ($result) {
            foreach ($result as $row) {
                $new_accepted_ride = $row['accepted_ride'] + 1;
                updateAcceptedRide($db, $new_accepted_ride, $cod_ride); 
                echo $new_accepted_ride; 
                echo $cod_ride;
            }
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
