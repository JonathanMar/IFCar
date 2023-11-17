import { verificarSessao } from './verificarSessao.js';
import { visibilidadeBtn } from './visibilidadeBtn.js';
import { voltarButton } from './voltarButton.js';
import { carregarFormularioCadastro } from './carregarFormularioCadastro.js';

verificarSessao();

document.addEventListener('DOMContentLoaded', function () {
  let caronaInterval;
  let pegarCaronaButton = document.getElementById('pegar_carona');
  let darCaronaButton = document.getElementById('dar_carona');
  let caronaAceitaCaronaButton = document.getElementById('carrona_aceita');
  let caronaCadastradasButton = document.getElementById('carnas_cadastradas');
  let sairButton = document.getElementById('sair');

  // Função para dar carona
  function darCarona() {
    visibilidadeBtn('none', pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);

    fetch('src/formulario_cadastro.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o formulário. Motivo: ' + response.statusText);
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('formulario_cad').innerHTML = html;

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

          // Obtém a data atual do navegador
          let date_ride = new Date();
          formData.append('date_ride', date_ride.toISOString());

          fetch('php/cadastra_carona.php', {
            method: 'POST',
            body: formData
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao cadastrar a carona.');
              }
            })
            .catch(error => {
              console.error('Erro ao cadastrar a carona:', error);
            });

          // Após o cadastro ser concluído com sucesso, exibe a mensagem
          var mensagemDiv = document.querySelector('.result');
          mensagemDiv.innerHTML = '';

          fetch('src/msg_coorrect.html')
            .then(response => response.text())
            .then(html => {
              mensagemDiv.innerHTML = html;
            })
            .catch(error => {
              throw new Error('Erro ao processar a resposta HTML:', error);
            });

          this.reset();
        });

        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar_CadUse').addEventListener('click', function () {
          voltarButton('formulario_cad');

          visibilidadeBtn('block', pegarCaronaButton, darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar o formulário:', error);
      });
  }

  // Função para pegar carona
  function pegarCarona() {
    let caronaInterval;
    visibilidadeBtn('none', darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);

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

              xhrCaronaAceita.send('cod_ride=' + encodeURIComponent(idDoRegistro) + '&accepted_ride=' + encodeURIComponent(accepted_ride));
            });
          }

          // Adiciona evento de clique ao botão "Voltar"
          document.getElementById('voltar_pegCar').addEventListener('click', function () {
            voltarButton('lista_carona');

            // Cancela o intervalo de atualização
            clearInterval(caronaInterval);

            visibilidadeBtn('block', darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);
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
    caronaInterval = setInterval(atualizarCaronas, 2000);
  }

  function caronaAceita() {
    // Exibe Botões
    visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, caronaCadastradasButton, sairButton);

    function atualizarCaronas() {
      let xhrPegarCarona = new XMLHttpRequest();
      xhrPegarCarona.open('GET', 'php/caronas_aceitas.php', true);

      xhrPegarCarona.onload = function () {
        if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrPegarCarona.responseText;

          let btn_aceita_carona = document.getElementsByClassName('cancelar_carona');

          for (let i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              let accepted_ride = 1;

              let xhrCaronaAceita = new XMLHttpRequest();
              xhrCaronaAceita.open('POST', 'php/cancela_carona.php', true);
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

              xhrCaronaAceita.send('cod_ride=' + encodeURIComponent(idDoRegistro) + '&accepted_ride=' + encodeURIComponent(accepted_ride));
            });
          }

          // Adiciona evento de clique ao botão "Voltar"
          document.getElementById('voltar_pegCar').addEventListener('click', function () {
            voltarButton('lista_carona');


            // Cancela o intervalo de atualização
            clearInterval(caronaInterval);

            // Exibe Botões
            visibilidadeBtn('block', darCaronaButton, pegarCaronaButton, caronaCadastradasButton);
          });

        } else {
          console.error('Erro ao carregar a lista de caronas.');
        }
      };

      xhrPegarCarona.onerror = function () {
        console.error('Erro de conexão.');
      };

      xhrPegarCarona.send();
    };

    // Chama a função para atualizar a lista de caronas imediatamente
    atualizarCaronas();

    // Chama a função para atualizar a lista de caronas
    caronaInterval = setInterval(atualizarCaronas, 2000);
  }

  // Função Caronas Cadastradas
  function caronaCadstradas() {
    visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);

    function atualizarCaronas() {
      let xhrCaronaCadastrada = new XMLHttpRequest();
      xhrCaronaCadastrada.open('GET', 'php/caronas_cadastradas.php', true);

      xhrCaronaCadastrada.onload = function () {
        if (xhrCaronaCadastrada.status >= 200 && xhrCaronaCadastrada.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrCaronaCadastrada.responseText;

          // Botão Editar Carona
          let btnEdit = document.getElementById('btn_edit');
          if (btnEdit) {
            btnEdit.addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              console.log(idDoRegistro);
              // Defina a variável detalhesCarona
              let detalhesCarona;

              let xhrPegarCarona = new XMLHttpRequest();
              let xhrDarCarona = new XMLHttpRequest();
              xhrDarCarona.open('GET', 'src/formulario_cadastro.html', true);

              xhrDarCarona.onload = function () {
                if (xhrDarCarona.status >= 200 && xhrDarCarona.status < 400) {
                  document.getElementById('formulario_cad').innerHTML = xhrDarCarona.responseText;
                } else {
                  console.error('Erro ao carregar o formulário de cadastro.');
                }
              };

              xhrDarCarona.onerror = function () {
                console.error('Erro de conexão ao carregar o formulário de cadastro.');
              };

              xhrDarCarona.send();

              xhrPegarCarona.open('POST', 'php/editar_caronas.php', true);

              document.getElementById('lista_carona').style.display = 'none';
              document.getElementById('formulario_cad').style.display = 'block';

              clearInterval(caronaInterval);

              xhrPegarCarona.onload = function () {
                if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
                  try {
                    let detalhesCarona = JSON.parse(xhrPegarCarona.responseText);

                    // Verifica se os dados estão presentes na resposta
                    if (detalhesCarona) {
                      // Preencher o formulário com as informações obtidas
                      document.getElementById('address_ride').value = detalhesCarona.address_ride || '';
                      document.getElementById('time_ride').value = detalhesCarona.time_ride || '';
                      document.getElementById('max_quant_ride').value = detalhesCarona.max_quant_ride || '';

                      document.getElementById('formulario_cad').style.display = 'block';
                    } else {
                      console.error('Dados ausentes na resposta JSON ou estrutura incorreta.');
                    }
                  } catch (e) {
                    console.error('Erro ao processar a resposta JSON:', e);
                  }
                } else {
                  console.error('Erro Interno!');
                }
              };

              console.log('Resposta da solicitação:', xhrPegarCarona.responseText);
              console.log('Detalhes da carona:', detalhesCarona);

              // Antes de enviar a solicitação
              console.log('Enviando solicitação com cod_ride:', idDoRegistro);

              xhrPegarCarona.send('cod_ride=' + encodeURIComponent(idDoRegistro));
            });
          }
          // // Adiciona evento de clique ao botão "Voltar" dentro desta função
          // document.getElementById('voltar_CadUse').addEventListener('click', function () {
          //   voltarButton('lista_carona');

          //   // Cancela o intervalo de atualização
          //   clearInterval(caronaInterval);

          //   visibilidadeBtn('block', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);
          // });

          // Botão Cancelar Carona
          let btnCancel = document.getElementById('btn_cancel');
          if (btnCancel) {
            btnCancel.addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              let xhrCancelButton = new XMLHttpRequest();
              xhrCancelButton.open('POST', 'php/cancelar_cad_caronas.php', true);

              xhrCancelButton.onload = function () {
                if (xhrCancelButton.status >= 200 && xhrCancelButton.status < 400) {
                  console.log('Carona cancelada com sucesso!');
                } else {
                  console.error('Erro Interno!');
                }
              };

              xhrCancelButton.onerror = function () {
                console.error('Erro Interno!');
              };


              xhrCancelButton.send('cod_ride=' + encodeURIComponent(idDoRegistro));
            });
          }

          // Adiciona evento de clique ao botão "Voltar" dentro desta função
          document.getElementById('voltar').addEventListener('click', function () {
            voltarButton('lista_carona');

            // Cancela o intervalo de atualização
            clearInterval(caronaInterval);

            visibilidadeBtn('block', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton, sairButton);
          });

        } else {
          console.error('Erro ao carregar a lista de caronas.');
        }
      };

      xhrCaronaCadastrada.onerror = function () {
        console.error('Erro de conexão ao atualizar o registro.');
      };

      xhrCaronaCadastrada.send();
    }

    // Chama a função para atualizar a lista de caronas imediatamente
    atualizarCaronas();

    // Chama a função para atualizar a lista de caronas
    caronaInterval = setInterval(atualizarCaronas, 2000);
  }

  function sair() {
    // Chama a função para destruir a sessão
    function destroySession() {
      // Faz uma requisição para destruir a sessão usando fetch
      return fetch('php/destroy_session.php', { credentials: 'include' })
        .then(response => response.json());
    }

    destroySession()
      .then(data => {
        if (data.success) {
          console.log('Sessão destruída com sucesso.');
          // Redireciona o usuário para a página de login (ou outra página desejada)
          window.location.href = '../src/login.html';
        } else {
          console.error('Erro ao destruir a sessão.');
        }
      })
      .catch(error => {
        console.error('Erro ao destruir a sessão.', error);
      });
  }
  // Controle Sessões
  window.addEventListener('beforeunload', function () {
    // Faz uma requisição para destruir a sessão
    destroySession()
      .then(data => {
        if (data.success) {
          console.log('Sessão destruída com sucesso.');
        } else {
          console.error('Erro ao destruir a sessão.');
        }
      })
      .catch(error => {
        console.error('Erro ao destruir a sessão.', error);
      });
  });

  // Adiciona eventos aos botões
  darCaronaButton.addEventListener('click', darCarona);
  pegarCaronaButton.addEventListener('click', pegarCarona);
  caronaAceitaCaronaButton.addEventListener('click', caronaAceita);
  caronaCadastradasButton.addEventListener('click', caronaCadstradas);
  sairButton.addEventListener('click', sair);
});