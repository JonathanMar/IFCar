document.addEventListener('DOMContentLoaded', function () {
    // Função para Login
    function handleLoginButtonClick() {
        let formData = new FormData(document.getElementById('form_login'));

        fetch('../php/login.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao efetuar login. Código de status: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                try {
                    let jsonData = JSON.parse(data);
                    let messageContainer = document.getElementById('login-message');

                    if (jsonData.success) {
                        displaySuccessMessage('Login realizado com sucesso!');
                        window.location.href = '../index.html';
                    } else {
                        displayErrorMessage(jsonData.message);
                    }
                } catch (error) {
                    displayErrorMessage(data);
                }
            })
            .catch(error => {
                displayErrorMessage(error.message);
            })
            .finally(() => {
                document.getElementById('form_login').reset();
            });
    }

    function displaySuccessMessage(message) {
        let messageContainer = document.getElementById('login-message');
        messageContainer.innerHTML = "<p class='success-message'>" + message + "</p>";
    }

    function displayErrorMessage(message) {
        let messageContainer = document.getElementById('login-message');
        messageContainer.innerHTML = "<p class='error-message'>" + message + "</p>";
    }

    function rememberPwd() {
        console.log('Função ainda não implementada!');
    }

    function regist() {
        window.location.href = '../src/formulario_criar_conta.html';
    }

    function voltar() {
        window.location.href = '../src/login.html'
    }

    // Event listeners
    let login_remember_pwdButton = document.getElementById('login_remember_pwd');
    let btn_login_subimit = document.getElementById('btn_login');
    let btn_register_click = document.getElementById('btn_register');
    let btn_voltar_click = document.getElementById('voltar_btn');

    login_remember_pwdButton.addEventListener('click', rememberPwd);
    btn_login_subimit.addEventListener('click', handleLoginButtonClick);
    btn_register_click.addEventListener('click', regist);
    btn_voltar_click.addEventListener('click', voltar);
});
