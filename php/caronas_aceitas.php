<?php

try {
    include('connection.php');
    include('queries.php');

    // Verifica se a carona já existe
    $result = accepted_ride_list($db);

    if ($result) {
        foreach ($result as $row) {
            echo "<div class='carona-item'>";
            echo "Endereço: " . $row['address_ride'];
            echo "<br>";
            echo "Horario: " . substr($row['time_ride'], 0, 5);
            echo "<div class='aceitar_car'>";
            echo "Carona Aceita";
            echo "<button class='cancelar_carona' data-id='" . $row['cod_ride'] . "'> Cancelar Carona </button>";
            echo "</div>";

            // echo "cod_ride: " . $row['cod_ride'] . " "; // Mostra o código de cada registro (Debug)
            echo '</div>';

        }

    } else {
        echo "<div class='carona-item'>";
        echo "Nenhuma Carona Aceita até o Momento!";

    }

    echo "<button id='voltar_pegCar' class='btn'>Voltar</button>";
    echo "</div>";

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>