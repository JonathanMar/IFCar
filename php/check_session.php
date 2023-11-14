<?php
session_start();

$usuarioAutenticado = true;

if ($usuarioAutenticado) {
    $_SESSION['user_id'] = $cod_user;
}

// Verifica se o usuário está logado
if (isset($_SESSION['user_id'])) {
    echo json_encode(array('logged_in' => true, 'user_id' => $_SESSION['user_id']));
} else {
    echo json_encode(array('logged_in' => false));
}
?>
