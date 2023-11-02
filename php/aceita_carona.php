<?php
try {
    include('connection.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $cod = $_POST["cod"];

        $stmt_select = $db->prepare("SELECT aceita FROM caronas WHERE cod = :cod");
        $stmt_select->bindParam(':cod', $cod);
        $stmt_select->execute();
        $row = $stmt_select->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $aceita = $row['aceita'] + 1;
            $stmt_update = $db->prepare("UPDATE caronas SET aceita = :aceita WHERE cod = :cod");
            $stmt_update->bindParam(':aceita', $aceita);
            $stmt_update->bindParam(':cod', $cod);
            $stmt_update->execute();

            echo "<script>console.log('Registro atualizado com sucesso PT4.');</script>";
        } else {
            echo "<script>console.error('Registro não encontrado.');</script>";
        }
    }
} catch (PDOException $e) {
    echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>
