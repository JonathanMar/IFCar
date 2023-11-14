<?php
session_start();

// Destrói a sessão
session_destroy();

// Retorna uma resposta JSON indicando o sucesso
echo json_encode(array('success' => true));
?>
