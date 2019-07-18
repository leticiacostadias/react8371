import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

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
    // payload -> id do tweet excluído -> action.payload
    case 'APAGA_TWEET':
      const idDoTweet = action.payload;

      // store.tweets.filter((tweet) => tweet._id !== idDoTweet));
      const tweetsQueSobraram = store.tweets
        .filter((tweet) => !(tweet._id === idDoTweet));
      
      return { tweets: tweetsQueSobraram };
    

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

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

console.log('Store foi criada!');

// window.store = store;

export default store;
