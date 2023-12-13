<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuarioAutenticado = $_SESSION['usuarioAutenticado'];

    if ($usuarioAutenticado) {
        $user_id = $_SESSION['user_id'];
        $response = array('success' => true, 'user_id' => $user_id);
    } else {
        $response = array('success' => false, 'message' => 'Falha na autenticação');
    }
} else {
    $response = isset($_SESSION['user_id'])
        ? array('logged_in' => true, 'user_id' => $_SESSION['user_id'])
        : array('logged_in' => false);
}

echo json_encode($response);
?>
