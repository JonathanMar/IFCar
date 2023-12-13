<?php
$host = 'sql104.infinityfree.com';
$connname = 'if0_35439523_IFcar';
$user = 'if0_35439523';
$password = 'Zo2DguAovI9x51p';

try {
    $conn = new PDO("pgsql:host=$host;connname=$connname;user=$user;password=$password");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
