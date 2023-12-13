<?php

try {
    include('connection.php');
    include('queries.php');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $address_id = $_GET['address_id'];

        // Seleciona os endereços
        $meeting_points = address_ride_check($conn, $address_id);

        echo json_encode($meeting_points);
        
    }
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
