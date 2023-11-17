<?php
try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name_user = $_POST['name_user'];
        $email_user = $_POST['email_user'];
        $car_model_user = $_POST['car_model_user'];
        $password_user = $_POST['password_user'];

        if (!empty($name_user) && !empty($email_user) && !empty($email_user) && !empty($car_model_user) & !empty($password_user)) {

            // Gerando um hash de senha
            $hash_password_user = password_hash($password_user, PASSWORD_BCRYPT);

            $result = createAccount($db, $email_user, $hash_password_user);

            if ($result) {
                echo json_encode(array('success' => true));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Mensagem de erro'));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Por favor, preencha todos os campos'));
        }
    }

} catch (PDOException $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro na conexão: ' . $e->getMessage()));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => 'Erro: ' . $e->getMessage()));
}
?>