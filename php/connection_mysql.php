<?php
$host = 'sql104.infinityfree.com';
$dbname = 'if0_35439523_IFcar';
$user = 'if0_35439523';
$password = 'Zo2DguAovI9x51p';

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname;user=$user;password=$password");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
