<?php
try {
    include('connection.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $endereco = $_POST['endereco'];
        $hora = $_POST['hora'];
        $quant_max = $_POST['quant_max'];
        $data_cad = $_POST['data_cad'];

        // Verifica se a carona já existe
        $stmt = $db->prepare("SELECT * FROM caronas WHERE endereco = :endereco AND hora = :hora AND quant_max = :quant_max AND data_cad = :data_cad");
        $stmt->bindParam(':endereco', $endereco);
        $stmt->bindParam(':hora', $hora);
        $stmt->bindParam(':quant_max', $quant_max);
        $stmt->bindParam(':data_cad', $data_cad);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo "Esta carona já existe.";
        } else {
            $stmt = $db->prepare("INSERT INTO caronas (endereco, hora, quant_max) VALUES (:endereco, :hora, :quant_max)");
            $stmt->bindParam(':endereco', $endereco);
            $stmt->bindParam(':hora', $hora);
            $stmt->bindParam(':quant_max', $quant_max);
            $stmt->execute();
        }
    }
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>