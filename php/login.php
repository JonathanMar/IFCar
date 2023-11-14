<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Verifique se os campos foram enviados
        if (isset($_POST['email_user']) && isset($_POST['password_user'])) {
            $email_user = $_POST['email_user'];
            $password_user = $_POST['password_user'];

            // Verifique se os campos não estão vazios
            if (!empty($email_user) && !empty($password_user)) {
                // Busque o hash de senha correspondente ao email do usuário no banco de dados
                $hash_password_user = getPasswordHashByEmail($db, $email_user);

                if (!empty($hash_password_user)) {
                    // Verifique se a senha fornecida corresponde ao hash
                    if (password_verify($password_user, $hash_password_user)) {
                        echo json_encode(array('success' => true));
                    } else {
                        echo json_encode(array('success' => false, 'message' => 'Senha incorreta'));
                    }
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Usuário não encontrado'));
                }
            } else {
                echo json_encode(array('success' => false, 'message' => 'Por favor, preencha todos os campos'));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Campos ausentes no envio'));
        }
    }

} catch (PDOException $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro na conexão: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro: ' . $e->getMessage()));
}
?>
