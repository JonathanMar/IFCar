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
  // let caronaCadastradasButton = document.getElementById('carnas_cadastradas');
  let sairButton = document.getElementById('sair');
  let voltar_btn_click;

  // Função para dar carona
  function darCarona() {
    visibilidadeBtn('none', pegarCaronaButton, caronaAceitaCaronaButton, sairButton);

    fetch('../src/formulario_cadastro.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o formulário. Motivo: ' + response.statusText);
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('formulario_cad').innerHTML = html;

        // Função para cadastrar
        document.getElementById('form_cadastro').addEventListener('submit', function (event) {
          event.preventDefault();

          let formData = new FormData(this);

          // Obtém a data atual do navegador
          let date_ride = new Date();
          formData.append('date_ride', date_ride.toISOString());

          fetch('../php/cadastra_carona.php', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json()) 
            .then(data => {
              if (data.error) {
                console.error('Erro ao cadastrar a carona:', data.error);
              } 
            })
            .catch(error => {
              console.error('Erro ao realizar a requisição:', error);
            });

          this.reset();
        });

        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar_CadUse').addEventListener('click', function () {
          voltarButton('formulario_cad');

          visibilidadeBtn('block', pegarCaronaButton, darCaronaButton, caronaAceitaCaronaButton, sairButton);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar o formulário:', error);
      });
  }

  // Função para pegar carona
  function pegarCarona() {
    let caronaInterval;
    visibilidadeBtn('none', darCaronaButton, caronaAceitaCaronaButton, sairButton);

    function atualizarCaronas() {
      let xhrPegarCarona = new XMLHttpRequest();
      xhrPegarCarona.open('GET', '../php/mostra_carona.php', true);

      xhrPegarCarona.onload = function () {
        if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrPegarCarona.responseText;

          let btn_aceita_carona = document.getElementsByClassName('aceitar_carona');

          for (let i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              let accepted_ride = 1;

              let xhrCaronaAceita = new XMLHttpRequest();
              xhrCaronaAceita.open('POST', '../php/aceita_carona.php', true);
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

            clearInterval(caronaInterval);

            visibilidadeBtn('block', darCaronaButton, caronaAceitaCaronaButton, sairButton);
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

    atualizarCaronas();

    caronaInterval = setInterval(atualizarCaronas, 2000);
  }

  function caronaAceita() {
    // Exibe Botões
    visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, sairButton);

    function atualizarCaronas() {
      let xhrPegarCarona = new XMLHttpRequest();
      xhrPegarCarona.open('GET', '../php/caronas_aceitas.php', true);

      xhrPegarCarona.onload = function () {
        if (xhrPegarCarona.status >= 200 && xhrPegarCarona.status < 400) {
          document.getElementById('lista_carona').innerHTML = xhrPegarCarona.responseText;

          let btn_aceita_carona = document.getElementsByClassName('cancelar_carona');

          for (let i = 0; i < btn_aceita_carona.length; i++) {
            btn_aceita_carona[i].addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;
              let accepted_ride = 1;

              let xhrCaronaAceita = new XMLHttpRequest();
              xhrCaronaAceita.open('POST', '../php/cancela_carona.php', true);
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
           
            clearInterval(caronaInterval);

            visibilidadeBtn('block', darCaronaButton, pegarCaronaButton);
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

    atualizarCaronas();

    caronaInterval = setInterval(atualizarCaronas, 2000);
  }

  // Função Caronas Cadastradas
  // function caronaCadastradas() {
  //   voltar_btn_click = document.getElementById('voltar_btn');
  //   if (voltar_btn_click) {
  //     voltar_btn_click.addEventListener('click', voltar_btn);
  //     console.log('CLICADO!');
  //   }

  //   visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, sairButton);

  //   function atualizarCaronas() {
  //     let xhrCaronas = new XMLHttpRequest();
  //     xhrCaronas.open('GET', '../php/caronas_cadastradas.php', true);

  //     xhrCaronas.onload = function () {
  //       if (xhrCaronas.status >= 200 && xhrCaronas.status < 400) {
  //         document.getElementById('lista_carona').innerHTML = xhrCaronas.responseText;

  //         // Botão Editar Carona
  //         let btnsEdit = document.querySelectorAll('.btn_edit');
  //         btnsEdit.forEach(btn => {
  //           btn.addEventListener('click', function () {
  //             let idDoRegistro = this.dataset.id;
  //             console.log('Editar Carona - ID:', idDoRegistro);

  //             // Chama a função para editar a carona
  //             editarCarona(idDoRegistro);
  //           });
  //         });

  //         // Botão Cancelar Carona
  //         let btnCancel = document.getElementById('btn_cancel');
  //         if (btnCancel) {
  //           btnCancel.addEventListener('click', function () {
  //             let cod_ride = this.dataset.id;

  //             // Enviar uma solicitação POST para cancelar a carona
  //             let xhrCancelarCarona = new XMLHttpRequest();
  //             xhrCancelarCarona.open('POST', '../php/cancelar_cad_caronas.php', true);
  //             xhrCancelarCarona.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  //             xhrCancelarCarona.onload = function () {
  //               if (xhrCancelarCarona.status >= 200 && xhrCancelarCarona.status < 400) {
  //                 console.log(xhrCancelarCarona.responseText); // Exibir a mensagem de sucesso ou erro no console
  //                 // Adicione aqui a lógica para manipular a resposta, se necessário
  //               } else {
  //                 console.error('Erro durante a solicitação de cancelamento.');
  //               }
  //             };

  //             xhrCancelarCarona.onerror = function () {
  //               console.error('Erro durante a solicitação de cancelamento.');
  //             };

  //             xhrCancelarCarona.send('cod_ride=' + encodeURIComponent(cod_ride));
  //           });
  //         }
  //       } else {
  //         console.error('Erro ao carregar a lista de caronas.');
  //       }
  //     };

  //     xhrCaronas.onerror = function () {
  //       console.error('Erro de conexão.');
  //     };

  //     xhrCaronas.send();
  //   }

  //   // Chama a função para atualizar a lista de caronas imediatamente
  //   atualizarCaronas();

  //   // Chama a função para atualizar a lista de caronas
  //   caronaInterval = setInterval(atualizarCaronas, 2000);
  // }

  // // Função para voltar
  // function voltar_btn() {
  //   voltarButton('lista_carona');

  //   // Cancela o intervalo de atualização
  //   clearInterval(caronaInterval);

  //   visibilidadeBtn('block', darCaronaButton, caronaAceitaCaronaButton, sairButton);
  // }

  // // Função para editar a carona
  // function editarCarona(idDoRegistro) {
  //   fetch(`../php/editar_caronas.php?cod_ride=${encodeURIComponent(idDoRegistro)}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Erro ao obter detalhes da carona.');
  //       }
  //       return response.json();
  //     })
  //     .then(detalhesCarona => {
  //       // Preencher o formulário com as informações obtidas
  //       document.getElementById('address_ride').value = detalhesCarona.address_ride || '';
  //       document.getElementById('time_ride').value = detalhesCarona.time_ride || '';
  //       document.getElementById('max_quant_ride').value = detalhesCarona.max_quant_ride || '';

  //       document.getElementById('lista_carona').style.display = 'none';
  //       document.getElementById('formulario_cad').style.display = 'block';
  //     })
  //     .catch(error => {
  //       console.error('Erro ao processar a resposta JSON:', error);
  //     });
  // }

  // // Função para cancelar a carona
  // function cancelarCarona(idDoRegistro) {
  //   fetch(`../php/cancelar_cad_caronas.php`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     },
  //     body: `cod_ride=${encodeURIComponent(idDoRegistro)}`,
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Erro ao cancelar a carona.');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Erro ao cancelar a carona:', error);
  //     });
  // }

  if (sairButton.style.display !== 'none') {
    function sair() {
      function destroySession() {
        return fetch('../php/destroy_session.php', { credentials: 'include' })
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
  }

  window.addEventListener('beforeunload', function () {
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
  // caronaCadastradasButton.addEventListener('click', caronaCadastradas);
  sairButton.addEventListener('click', sair);
});