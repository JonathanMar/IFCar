<?php
$host = 'localhost';
$connname = 'IFcar';
$user = 'postgres';
$password = '1234567';

// Conectar ao banco de dados
$conn = new mysqli($host, $user, $password, $connname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Definir o modo de erro para lançar exceções em caso de erros
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
?>
