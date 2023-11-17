export function visibilidadeBtn(tipo, ...botoes) {
    for (let botao of botoes) {
      if (botao) {
        botao.style.display = tipo;
      }
    }
  }
  