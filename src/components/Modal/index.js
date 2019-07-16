import React, { Component } from 'react';
import Widget from './../Widget';

import './modal.css';

class Modal extends Component {
  render() {
    // if (!this.props.estaAberto) return null;
    return (
      <div
        onClick={this.props.onClose}
        className={`modal ${this.props.estaAberto ? 'modal--aberto' : ''}`}
      >
        <div className="modal__wrap">
          <Widget>
            {this.props.children}
          </Widget>
        </div>
      </div>
    );
  }
}

export default Modal;
