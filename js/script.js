document.addEventListener('DOMContentLoaded', function () {
  // Função para dar carona
  function darCarona() {
    var xhrDarCarona = new XMLHttpRequest();
    xhrDarCarona.open('GET', 'src/formulario_cadastro.html', true);

    xhrDarCarona.onload = function () {
      if (xhrDarCarona.status >= 200 && xhrDarCarona.status < 400) {
        document.getElementById('formulario_cad').innerHTML = xhrDarCarona.responseText;

        document.getElementById('form_cadastro').addEventListener('submit', function (event) {
          event.preventDefault();

          var formData = new FormData(this);

          var xhrCadastro = new XMLHttpRequest();
          xhrCadastro.open('POST', 'php/cadastra_carona.php', true);

          xhrCadastro.onload = function () {
            if (xhrCadastro.status >= 200 && xhrCadastro.status < 400) {
              var xhrresponse = new XMLHttpRequest();
              xhrresponse.open('GET', 'src/msg_correct.html', true);

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

        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar').addEventListener('click', function () {
          document.getElementById('formulario_cad').innerHTML = '';
        });

      } else {
        console.error('Erro ao carregar o formulário. Motivo: ' + xhrDarCarona.statusText);
      }
    };

    xhrDarCarona.onerror = function () {
      console.error('Erro de conexão.');
    };

    xhrDarCarona.send();
  }

  // Função para pegar carona
  function pegarCarona() {
    function atualizarCaronas() {
      var pegarCaronaInterval;
      var xhrPegarCarona = new XMLHttpRequest();
      xhrPegarCarona.open('GET', 'php/mostra_carona.php', true);

      xhrPegarCarona.onload = function () {
        if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrPegarCarona.responseText;

          var btn_aceita_carona = document.getElementsByClassName('aceitar_carona');

          for (var i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              var idDoRegistro = this.dataset.id;
              var aceita = 1;

              var xhrCaronaAceita = new XMLHttpRequest();
              xhrCaronaAceita.open('POST', 'php/aceita_carona.php', true);
              xhrCaronaAceita.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

              xhrCaronaAceita.onload = function () {
                if (xhrCaronaAceita.status >= 200 && xhrCaronaAceita.status < 400) {
                } else {
                  console.error('Erro ao atualizar o registro.');
                }
              };

              xhrCaronaAceita.onerror = function () {
                console.error('Erro de conexão ao atualizar o registro.');
              };

              xhrCaronaAceita.send('cod=' + encodeURIComponent(idDoRegistro) + '&aceita=' + encodeURIComponent(aceita));
            });
          }

          // Adiciona evento de clique ao botão "Voltar"
          document.getElementById('voltar_pegCar').addEventListener('click', function () {
            document.getElementById('lista_carona').innerHTML = '';

            // Cancela o intervalo de atualização
            clearInterval(pegarCaronaInterval);
          });

        } else {
          console.error('Erro ao carregar a lista de caronas.');
        }
      };

      xhrPegarCarona.onerror = function () {
        console.error('Erro de conexão.');
      };

      xhrPegarCarona.send();
    }

    // Chama a função para atualizar a lista de caronas imediatamente
    atualizarCaronas();

    // Chama a função para atualizar a lista de caronas
    pegarCaronaInterval = setInterval(atualizarCaronas, 2000);
  }
  // Adiciona eventos aos botões
  document.getElementById('dar_carona').addEventListener('click', darCarona);
  document.getElementById('pegar_carona').addEventListener('click', pegarCarona);
});