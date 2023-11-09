document.addEventListener('DOMContentLoaded', function () {
  let pegarCaronaInterval; // Variável para a atualização da lista de carona.
  // Variável para ocultar botões
  let pegarCaronaButton = document.getElementById('pegar_carona');
  let darCaronaButton = document.getElementById('dar_carona');

  // Função para dar carona
  function darCarona() {
    pegarCaronaButton.style.display = 'none'; // Oculta o botão "Pegar Carona"

    let xhrDarCarona = new XMLHttpRequest();
    xhrDarCarona.open('GET', 'src/formulario_cadastro.html', true);

    xhrDarCarona.onload = function () {
      if (xhrDarCarona.status >= 200 && xhrDarCarona.status < 400) {
        document.getElementById('formulario_cad').innerHTML = xhrDarCarona.responseText;

        document.getElementById('form_cadastro').addEventListener('submit', function (event) {
          event.preventDefault();

          let formData = new FormData(this);
          // console.log('Dados do formulário:', formData); // Debug

          let xhrCadastro = new XMLHttpRequest();

          // Obtém a data atual do navegador
          let date_ride = new Date();
          formData.append('date_ride', date_ride.toISOString().split('T')[0]);

          xhrCadastro.open('POST', 'php/cadastra_carona.php', true);

          xhrCadastro.onload = function () {
            if (xhrCadastro.status >= 200 && xhrCadastro.status < 400) {
              // console.log("Acesso a página castra carona bem sucedido"); // Debug

              // Adicionar mensagem diretamente no HTML - Em Produção
              // let xhrresponse = new XMLHttpRequest();    
              // xhrresponse.open('GET', 'src/msg_correct.html', true);
            } else {
              console.error('Erro ao cadastrar a carona.');

              // console.log(xhrCadastro.responseText); // Debug
            }
          };

          xhrCadastro.onerror = function () {
            console.error('Erro de conexão ao cadastrar a carona.');

            // console.log(xhrCadastro.responseText); // Debug
          };

          xhrCadastro.send(formData);
          // console.log('Enviando requisição...'); // Debug
          // console.log(formData); //Debug

          this.reset();
        });

        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar').addEventListener('click', function () {
          document.getElementById('formulario_cad').innerHTML = '';

          // Exibe o botão "Pegar Carona"
          pegarCaronaButton.style.display = 'block';
        });

      } else {
        console.error('Erro ao carregar o formulário. Motivo: ' + xhrDarCarona.statusText);
      }
    };

    xhrDarCarona.onerror = function () {
      console.error('Erro de conexão.');

      // console.log(xhrDarCarona.responseText); // Debug
    };

    xhrDarCarona.send();
  }

  // Função para pegar carona
  function pegarCarona() {
    // // Oculta o botão "Dar Carona"
    darCaronaButton.style.display = 'none';

    function atualizarCaronas() {
      let xhrPegarCarona = new XMLHttpRequest();
      xhrPegarCarona.open('GET', 'php/mostra_carona.php', true);

      xhrPegarCarona.onload = function () {
        if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrPegarCarona.responseText;

          let btn_aceita_carona = document.getElementsByClassName('aceitar_carona');

          for (let i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              let accepted_ride = 1;

              let xhrCaronaAceita = new XMLHttpRequest();
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

              xhrCaronaAceita.send('cod=' + encodeURIComponent(idDoRegistro) + '&accepted_ride=' + encodeURIComponent(accepted_ride));
            });
          }

          // Adiciona evento de clique ao botão "Voltar"
          document.getElementById('voltar_pegCar').addEventListener('click', function () {
            document.getElementById('lista_carona').innerHTML = '';

            // Cancela o intervalo de atualização
            clearInterval(pegarCaronaInterval);

            // Exibe o botão "Pegar Carona"
            darCaronaButton.style.display = "block";
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
  darCaronaButton.addEventListener('click', darCarona);
  pegarCaronaButton.addEventListener('click', pegarCarona);
});