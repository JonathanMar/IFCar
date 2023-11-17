<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if ($usuarioAutenticado) {
        $_SESSION['user_id'] = $user_id;
        echo json_encode(array('success' => true, 'user_id' => $user_id));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Falha na autenticação'));
    }
} else {
    // Verifica se o usuário está logado
    if (isset($_SESSION['user_id'])) {
        echo json_encode(array('logged_in' => true, 'user_id' => $_SESSION['user_id']));
    } else {
        echo json_encode(array('logged_in' => false));
    }
}
?>
