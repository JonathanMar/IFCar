document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('dar_carona').addEventListener('click', function () {
    var xhr = new XMLHttpRequest(); // Cria um objeto XMLHttpRequest
    xhr.open('GET', 'formulario_cadastro.html', true); // Especifique o arquivo que contém o formulário

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        // O pedido foi bem-sucedido; aqui você pode manipular a resposta
        document.getElementById('formulario').innerHTML = xhr.responseText; // Atualize o elemento com o formulário
      } else {
        // O servidor retornou um erro
        console.error('Erro ao carregar o formulário.');
      }
    };

    xhr.onerror = function () { 
      // Houve um erro de conexão
      console.error('Erro de conexão.');
    };

    xhr.send(); // Envia a requisição
  });

  document.getElementById('pegar_carona').addEventListener('click', function () {
    var xhr = new XMLHttpRequest(); // Cria um objeto XMLHttpRequest
    xhr.open('GET', 'pegar_carona.html', true); // Especifique o arquivo que contém o formulário

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        // O pedido foi bem-sucedido; aqui você pode manipular a resposta
        document.getElementById('lista_carona').innerHTML = xhr.responseText; // Atualize o elemento com o formulário
      } else {
        // O servidor retornou um erro
        console.error('Erro ao carregar o formulário.');
      }
    };

    xhr.onerror = function () { 
      // Houve um erro de conexão
      console.error('Erro de conexão.');
    };

    xhr.send(); // Envia a requisição
  });

});