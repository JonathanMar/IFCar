<?php
try {   
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email_user = $_POST['email_user'];
        $password_user = $_POST['password_user'];
    
        // Gerando um hash de senha
        $hash_password_user = password_hash($password_user, PASSWORD_BCRYPT);

        $result = createAccount($db, $email_user, $hash_password_user);

        if ($result) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Mensagem de erro'));
        }
    }

} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>