<?php
try {
    include('connection.php');
    include('queries.php');

    $result = getAllRides($db);

    if ($result) {
        foreach ($result as $row) {
            $max_quant_ride = $row['max_quant_ride'] - $row['accepted_ride'];
            // echo $max_quant_ride; // Debug

            if ($max_quant_ride > 0) {
                echo "<div class='carona-item'>";
                echo "Endereço: " . $row['address_ride'];
                echo "<br>";
                echo "Horario: " . substr($row['time_ride'], 0, 5);
                echo "<div class='aceitar_car'>";
                echo "Quantidade de Vagas: " . $max_quant_ride . ".";
                echo "<button class='aceitar_carona' data-id='" . $row['cod_ride'] . "'> Aceitar Carona </button>";
                echo "</div>";
                echo '</div>';
            } else {
                echo "<div class='carona-item'>";
                echo "Endereço: " . $row['address_ride'];
                echo "<br>";
                echo "Horario: " . substr($row['time_ride'], 0, 5);
                echo "<div class='aceitar_car'>";
                echo "<p>Todas as vagas desta carrona estão ocupadas!<p>";
                echo "</div>";
                echo '</div>';

            }
        }
    } else {
        echo "<div class='carona-item'>";
        echo "Nenhuma carona existente no momento!";
        
    }

    echo "<button id='voltar_pegCar' class='btn'>Voltar</button>";
    echo "</div>";

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>