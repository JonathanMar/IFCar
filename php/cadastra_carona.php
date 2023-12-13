<?php
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

try {
    include('connection.php');
    include('queries.php');

    $response = array(); // Inicializa a resposta como um array vazio

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $address_ride = $_POST['address_ride'];
        $time_ride = $_POST['time_ride'];
        $max_quant_ride = $_POST['max_quant_ride'];
        $date_ride = $_POST['date_ride'];

        if (!empty($address_ride) && !empty($time_ride) && !empty($max_quant_ride) && !empty($date_ride)) {
            // Verifica se a carona já existe
            $result = checkIfRideExists($conn, $address_ride, $time_ride, $max_quant_ride);

            if ($result) {
                $response['error'] = 'Esta carona já existe.';
            } else {
                // Converte a data/hora para o formato aceito pelo MySQL
                $formatted_date = date('Y-m-d H:i:s', strtotime($date_ride));
                insertRide($conn, $address_ride, $time_ride, $max_quant_ride, $formatted_date);
                $response['success'] = 'Carona cadastrada com sucesso!';
            }
        } else {
            $response['error'] = 'Favor preencha todos os campos!';
        }
    } else {
        $response['error'] = 'Método de requisição inválido.';
    }
} catch (PDOException $e) {
    $response['error'] = 'Erro na conexão: ' . $e->getMessage();
} catch (Exception $e) {
    $response['error'] = 'Erro: ' . $e->getMessage();
}

// Envia a resposta como JSON para o JavaScript
echo json_encode($response);
?>
