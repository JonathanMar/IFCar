document.addEventListener('DOMContentLoaded', function () {
    let login_remember_pwdButton = document.getElementById('login_remember_pwd');
    let btn_login_subimit = document.getElementById('btn_login');
    let btn_createAccount_subimit = document.getElementById('btn_createAcount');

    // Função para efetuar login
    function userLogin() {
        let formData = new FormData(document.getElementById('form_login'));
    
        let xhrUserLogin = new XMLHttpRequest();
    
        xhrUserLogin.open('POST', '../php/login.php', true);
    
        xhrUserLogin.onload = function () {
            if (xhrUserLogin.status >= 200 && xhrUserLogin.status < 400) {
                try {
                    let response = JSON.parse(xhrUserLogin.responseText);
                    let messageContainer = document.getElementById('login-message');
    
                    if (response.success) {
                        messageContainer.innerHTML = "<p class='success-message'>Login realizado com sucesso!</p>";
    
                         // Acesso via AJAX, verificar JS não está sendo carregado
                        //         let xhrIndexHtml = new XMLHttpRequest();

                        //         xhrIndexHtml.open('GET', '../index.html', true);

                        //         xhrIndexHtml.onload = function () {
                        //             if (xhrIndexHtml.status >= 200 && xhrIndexHtml.status < 400) {
                        //                 document.body.innerHTML = xhrIndexHtml.responseText;
                        //             } else {
                        //                 console.error('Erro ao carregar o arquivo index.html.');
                        //             }
                        //         };

                        //         xhrIndexHtml.onerror = function () {
                        //             console.error('Erro de conexão ao carregar o arquivo index.html.');
                        //         };

                        //         xhrIndexHtml.send();
                        //     } else {
                        //         alert('Usuário ou Senha Incorretos: ' + response.message);
                        //     }
                        // } catch (error) {
                        //     console.error('Erro ao fazer parsing da resposta JSON:', error);
                        // }

                        window.location.href = '../index.html';
                    } else {
                        messageContainer.innerHTML = "<p class='error-message'>" + response.message + "</p>";
                    }
                } catch (error) {
                    console.error('Erro ao fazer parsing da resposta JSON:', error);
                }
            } else {
                console.error('Erro ao efetuar login.');
                console.log(xhrUserLogin.responseText);
            }
    
            document.getElementById('form_login').reset();
        };
    
        xhrUserLogin.onerror = function () {
            console.error('Erro de conexão ao efetuar login.');
            console.log(xhrUserLogin.responseText);
            document.getElementById('form_login').reset();
        };
    
        xhrUserLogin.send(formData);
        console.log('Enviando requisição...'); // Debug
        console.log(formData); // Debug
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