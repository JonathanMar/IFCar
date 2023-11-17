export function verificarSessao() {
    return fetch('php/check_session.php', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao verificar a sessão.');
        }
        return response.json();
      })
      .then(data => {
        if (data.logged_in) {

        } else {
          window.location.href = '../src/login.html';
        }
      })
      .catch(() => {
          return { error : 'Erro ao verificar a sessão.' };
      });
  }  