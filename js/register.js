document.addEventListener('DOMContentLoaded', function () {
    // Função para Login
    function displaySuccessMessage(message) {
        let messageContainer = document.getElementById('result');
        messageContainer.innerHTML = "<p class='success-message'>" + message + "</p>";
    }

    function displayErrorMessage(message) {
        let messageContainer = document.getElementById('result');
        if (messageContainer) {
            messageContainer.innerHTML = "<p class='error-message'>" + message + "</p>";
        } else {
            console.error("Element with ID 'login-message' not found");
        }
    }

    function createAccount() {
        let form = document.getElementById('form_createAcount');
        let formData = new FormData(form);
    
        fetch('../php/create_account.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('A resposta da rede não foi bem-sucedida');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                displaySuccessMessage(data.message);
                form.reset();

            } else {
                displayErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            displayErrorMessage('Erro na requisição. Comunique o suporte.');
        });
    }
    function voltar() {
        window.location.href = '../src/login.html'
    }

    // Event listeners
    let btn_createAcount_click = document.getElementById('btn_createAcount');
    let btn_voltar_click = document.getElementById('voltar_btn');

    btn_createAcount_click.addEventListener('click', createAccount);
    btn_voltar_click.addEventListener('click', voltar);
});
