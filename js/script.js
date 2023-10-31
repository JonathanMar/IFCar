document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('dar_carona').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'formulario_cadastro.html', true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        document.getElementById('formulario').innerHTML = xhr.responseText;
      } else {
        console.error('Erro ao carregar o formulário.');
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

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        document.getElementById('lista_carona').innerHTML = xhr.responseText;

        var btn_aceita_carona = document.getElementById('aceitar_carona');

        if (btn_aceita_carona) {
          btn_aceita_carona.addEventListener('click', function () {
            var idDoRegistro = btn_aceita_carona.dataset.id;
            var aceita = 1;

            var xhrAtualizacao = new XMLHttpRequest();
            xhrAtualizacao.open('POST', 'php/aceita_carona.php', true);
            xhrAtualizacao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            xhrAtualizacao.onload = function () {
              if (xhrAtualizacao.status >= 200 && xhrAtualizacao.status < 400) {
                console.log('Registro atualizado com sucesso PT1.');
              } else {
                console.error('Erro ao atualizar o registro.');
              }
            };

            xhrAtualizacao.onerror = function () {
              console.error('Erro de conexão ao atualizar o registro.');
            };

            try {
              xhrAtualizacao.send('cod=' + encodeURIComponent(idDoRegistro) + '&aceita=' + encodeURIComponent(aceita));
              console.log('Requisição enviada com sucesso PT1.5.');
            } catch (error) {
              console.error('Erro ao enviar requisição: ' + error);
            }

          });
        } else {
          console.error('Erro ao carregar o formulário.');
        }
      } else {
        console.error('Erro ao carregar a lista de caronas.');
      }
    };

    xhr.onerror = function () {
      console.error('Erro de conexão.');
    };

    xhr.send();
  });
});
