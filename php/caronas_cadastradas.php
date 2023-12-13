<?php
try {
    include('connection.php');
    include('queries.php');

    $result = getAllRides($conn);

    if ($result) {
        foreach ($result as $row) {
            echo "<div class='carona-item'>";
            echo "Endereço: " . $row['address_ride'];
            echo "<br>";
            echo "Horário: " . substr($row['time_ride'], 0, 5);
            echo "<br>";
            echo "Quantidade de Vagas: " . $row['max_quant_ride'];
            echo "<br>";
            echo "Data Cadastro: " . $row['date_ride'];
            echo "<div class='aceitar_car'>";

            if (isset($row['cod_ride'])) {
                echo "Vagas Aceitas: " . $row['accepted_ride'];
                // echo "<button class='aceitar_carona' id='btn_edit' data-id='" . $row['cod_ride'] . "'> Editar </button>";
                echo "<button class='aceitar_carona' id='btn_cancel' data-id='" . $row['cod_ride'] . "'> Cancelar </button>";
            } else {
                // Lidar com o caso em que 'cod_ride' não está definido
                echo "Erro: Chave 'cod_ride' não definida.";
            }

            echo "</div>";
            echo '</div>';
        }
    } else {
        echo "<div class='carona-item'>";
        echo "<div class='aceitar_car'>";
        echo "<p>Nenhuma Carona Cadastrada!<p>";
        echo "</div>";
        echo '</div>';
    }

    echo "<button id='voltar_btn' class='btn'>Voltar</button>";
    echo "</div>";

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>