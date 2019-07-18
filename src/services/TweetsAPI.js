import config from './../config';
const { apiUrl, endpoints } = config;
const { tweets } = endpoints;

export function listaTweets(token) {
  return (dispatch) => {
    try {
      // const resposta = await fetch(`${apiUrl}${endpoints.listTweets}?X-AUTH-TOKEN=${token}`);
      // const data = await resposta.json();

      return fetch(
        `${apiUrl}${tweets.read.action}?X-AUTH-TOKEN=${token}`,
        { method: tweets.read.method }
      )
        .then(resposta => resposta.json())
        .then(data => {
          dispatch({
            type: 'CARREGA_TWEETS',
            payload: data
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
}

// Tratamento de erro com thunk
// export async function criaTweet(novoTweet, token, onSuccess) {
//   return async (dispatch) => {
//     try {
//       const resposta = await fetch(
//         `${apiUrl}${tweets.create.action}?X-AUTH-TOKEN=${token}`,
//         {
//           method: tweets.create.method,
//           body: JSON.stringify({
//             conteudo: novoTweet
//           })
//         }
//       );

//       const tweetCriado = await resposta.json();

//       onSuccess();

//       dispatch({
//         type: 'NOVO_TWEET',
//         payload: tweetCriado
//       });
//     } catch (e) {
//       console.log('algo deu errado');
//     }
//   }
// }

export async function criaTweet(novoTweet, token) {
  const resposta = await fetch(
    `${apiUrl}${tweets.create.action}?X-AUTH-TOKEN=${token}`,
    {
      method: tweets.create.method,
      body: JSON.stringify({
        conteudo: novoTweet
      })
    }
  );

  const tweetCriado = await resposta.json();

  return {
    type: 'NOVO_TWEET',
    payload: tweetCriado
  };
}

export async function deletaTweet(tweetId, token) {
  const resposta = await fetch(
    `${apiUrl}${tweets.delete.action}${tweetId}?X-AUTH-TOKEN=${token}`,
    { method: tweets.delete.method }
  );

  if (resposta.ok) {
    return {
      success: true,
      action: {
        type: 'APAGA_TWEET',
        payload: tweetId
      }
    };
  }
}

export async function likeTweet (tweetId, token) {
  const resposta = await fetch(
    `http://twitelum-api.herokuapp.com/tweets/${tweetId}/like?X-AUTH-TOKEN=${token}`,
    { method: 'POST' }
  );

  return {
    success: resposta.ok,
    action: {
      type: 'CURTE_TWEET',
      payload: tweetId
    }
  };
}
