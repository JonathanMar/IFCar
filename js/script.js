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

        // Seleção de endereços
        // document.getElementById('address_ride_select').addEventListener('', function (event) {
        //   let selectedAddressId = this.value;
        //   let xhrGetMeetingPoints = new XMLHttpRequest();
        //   xhrGetMeetingPoints.open('GET', 'php/address_ride.php', true);

        //   xhrGetMeetingPoints.onload = function () {
        //     if (xhrGetMeetingPoints.status >= 200 && xhrGetMeetingPoints.status < 400) {
        //       let meetingPoints = JSON.parse(xhrGetMeetingPoints.responseText);

        //       // Limpa as opções anteriores
        //       let meetingPointSelect = document.getElementById('address_ride');
        //       console.log(xhrGetMeetingPoints.responseText); // Debug

        //       while (meetingPointSelect.firstChild) {
        //         meetingPointSelect.removeChild(meetingPointSelect.firstChild);
        //       }

        //       console.log(Array.isArray(meetingPoints));// Debug
        //       meetingPoints.forEach(function (meetingPoint) {
        //         let option = document.createElement('option');
        //         option.value = meetingPoint.cod_ride;
        //         option.textContent = meetingPoint.time_ride;
        //         console.log(meetingPoint.cod_ride, meetingPoint.time_ride); // Debug
        //         meetingPointSelect.appendChild(option);
        //       });
        //     } else {
        //       console.error('Erro ao obter os pontos de encontro.');
        //     }
        //   };

        //   xhrGetMeetingPoints.onerror = function () {
        //     console.error('Erro de conexão ao obter os pontos de encontro.');
        //   };

        //   xhrGetMeetingPoints.send();
        //   console.log('Enviando requisição...'); // Debug
        //   console.log(xhrGetMeetingPoints); //Debug
        // });


        // Função para cadastrar
        document.getElementById('form_cadastro').addEventListener('submit', function (event) {
          event.preventDefault();

          let formData = new FormData(this);
          // console.log('Dados do formulário:', formData); // Debug

          let xhrCadastro = new XMLHttpRequest();

          // Obtém a data atual do navegador
          let date_ride = new Date();
          formData.append('date_ride', date_ride.toISOString());

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

          // Após o cadastro ser concluído com sucesso, exibe a mensagem
          var mensagemDiv = document.querySelector('.result');
          mensagemDiv.innerHTML = '';

          var xhr = new XMLHttpRequest();
          xhr.open('GET', 'src/msg_coorrect.html', true);

          xhr.onload = function () {
            if (xhr.status === 200) {
              // Adiciona o conteúdo ao DOM
              mensagemDiv.innerHTML = xhr.responseText;
            }
          };

          xhr.send();

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
              console.log(idDoRegistro);
              let accepted_ride = 1;

              let xhrCaronaAceita = new XMLHttpRequest();
              xhrCaronaAceita.open('POST', 'php/aceita_carona.php', true);
              xhrCaronaAceita.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

              xhrCaronaAceita.onload = function () {
                if (xhrCaronaAceita.status >= 200 && xhrCaronaAceita.status < 400) {
                  console.log('Registro Atualizado.');
                } else {
                  console.error('Erro ao atualizar o registro.');
                }
              };

              xhrCaronaAceita.onerror = function () {
                console.error('Erro de conexão ao atualizar o registro.');
              };

              xhrCaronaAceita.send('cod_ride=' + encodeURIComponent(idDoRegistro) + '&accepted_ride=' + encodeURIComponent(accepted_ride));
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