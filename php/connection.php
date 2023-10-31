<?php
$host = 'localhost';
$dbname = 'ifcar';
$user = 'postgres';
$password = '1234567';

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname;user=$user;password=$password");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
