import { createStore } from 'redux';

const stateInicial = {
  status: '',
  bolinho: []
};

function reducer (store = stateInicial, action = {}) {
  // console.log(action);

  // action.type 'NOVO_BOLINHO'
  if (action.type === 'NOVO_BOLINHO') {
    return { status: 'assando', bolinho: store.bolinho };
  }

  if (action.type === 'BOLINHO_ASSADO') {
    // console.log(action.sabor);
    // store.bolinho = [action.sabor];

    return {
      status: 'pronto',
      bolinho: [action.sabor, ...store.bolinho ]
    };
  }

  return store;
}

const store = createStore(reducer);

console.log('Store foi criada!');

window.store = store;
