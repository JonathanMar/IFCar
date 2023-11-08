<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email_user = $_POST['email_user'];
        $password_user = $_POST['password_user'];

        // Gerando um hash de senha
        $hash_password_user = password_hash($password_user, PASSWORD_BCRYPT);
        
        $result = loginUser($db, $email_user, $hash_password_user);

        if (!empty($result)) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false));
        }
    }

} catch (PDOException $e) {
    echo json_encode(array('success' => false, 'message' => "Erro na conexão: " . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => "Erro: " . $e->getMessage()));
}
?>