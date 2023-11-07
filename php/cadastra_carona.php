<?php
try {
    include('connection.php');

    // Obter os dados do formulário
    $nome = $_POST['nome'];
    $hora = $_POST['hora'];
    $quant_max = $_POST['quant_max'];

    // Verificar se a carona já existe
    $stmt = $db->prepare("SELECT * FROM caronas WHERE nome = :nome AND hora = :hora AND quant_max = :quant_max");
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':hora', $hora);
    $stmt->bindParam(':quant_max', $quant_max);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo "Esta carona já existe.";
    } else {
        // Inserir a nova carona
        $stmt = $db->prepare("INSERT INTO caronas (nome, hora, quant_max) VALUES (:nome, :hora, :quant_max)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':hora', $hora);
        $stmt->bindParam(':quant_max', $quant_max);
        $stmt->execute();

        echo "Carona cadastrada com sucesso.";
    }

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
