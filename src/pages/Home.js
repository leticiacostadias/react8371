import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Modal from './../components/Modal'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'

import Tweet from './../containers/TweetConectado'

// import { listaTweets } from './../services/TweetsAPI';
import * as TweetsAPI from './../services/TweetsAPI';

class App extends Component {
  // constructor (props) {
  //   super(props);

    // this.state = {
    //   novoTweet: ''
    // };

    // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  state = {
    novoTweet: '',
    tweetSelecionado: null,
    // modalAberto: false,
    // tweets: []
  }

  // UNSAFE_componentWillMount () {}
  componentDidMount = async () => {
    // window.store.subscribe(() => {
    //   const stateDaStore = window.store.getState();

    //   this.setState({
    //     tweets: stateDaStore.tweets
    //   });
    // });

    // const resposta = await fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`);
    // const data = await resposta.json();

    // console.log(data);

    // this.props.dispatch({
    //   type: 'CARREGA_TWEETS',
    //   payload: data
    // });
    const token = localStorage.getItem('token');
    // const action = await TweetsAPI.listaTweets(token);

    this.props.dispatch(TweetsAPI.listaTweets(token));
    // console.log(TweetsAPI.listaTweets(token));
    // this.setState({
    //   tweets: [ ...data, ...this.state.tweets ]
    // });
  }
  
  // UNSAFE_componentWillUpdate () {}
  // componentDidUpdate () {
    // if (!this.state.novoTweet) {
    //   this.setState({ novoTweet: 'bolinho' });
    // }
  // }

  // componentWillUnmount () {}
  // UNSAFE_componentDidUnmount () {}

  // componentDidCatch () {}

  // handleSubmit(evento) {
  handleSubmit = async (evento) => {
    evento.preventDefault();

    // console.log(this);

    const { novoTweet } = this.state;
    const token = localStorage.getItem('token');
    // console.log(novoTweet);
    // tweets.push(novoTweet); // não funfa :(
    try {
      // this.props.dispatch(await TweetsAPI.criaTweet(novoTweet, token, () => {
      //   this.setState({ novoTweet: '' });
      // }));
      this.props.dispatch(await TweetsAPI.criaTweet(novoTweet, token));
      this.props.dispatch({
        type: 'EXIBIR_NOTIFICACAO',
        payload: 'Novo tweet criado com sucesso! Beware the treta!'
      })

      // console.log(tweetCriado);
      this.setState({
        // tweets: [tweetCriado, ...tweets], // ES6 -> spread operator
        novoTweet: ''
      });
    } catch (e) {
      console.log('não pude executar a request');
    }
  }

  // criar uma função que coloque
  // o tweet clicado no state
  abreModalTweet = (tweetClicado) => {
    this.setState({
      // modalAberto: true,
      tweetSelecionado: tweetClicado
    });
  }

  apagaTweet = async (idDoTweet) => {
    const token = localStorage.getItem('token');

    try {
      const { success, action } = await TweetsAPI.deletaTweet(idDoTweet, token);

      if (success) {
        this.props.dispatch(action);

        // const { tweets } = this.state;
        // const tweetsQueSobraram = tweets
        //   .filter((tweet) => tweet._id !== idDoTweet);
        
        this.setState({
          // tweets: tweetsQueSobraram,
          tweetSelecionado: null
          // modalAberto: false
        });
      }
    } catch (e) {
      console.log('damn!');
    }
    // }
  }

  fechaModal = (event) => {
    if (event.target.closest('.modal__wrap')) return;

    // const { modalAberto } = this.state;

    this.setState({
      tweetSelecionado: null
      // modalAberto: false,
      // modalAberto: !modalAberto
    });
  }

  novoTweetValido = () => {
    const { novoTweet }= this.state;

    return novoTweet.length > 140 || novoTweet.length === 0;
  }

  render() {
    const {
      novoTweet,
      // tweets,
      // modalAberto,
      tweetSelecionado
    } = this.state;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@felizbol" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form
                className="novoTweet"
                onSubmit={this.handleSubmit}
              >
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${this.novoTweetValido() ? 'novoTweet__status--invalido' : ''}`}
                  >
                    {novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    value={novoTweet}
                    onChange={(evento) => this.setState({
                      novoTweet: evento.target.value
                    })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={this.novoTweetValido()}
                  className="novoTweet__envia"
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea itens={['lol', 'cs', 'biscoitos']} />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.props.listaTweets.length === 0 && (
                  <>
                    <span>
                      Twite alguma coisa! Vamos falar com pessoas!
                    </span>
                  </>
                )} {/* truthy */}
                {/* {tweets.length === 0 ? 'Twite alguma coisa! Vamos falar com pessoas!' : ''} */}
                {this.props.listaTweets.map(tweet => (
                  <Tweet
                    key={tweet._id}
                    id={tweet._id}
                    avatarUrl={tweet.usuario.foto}
                    totalLikes={tweet.totalLikes}
                    likeado={tweet.likeado}
                    removivel={tweet.removivel}
                    // onApagar={() => this.apagaTweet(tweet._id)}
                    onApagar={this.apagaTweet}
                    // onClick={this.abreModalTweet.bind(this, tweet)}
                    onClick={() => this.abreModalTweet(tweet)}
                    usuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                    username={tweet.usuario.login}
                  >
                    {tweet.conteudo}
                  </Tweet>
                ))}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          estaAberto={tweetSelecionado}
          onClose={this.fechaModal}
        >
          {tweetSelecionado && (
            <Tweet
              id={tweetSelecionado._id}
              avatarUrl={tweetSelecionado.usuario.foto}
              totalLikes={tweetSelecionado.totalLikes}
              likeado={tweetSelecionado.likeado}
              removivel={tweetSelecionado.removivel}
              onApagar={this.apagaTweet}
              usuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
              username={tweetSelecionado.usuario.login}
            >
              {tweetSelecionado.conteudo}
            </Tweet>
          )}
        </Modal>
        {this.props.notificacao && (
          <div
            className="notificacaoMsg"
            onAnimationEnd={() => this.props.dispatch({
              type: 'ESCONDER_NOTIFICACAO'
            })}>
            {this.props.notificacao}
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps (stateDaStore) {
  return {
    listaTweets: stateDaStore.tweets.lista,
    notificacao: stateDaStore.notificacao
  };
}

export default connect(mapStateToProps)(App);
// export default connect()(App);
