import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
  state = {
    erro: ''
  }

  handleSubmit = async (evento) => {
    evento.persist();
    evento.preventDefault();

    // pegar o usuario e senha
    // console.log(this.umtrem.value);
    // console.log(this.refs.username.value);
    // console.log(this.refs.password.value);

    // IE 6 -> axios
    // fetch(`https://api.com.br/user/${this.props.match.params.id}`)
    const resposta = await fetch('http://twitelum-api.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({
        login: this.refs.username.value,
        senha: this.refs.password.value
      })
    });

    // console.log(evento.target);
    const dados = await resposta.json();

    if (dados.code) {
      this.setState({
        erro: dados.message
      });

      return;
    }

    localStorage.setItem('token', dados.token);
    this.props.history.push('/');

    // .then(resposta => {
    //   // console.log(resposta);
    //   // throw resposta;

    //   return resposta.json();
    // }).then(dados => {
    //   // console.log(dados);

    //   if (dados.code) {
    //     throw dados;
    //   }
    //   // guardar token em algum lugar
    //   // cookies, sessionStorage, localStorage
    //   localStorage.setItem('token', dados.token);

    //   // redirecionar pra home
    //   this.props.history.push('/');
    //   // this.props.match.params.id
    // }).catch(data => {
    //   // console.log(data);

    //   this.setState({
    //     erro: data.message
    //   });
    // });
  }

  render() {
    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>
              <form
                className="loginPage__form"
                action="/"
                onSubmit={this.handleSubmit}
              >
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="login">Login</label>
                  <input
                    ref="username"
                    // ref={(elemento) => { this.umtrem = elemento; }}
                    // ref={c => this.umtrem = c}
                    className="loginPage__input"
                    type="text"
                    id="login"
                    name="login"
                  />
                </div>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input
                    ref="password"
                    className="loginPage__input"
                    type="password"
                    id="senha"
                    name="senha"
                  />
                </div>
                {this.state.erro && (
                  <div className="loginPage__errorBox">
                    {this.state.erro}
                  </div>
                )}
                <div className="loginPage__inputWrap">
                  <button className="loginPage__btnLogin" type="submit">
                    Logar
                  </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default LoginPage