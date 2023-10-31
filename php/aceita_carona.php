<?php
echo "<script>console.log('Registro atualizado com sucesso PT3.');</script>";
try {
 include('connection.php');

 if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $cod = $_POST["cod"];
  $aceita = $_POST["aceita"];

  $stmt = $db->prepare("UPDATE caronas SET aceita = :aceita WHERE cod = :cod");
  $stmt->bindParam(':aceita', $novoValor);
  $stmt->bindParam(':cod', $idRegistro);

  $stmt->execute();

  echo "<script>console.log('Registro atualizado com sucesso PT4.');</script>";
 }
} catch (PDOException $e) {
  echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>