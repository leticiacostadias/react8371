import { createStore } from 'redux';

const stateInicial = {
  status: '',
  bolinho: []
};

function reducer (store = stateInicial, action = {}) {
  // console.log(action);

  switch (action.type) {
    case 'NOVO_BOLINHO':
      return { status: 'assando', bolinho: store.bolinho };
    
    case 'BOLINHO_ASSADO':
      return {
        status: 'pronto',
        bolinho: [action.payload, ...store.bolinho ]
      };
    
    default:
      return store;
  }

  // action.type 'NOVO_BOLINHO'
  // if (action.type === 'NOVO_BOLINHO') {
  //   return { status: 'assando', bolinho: store.bolinho };
  // }

  // if (action.type === 'BOLINHO_ASSADO') {
  //   // console.log(action.payload);
  //   // store.bolinho = [action.payload];

  //   return {
  //     status: 'pronto',
  //     bolinho: [action.payload, ...store.bolinho ]
  //   };
  // }

  // return store;
}

const store = createStore(reducer);

console.log('Store foi criada!');

window.store = store;
