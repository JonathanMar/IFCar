<?php
try {
    include('connection.php');

    $stmt = $db->prepare("SELECT * FROM caronas");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        foreach ($result as $row) {
            $total_vagas = $row['quant_max'] - $row['aceita'];
            if ($total_vagas > 0) {
            echo "<div class='carona-item'>"; 
                echo "Endereço: " . $row['endereco'] . ", Horario: " . substr($row['hora'], 0, 5);
                echo "<div>";
                echo "Quantidade de Vagas: " . $total_vagas . ".";
                echo "<button class='aceitar_carona' data-id='" . $row['cod'] . "'> Aceitar Carona </button>";
                    // echo "COD: " . $row['cod'] . " "; Mostra o código de cada registro (Debug)
                echo "</div>";
            echo '</div>';
        } else {
            echo "<div class='carona-item'>"; 
            echo "Endereço: " . $row['endereco'] . ", Horario: " . substr($row['hora'], 0, 5);
            echo "<div>";
            echo "<p>Todas as vagas desta carrona estão ocupadas!<p>";
                // echo "COD: " . $row['cod'] . " "; Mostra o código de cada registro (Debug)
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
