<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email_user = $_POST['email_user'];
        $password_user = $_POST['password_user'];

        // var_dump($_POST); // Debug

        loginUser($db, $email_user, $password_user);
    }

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>