document.addEventListener('DOMContentLoaded', function () {
    let login_remember_pwdButton = document.getElementById('login_remember_pwd');
    let btn_login_subimit = document.getElementById('btn_login');
    let btn_createAccount_subimit = document.getElementById('btn_createAcount');

    // Função para efetuar login
    function userLogin() {
        let formData = new FormData(document.getElementById('form_login'));
        // console.log('Dados do formulário:', formData); // Debug

        let xhrUserLogin = new XMLHttpRequest();

        xhrUserLogin.open('POST', '../php/login.php', true);

        xhrUserLogin.onload = function () {
            if (xhrUserLogin.status >= 200 && xhrUserLogin.status < 400) {
                try {
                    let response = JSON.parse(xhrUserLogin.responseText);
                    if (response.success) {
                        alert('Login bem-sucedido!');

                    } else {
                        alert('Usuário ou Senha Incorretos: ' + response.message);
                    }
                } catch (error) {
                    console.error('Erro ao fazer parsing da resposta JSON:', error);
                }
            } else {
                console.error('Erro ao efetuar login.');
                console.log(xhrUserLogin.responseText); // Debug
            }
        };

        xhrUserLogin.onerror = function () {
            console.error('Erro de conexão ao efetuar login.');
            console.log(xhrUserLogin.responseText); // Debug
        };

        xhrUserLogin.send(formData);
        console.log('Enviando requisição...'); // Debug
        console.log(formData); //Debug

        document.getElementById('form_login').reset();
    }

    // Função Relembrar Senha
    function rememberPwd() {
        console.log('Função ainda não implementada!');
    }

    // Função para Criar Conta
    function createAccount() {
        let formData = new FormData(document.getElementById('form_login'));
        let xhrCreateAccount = new XMLHttpRequest();

        xhrCreateAccount.open('GET', 'formulario_criar_conta.html', true);

        xhrCreateAccount.onload = function () {
            if (xhrCreateAccount.status >= 200 && xhrCreateAccount.status < 400) {
                document.body.innerHTML = xhrCreateAccount.responseText;

                try {
                    let response = JSON.parse(xhrCreateAccount.responseText);
                    if (response.success) {
                        alert('Conta criada com sucesso!');
                    } else {
                        console.log(response.message);
                    }
                } catch (error) {
                    console.error('Erro ao fazer parsing da resposta JSON:', error);
                }
            } else {
                console.error('Erro ao tentar criar conta.');
                // console.log(xhrCreateAccount.responseText); // Debug
            }
        };


        xhrCreateAccount.onerror = function () {
            console.error('Erro de conexão ao Criar Conta.');
            // console.log(xhrCreateAccount.responseText); // Debug
        };

        xhrCreateAccount.send(formData);
        // console.log('Enviando requisição...'); // Debug
        // console.log(formData); // Debug


        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar_btn').addEventListener('click', function () {
            // Restaura o conteúdo original
            document.body.innerHTML = originalContent;
        });
        
    }

    login_remember_pwdButton.addEventListener('click', rememberPwd);
    btn_login_subimit.addEventListener('click', userLogin);
    btn_createAccount_subimit.addEventListener('click', createAccount);
});