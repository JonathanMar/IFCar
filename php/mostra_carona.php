<?php
try {
    include('connection.php');
    include('queries.php');

    $result = getAllRides($db);

    if ($result) {
        foreach ($result as $row) {
            $max_quant_ride = $row['max_quant_ride'] - $row['accepted_ride'];
            if ($max_quant_ride > 0) {
            echo "<div class='carona-item'>"; 
                echo "Endereço: " . $row['address_ride'] . ", Horario: " . substr($row['time_ride'], 0, 5);
                echo "<div>";
                echo "Quantidade de Vagas: " . $max_quant_ride . ".";
                echo "<button class='accepted_rider_carona' data-id='" . $row['cod_ride'] . "'> Aceitar Carona </button>";
                    // echo "cod_ride: " . $row['cod_ride'] . " "; Mostra o código de cada registro (Debug)
                echo "</div>";
            echo '</div>';
        } else {
            echo "<div class='carona-item'>"; 
            echo "Endereço: " . $row['address_ride'] . ", Horario: " . substr($row['time_ride'], 0, 5);
            echo "<div>";
            echo "<p>Todas as vagas desta carrona estão ocupadas!<p>";
                // echo "cod_ride: " . $row['cod_ride'] . " "; Mostra o código de cada registro (Debug)
            echo "</div>";
        echo '</div>';
            
        }
    }
    } else {
        echo "Nenhuma carona existente no momento!";
    }

    echo "<button id='voltar_pegCar'>Voltar</button>";

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
