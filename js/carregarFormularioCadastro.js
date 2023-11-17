export function carregarFormularioCadastro() {
    return fetch('src/formulario_cadastro.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o formulário de cadastro.');
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('formulario_cad').innerHTML = html;
        // Restante do código
      })
      .catch(error => {
        console.error('Erro ao carregar o formulário de cadastro:', error);
      });
  }
  