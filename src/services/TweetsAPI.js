import config from './../config';
const { apiUrl, endpoints } = config;

export function listaTweets(token) {
  return (dispatch) => {
    try {
      // const resposta = await fetch(`${apiUrl}${endpoints.listTweets}?X-AUTH-TOKEN=${token}`);
      // const data = await resposta.json();

      return fetch(`${apiUrl}${endpoints.listTweets}?X-AUTH-TOKEN=${token}`)
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
