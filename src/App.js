import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  // constructor (props) {
  //   super(props);

  //   this.state = {
  //     novoTweet: ''
  //   };
  // }

  state = {
    novoTweet: ''
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span className="novoTweet__status">0/140</span>
                            <textarea
                                className="novoTweet__editor"
                                placeholder="O que está acontecendo?"
                                value={this.state.novoTweet}
                                onChange={(evento) => this.setState({
                                  novoTweet: evento.target.value
                                })}
                            />
                        </div>
                        <button type="submit" className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea itens={['lol', 'cs', 'biscoitos']} />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        <Tweet
                            avatarUrl="https://bit.ly/2xF8hAM"
                            usuario="Felizberto Bolinhos"
                            username="felizbol"
                        >
                            Hoje tem rolê com o Pumba! <br />
                            <a href="/">#timao</a> <a href="/">#pumba</a>
                        </Tweet>
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
