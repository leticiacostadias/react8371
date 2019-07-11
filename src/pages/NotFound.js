import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  // handleClick = (evento) => {
  //   evento.preventDefault();
  // }

  render () {
    return (
      <>
        <h1>Você está perdido?</h1>
        <Link to="/">
          Voltar para a home
        </Link>
        {/* <a href="/" onClick={this.handleClick.bind(this)}> */}
        {/* <a href="/" onClick={this.handleClick}>
          Voltar para a home
        </a> */}
      </>
    );
  }
}

export default NotFound;
