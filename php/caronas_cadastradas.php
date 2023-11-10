<?php

try {
    include('connection.php');
    include('queries.php');

    $result = caronas_cadastradas($db);

    foreach ($result as $row) {

        if ($result) {
            echo "<div class='carona-item'>";
            echo "Endereço: " . $row['address_ride'];
            echo "<br>";
            echo "Horario: " . substr($row['time_ride'], 0, 5);
            echo "<div class='aceitar_car'>";
            echo "</div>";
            echo '</div>';
        } else {
            echo "<div class='carona-item'>";
            echo "<div class='aceitar_car'>";
            echo "<p>Nenhuma Carona Cadastrada!<p>";
            echo "</div>";
            echo '</div>';
        }
    }

    echo "<button id='voltar' class='btn'>Voltar</button>";
    echo "</div>";

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}

?>