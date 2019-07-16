import React, { Component, Fragment } from 'react';
import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'

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
    tweets: []
  }

  // UNSAFE_componentWillMount () {}
  componentDidMount = async () => {
    const resposta = await fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`);
    const data = await resposta.json();

    console.log(data);

    this.setState({
      tweets: [ ...data, ...this.state.tweets ]
    });
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

    const { novoTweet, tweets } = this.state;

    // console.log(novoTweet);
    // tweets.push(novoTweet); // não funfa :(

    // salvar tweet no servidor
    const resposta = await fetch(
      `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
      {
        method: 'POST',
        body: JSON.stringify({
          conteudo: novoTweet
        })
      }
    );

    const tweetCriado = await resposta.json();

    console.log(tweetCriado);

    this.setState({
      tweets: [tweetCriado, ...tweets], // ES6 -> spread operator
      novoTweet: ''
    });
  }

  apagaTweet = async (idDoTweet) => {
    const resposta = await fetch(
      `http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
      { method: 'DELETE' }
    );

    if (resposta.ok) {
      const { tweets } = this.state;
      const tweetsQueSobraram = tweets
        .filter((tweet) => tweet._id !== idDoTweet);
      
      this.setState({
        tweets: tweetsQueSobraram
      });
    }
  }

  novoTweetValido = () => {
    return this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0;
  }

  render() {
    const { novoTweet, tweets } = this.state;

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
                {tweets.length === 0 && (
                  <>
                    <span>
                      Twite alguma coisa! Vamos falar com pessoas!
                    </span>
                  </>
                )} {/* truthy */}
                {/* {tweets.length === 0 ? 'Twite alguma coisa! Vamos falar com pessoas!' : ''} */}
                {tweets.map(tweet => (
                  <Tweet
                    key={tweet._id}
                    id={tweet._id}
                    avatarUrl={tweet.usuario.foto}
                    totalLikes={tweet.totalLikes}
                    likeado={tweet.likeado}
                    removivel={tweet.removivel}
                    // onApagar={() => this.apagaTweet(tweet._id)}
                    onApagar={this.apagaTweet}
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
      </Fragment>
    );
  }
}

export default App;
