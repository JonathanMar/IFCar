<?php

try {
    include('../connection.php');
    include('../queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name_user = $_POST['name_user'];
        $email_user = $_POST['email_user'];
        $car_model_user = $_POST['car_model_user'];
        $password_user = $_POST['password_user'];

        if (empty($name_user) || empty($email_user) || empty($car_model_user) || empty($password_user)) {
            $response = array('success' => false, 'message' => 'Por favor, preencha todos os campos');
        } else {
            $name_user = filter_var($name_user, FILTER_SANITIZE_STRING);
            $email_user = filter_var($email_user, FILTER_SANITIZE_EMAIL);
            $car_model_user = filter_var($car_model_user, FILTER_SANITIZE_STRING);

            $result = selectUser($conn, $email_user);

            if ($result->num_rows > 0) {
                $response = array('success' => false, 'message' => 'Usuário já cadastrado!');
            } else {
                $hash_password_user = password_hash($password_user, PASSWORD_BCRYPT);

                $result = createAccount($conn, $email_user, $hash_password_user);

                if ($result) {
                    $response = array('success' => true, 'message' => 'Conta criada com sucesso!');
                } else {
                    $response = array('success' => false, 'message' => 'Erro Interno - Comunique o Suporte');
                }
            }
        }
        // Define cabeçalhos para indicar que a resposta é JSON
        header('Content-Type: application/json');
        // Converte e imprime o JSON
        echo json_encode($response);
    }
} catch (mysqli_sql_exception $e) {
    // Define cabeçalhos para indicar que a resposta é JSON
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'Erro na conexão. Comunique o suporte.'));
} catch (Exception $e) {
    // Define cabeçalhos para indicar que a resposta é JSON
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'Erro Interno. Comunique o suporte.'));
}

?>
