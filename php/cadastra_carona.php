<?php
try {
    include('connection.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $endereco = $_POST['endereco'];
        $hora = $_POST['hora'];

        $stmt = $db->prepare("INSERT INTO caronas (endereco, hora) VALUES (:endereco, :hora)");
        $stmt->bindParam(':endereco', $endereco);
        $stmt->bindParam(':hora', $hora);
        $stmt->execute();

        header('Location: ../index.html');
        exit();
    }
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
