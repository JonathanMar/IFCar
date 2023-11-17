document.addEventListener('DOMContentLoaded', function () {
    // Função para tratar o clique no botão de login
    function handleLoginButtonClick() {
        let formData = new FormData(document.getElementById('form_login'));

        fetch('../php/login.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao efetuar login.');
                }
                return response.json();
            })
            .then(data => {
                let messageContainer = document.getElementById('login-message');
                if (data.success) {
                    messageContainer.innerHTML = "<p class='success-message'>Login realizado com sucesso!</p>";
                    window.location.href = '../index.html';
                } else {
                    messageContainer.innerHTML = "<p class='error-message'>" + data.message + "</p>";
                }
            })
            .catch(error => {
                throw new Error('Erro ao efetuar login:', error);
            })
            .finally(() => {
                document.getElementById('form_login').reset();
            });
    }

    // Função para lidar com o clique no botão "Esqueci a Senha"
    function rememberPwd() {
        console.log('Função ainda não implementada!');
    }

    // Função para lidar com o clique no botão "Registrar"
    function btn_register() {
        fetch('formulario_criar_conta.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao tentar criar conta.');
                }
                return response.text();
            })
            .then(html => {
                document.body.innerHTML = html;

                let form = document.getElementById('form_createAcount');
                let fromData = new FormData(form);

                // Função para cadastrar
                fetch('../php/create_account.php', {
                    method: 'POST',
                    body: fromData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao cadastrar Conta.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        let name_user = document.getElementById('name_user').value;
                        let email_user = document.getElementById('email_user').value;
                        let car_model_user = document.getElementById('car_model_user').value;
                        let password_user = document.getElementById('password_user').value;

                        let messageContainer = document.getElementById('result');

                        if (name_user && email_user && car_model_user && password_user) {
                            if (data && data.success) {
                                messageContainer.innerHTML = "<p class='success-message'>Conta criada com sucesso!</p>";
                                window.location.href = 'src/login.html';
                            } else {
                                messageContainer.innerHTML = "<p class='error-message'>" + (data.message || 'Erro ao criar conta.') + "</p>";
                            }
                        } else {
                            let messageContainer = document.getElementById('result');
                            messageContainer.innerHTML = "<p class='error-message'>Por favor, preencha todos os campos.</p>";
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao cadastrar Conta:', error);
                    });

                // Mensagem de Sucesso
                let mensagemDiv = document.querySelector('.result');
                mensagemDiv.innerHTML = '';

                fetch('msg_coorrect.html')
                    .then(response => response.text())
                    .then(html => {
                        mensagemDiv.innerHTML = html;
                    })
                    .catch(error => {
                        console.error('Erro ao tentar criar conta:', error.message);
                    });

                // Adiciona evento de clique ao botão "Voltar"
                document.getElementById('voltar_btn').addEventListener('click', function () {
                    // Restaura o conteúdo original
                    document.body.innerHTML = originalContent;
                });
            })
            .catch(error => {
                console.error('Erro ao tentar criar conta:', error.message);
            });

    }

    // Event listeners para os botões
    let login_remember_pwdButton = document.getElementById('login_remember_pwd');
    let btn_login_subimit = document.getElementById('btn_login');
    let btn_register_subimit = document.getElementById('btn_register');

    login_remember_pwdButton.addEventListener('click', rememberPwd);
    btn_login_subimit.addEventListener('click', handleLoginButtonClick);
    btn_register_subimit.addEventListener('click', btn_register);
});
