<?php
try {
 include('connection.php');

 $cod = $_POST["cod"];
 $aceita = $_POST["aceita"];

 $stmt = $db->prepare("UPDATE caronas SET aceita = :aceita WHERE cod = :cod");
 $stmt->bindParam(':aceita', $novoValor);
 $stmt->bindParam(':cod', $idRegistro);

 $stmt->execute();

 echo "Registro atualizado com sucesso PT2";
} catch (PDOException $e) {
  echo "Erro ao atualizar o registro: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>