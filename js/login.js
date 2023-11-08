document.addEventListener('DOMContentLoaded', function () {
    let login_remember_pwdButton = document.getElementById('login_remember_pwd');
    let btn_login_subimit = document.getElementById('btn_login');

    // Função Relembrar Senha
    function rememberPwd() {
        console.log('Função ainda não implementada!');
    }

    // Função para efetuar login
    function userLogin() {
        let formData = new FormData(this);
        console.log('Dados do formulário:', formData); // Debug

        let xhrUserLogin = new XMLHttpRequest();

        xhrUserLogin.open('POST', '../php/login.php', true);

        xhrUserLogin.onload = function () {
            if (xhrUserLogin.status >= 200 && xhrUserLogin.status < 400) {
                console.log("Acesso a página login bem sucedido"); // Debug
            } else {
                console.error('Erro ao efetuar login.');

                console.log(xhrUserLogin.responseText); // Debug
            }
        };

        xhrUserLogin.onerror = function () {
            console.error('Erro de conexão ao efetuar login.');

             console.log(xhrUserLogin.responseText); // Debug
        };

        xhrUserLogin.send(FormData);
        console.log('Enviando requisição...'); // Debug
        console.log(formData); //Debug

        this.reset();
    }

    // Função Login via OAth2
    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Nome: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
    }

    login_remember_pwdButton.addEventListener('click', rememberPwd);
    btn_login_subimit.addEventListener('click', userLogin);
});