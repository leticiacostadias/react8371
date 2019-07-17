import { createStore } from 'redux';

const stateInicial = {
  tweets: [],
  // tweetSelecionado: '',
  // bolinho: []
};

function reducer (store = stateInicial, action = {}) {
  /* 
    {
      type: '',
      payload: {}
    }
  */
  // regra 1 - sempre crio um objeto/array novo
  // regra 2 - persistir o conteúdo da store
  // console.log(action);

  switch (action.type) {
    case 'CARREGA_TWEETS':
      return { tweets: action.payload };
    
    case 'NOVO_TWEET':
      return {
        tweets: [action.payload, ...store.tweets]
      };
    
    // type novo p/ excluir
    // payload -> id do tweet excluído


    // case 'NOVO_BOLINHO':
    //   return { status: 'assando', bolinho: store.bolinho };
    
    // case 'BOLINHO_ASSADO':
    //   return {
    //     status: 'pronto',
    //     bolinho: [action.payload, ...store.bolinho ]
    //   };
    
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

// window.store = store;

export default store;
