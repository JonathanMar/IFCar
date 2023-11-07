document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('dar_carona').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'src/formulario_cadastro.html', true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        document.getElementById('formulario_cad').innerHTML = xhr.responseText;

        document.getElementById('form_cadastro').addEventListener('submit', function (event) {
          event.preventDefault();

          var formData = new FormData(this);

          var xhrCadastro = new XMLHttpRequest();
          xhrCadastro.open('POST', 'php/cadastra_carona.php', true);

          xhrCadastro.onload = function () {
            if (xhrCadastro.status >= 200 && xhrCadastro.status < 400) {
              console.log('Carona cadastrada com sucesso.');
            } else {
              console.error('Erro ao cadastrar a carona.');
            }
          };

          xhrCadastro.onerror = function () {
            console.error('Erro de conexão ao cadastrar a carona.');
          };

          xhrCadastro.send(formData);
          this.reset();
        });
      } else {
        console.error('Erro ao carregar o formulário. Motivo: ' + xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error('Erro de conexão.');
    };

    xhr.send();
  });

  document.getElementById('pegar_carona').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/mostra_carona.php', true);

    function atualizarConteudo() {

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhr.responseText;

          var btn_aceita_carona = document.getElementsByClassName('aceitar_carona');

          for (var i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              var idDoRegistro = this.dataset.id;
              var aceita = 1;

              var xhrAtualizacao = new XMLHttpRequest();
              xhrAtualizacao.open('POST', 'php/aceita_carona.php', true);
              xhrAtualizacao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

              xhrAtualizacao.onload = function () {
                if (xhrAtualizacao.status >= 200 && xhrAtualizacao.status < 400) {
                } else {
                  console.error('Erro ao atualizar o registro.');
                }
              };

              xhrAtualizacao.onerror = function () {
                console.error('Erro de conexão ao atualizar o registro.');
              };

              xhrAtualizacao.send('cod=' + encodeURIComponent(idDoRegistro) + '&aceita=' + encodeURIComponent(aceita));
            });
          }
        } else {
          console.error('Erro ao carregar a lista de caronas.');
        }
      };

      xhr.onerror = function () {
        console.error('Erro de conexão.');
      };

      xhr.send();
    }

    setInterval(atualizarConteudo, 5000);

    var btn_voltar = document.getElementById('btn_voltar');

    btn_voltar.addEventListener('click', function () {
      document.getElementById('lista_carona').innerHTML = '';
    });

  });
});