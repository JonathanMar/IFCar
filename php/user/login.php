<?php
session_start();

try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['email_user']) && isset($_POST['password_user'])) {
            $email_user = $_POST['email_user'];
            $password_user = $_POST['password_user'];

            if (!empty($email_user) && !empty($password_user)) {
                $hash_password_user = getPasswordHashByEmail($conn, $email_user);

                if (!empty($hash_password_user)) {
                    if (password_verify($password_user, $hash_password_user)) {
                        $usuarioAutenticado = true;

                        $_SESSION['user_id'] = $email_user;

                        echo json_encode(array('success' => true));
                        exit(); // Importante sair do script após enviar a resposta JSON bem-sucedida
                    } else {
                        echo json_encode(array('success' => false, 'message' => 'Senha incorreta'));
                        exit();
                    }
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Usuário não encontrado'));
                    exit();
                }
            } else {
                echo json_encode(array('success' => false, 'message' => 'Por favor, preencha todos os campos'));
                exit();
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Campos ausentes no envio'));
            exit();
        }
    }

} catch (mysqli_sql_exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro de banco de dados: ' . $e->getMessage()));
    exit();
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro: ' . $e->getMessage()));
    exit();
}

echo json_encode(array('success' => false, 'message' => 'Erro desconhecido'));
?>
