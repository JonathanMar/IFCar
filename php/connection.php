<?php
$host = 'localhost';
$dbname = 'ifcar';
$user = 'root';
$password = 'Mnejet15+EenIF';

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname;user=$user;password=$password");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão bem sucedida!";
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
