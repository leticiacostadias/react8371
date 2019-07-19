const stateInicial = {
  lista: [],
  // tweetSelecionado: '',
  // bolinho: []
};

export default function reducer (store = stateInicial, action = {}) {
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
      return { lista: action.payload };
    
    case 'NOVO_TWEET':
      return {
        lista: [action.payload, ...store.lista]
      };
    
    // type novo p/ excluir
    // payload -> id do tweet excluído -> action.payload
    case 'APAGA_TWEET':
      const idDoTweet = action.payload;

      // store.tweets.filter((tweet) => tweet._id !== idDoTweet));
      const tweetsQueSobraram = store.lista
        .filter((tweet) => !(tweet._id === idDoTweet));
      
      return { lista: tweetsQueSobraram };

    case 'CURTE_TWEET':
      const tweetCurtido = store.lista
        .find((tweet) => tweet._id === action.payload);
      
      tweetCurtido.totalLikes += tweetCurtido.likeado ? -1 : 1;
      tweetCurtido.likeado = !tweetCurtido.likeado;

      return {
        lista: [...store.lista]
      };
    

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