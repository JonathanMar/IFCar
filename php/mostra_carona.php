<?php
try {
    include('connection.php');

    $stmt = $db->prepare("SELECT * FROM caronas");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        foreach ($result as $row) {
            echo "<div class='carona-item' data-id='" . $row['cod'] . "'>"; 
            echo "Endereço: " . $row['endereco'] . ", Hora: " . $row['hora'];
            echo "<div class='button'>";
            echo "<button id='aceitar_carona'> Aceitar Carona </button>";
            echo "</div>";
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
