<?php
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $endereco = $_POST['endereco'];
    $hora = $_POST['hora'];

    try {
        $stmt = $db->prepare("INSERT INTO caronas (endereco, hora) VALUES (:endereco, :hora)");
        $stmt->bindParam(':endereco', $endereco);
        $stmt->bindParam(':hora', $hora);
        $stmt->execute();

        echo "Dados cadastrados com sucesso!";
    } catch (PDOException $e) {
        echo "Erro ao cadastrar os dados: " . $e->getMessage();
    }
}
?>
