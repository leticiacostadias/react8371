import React, { Component } from 'react';

import './Cabecalho.css';

const Cabecalho = (props) => {
    // p/ pegar o atributo => this.props.usuario
    // p/ pegar componentes, conteúdo => this.props.children

  return (
    <header className="cabecalho">
      <h1>Twitelum</h1>

      {props.children /* [] */ }

      <input type="search" placeholder="Busque alguma coisa" />
    </header>
  );
}

export default Cabecalho;
