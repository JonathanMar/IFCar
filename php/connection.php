<?php
$host = 'localhost';
$dbname = 'ifcar';
$user = 'postgres';
$password = 'Mnejet15+EenIF';

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname;user=$user;password=$password");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
