document.addEventListener('DOMContentLoaded', function () {
  let caronaInterval;
  let pegarCaronaButton = document.getElementById('pegar_carona');
  let darCaronaButton = document.getElementById('dar_carona');
  let caronaAceitaCaronaButton = document.getElementById('carrona_aceita');
  let caronaCadastradasButton = document.getElementById('carnas_cadastradas');


  // Controle Sessões
  window.addEventListener('beforeunload', function () {
    // Faz uma requisição para destruir a sessão
    fetch('php/destroy_session.php', { credentials: 'include' })
      .then(response => response.json())
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

  // Função para Mudar Visibilidade dos Botões.
  function visibilidadeBtn(tipo, ...botoes) {
    for (let botao of botoes) {
      if (botao) {
        botao.style.display = tipo;
      }
    }
  };


  // Função para Botão Voltar
  function voltarButton(cont) {
    document.getElementById(cont).innerHTML = '';
  };

  // Função para carregar o formulário de cadastro
  function carregarFormularioCadastro() {
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
  }

  // Função para dar carona
  function darCarona() {
    visibilidadeBtn('none', pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);

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

          let xhrCadastro = new XMLHttpRequest();

          // Obtém a data atual do navegador
          let date_ride = new Date();
          formData.append('date_ride', date_ride.toISOString());

          xhrCadastro.open('POST', 'php/cadastra_carona.php', true);

          xhrCadastro.onload = function () {
            if (xhrCadastro.status >= 200 && xhrCadastro.status < 400) {

            } else {
              console.error('Erro ao cadastrar a carona.');
            }
          };

          xhrCadastro.onerror = function () {
            console.error('Erro de conexão ao cadastrar a carona.');
          };

          xhrCadastro.send(formData);

          // Após o cadastro ser concluído com sucesso, exibe a mensagem
          var mensagemDiv = document.querySelector('.result');
          mensagemDiv.innerHTML = '';

          var xhr = new XMLHttpRequest();
          xhr.open('GET', 'src/msg_coorrect.html', true);

          xhr.onload = function () {
            if (xhr.status === 200) {
              mensagemDiv.innerHTML = xhr.responseText;
            }
          };

          xhr.send();

          this.reset();
        });

        // Adiciona evento de clique ao botão "Voltar"
        document.getElementById('voltar_CadUse').addEventListener('click', function () {
          voltarButton('formulario_cad');

          visibilidadeBtn('block', pegarCaronaButton, darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);
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
    visibilidadeBtn('none', darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);

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

            visibilidadeBtn('block', darCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);
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
    visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, caronaCadastradasButton);

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
    visibilidadeBtn('none', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);

    function atualizarCaronas() {
      let xhrCaronaCadastrada = new XMLHttpRequest();
      xhrCaronaCadastrada.open('GET', 'php/caronas_cadastradas.php', true);

      xhrCaronaCadastrada.onload = function () {
        if (xhrCaronaCadastrada.status >= 200 && xhrCaronaCadastrada.status < 400) {
          document.getElementById('lista_carona').innerHTML = '';
          document.getElementById('lista_carona').innerHTML = xhrCaronaCadastrada.responseText;

          // Botão Editar Carona
          let btnEdit = document.getElementById('btn_edit');
          if (btnEdit) {
            btnEdit.addEventListener('click', function () {
              let idDoRegistro = this.dataset.id;

              // Defina a variável detalhesCarona
              let detalhesCarona;

              let xhrEditButton = new XMLHttpRequest();
              carregarFormularioCadastro(idDoRegistro);

              xhrEditButton.open('POST', 'php/editar_caronas.php', true);

              xhrEditButton.onload = function () {
                if (xhrEditButton.status >= 200 && xhrEditButton.status < 400) {
                  console.log('Resposta JSON:', xhrEditButton.responseText); // Adicionado para depuração

                  try {
                    // Tentativa de analisar a resposta como JSON
                    detalhesCarona = JSON.parse(xhrEditButton.responseText);

                    console.log('Detalhes da carona:', detalhesCarona); // Adicionado para depuração

                    // Verifica se os dados estão presentes na resposta
                    if (detalhesCarona && detalhesCarona.address_ride && detalhesCarona.time_ride && detalhesCarona.max_quant_ride) {
                      // Preencher o formulário com as informações obtidas
                      document.getElementById('address_ride').value = detalhesCarona.address_ride;
                      document.getElementById('time_ride').value = detalhesCarona.time_ride;
                      document.getElementById('max_quant_ride').value = detalhesCarona.max_quant_ride;

                      document.getElementById('formulario_cad').style.display = 'block';
                    } else {
                      console.error('Dados ausentes na resposta JSON.');
                    }
                  } catch (e) {
                    console.error('Erro ao processar a resposta JSON:', e);
                  }
                } else {
                  console.error('Erro Interno!');
                }
              };

              xhrEditButton.onload = function () {
                if (xhrEditButton.status >= 200 && xhrEditButton.status < 400) {
                  console.log('Resposta JSON:', xhrEditButton.responseText);

                  try {
                    // Tentativa de analisar a resposta como JSON
                    let response = JSON.parse(xhrEditButton.responseText);

                    // Verifica se há um erro na resposta
                    if (response.error) {
                      console.error('Erro na solicitação:', response.error);
                    } else {
                      // Verifica se os dados estão presentes na resposta
                      if (response.address_ride && response.time_ride && response.max_quant_ride) {
                        // Preencher o formulário com as informações obtidas
                        document.getElementById('address_ride').value = response.address_ride;
                        document.getElementById('time_ride').value = response.time_ride;
                        document.getElementById('max_quant_ride').value = response.max_quant_ride;

                        document.getElementById('formulario_cad').style.display = 'block';
                      } else {
                        console.error('Dados ausentes na resposta JSON.');
                      }
                    }
                  } catch (e) {
                    console.error('Erro ao processar a resposta JSON:', e);
                  }
                } else {
                  console.error('Erro Interno!');
                }
              };

              xhrEditButton.send('cod_ride=' + encodeURIComponent(idDoRegistro));
            });
          }

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

          // Adiciona evento de clique ao botão "Voltar"
          document.getElementById('voltar').addEventListener('click', function () {
            voltarButton('lista_carona');

            // Cancela o intervalo de atualização
            clearInterval(caronaInterval);

            visibilidadeBtn('block', darCaronaButton, pegarCaronaButton, caronaAceitaCaronaButton, caronaCadastradasButton);
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

  // Adiciona eventos aos botões
  darCaronaButton.addEventListener('click', darCarona);
  pegarCaronaButton.addEventListener('click', pegarCarona);
  caronaAceitaCaronaButton.addEventListener('click', caronaAceita);
  caronaCadastradasButton.addEventListener('click', caronaCadstradas);
});