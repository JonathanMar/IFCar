<?php
try {
    include('connection.php');

    $stmt = $db->prepare("SELECT * FROM caronas");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        foreach ($result as $row) {
            echo "<div class='carona-item'>"; 
                echo "Endereço: " . $row['endereco'] . ", Hora: " . $row['hora'];
                echo "<div class='button'>";
                    echo "<button class='aceitar_carona' data-id='" . $row['cod'] . "'> Aceitar Carona </button>";
                echo "COD: " . $row['cod'] . " ";
                echo "</div>";
                echo "<button type='button' id='btn_voltar'>Voltar</button>";
            echo '</div>';         }
    } else {
        echo "Nenhuma carona existente no momento!";
    }
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
