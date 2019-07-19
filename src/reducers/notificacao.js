const stateInicial = '';

function reducerNotificacao (store = stateInicial, action = {}) {
  switch (action.type) {
    case 'EXIBIR_NOTIFICACAO':
      return action.payload;

    case 'ESCONDER_NOTIFICACAO':
      return '';

    default:
      return store;
  }
}

export default reducerNotificacao;