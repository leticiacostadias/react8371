import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import './tweet.css';

import { likeTweet } from './../../services/TweetsAPI';

class Tweet extends Component {
  static propTypes = {
    totalLikes: PropTypes.number,
    likeado: PropTypes.bool,
    removivel: PropTypes.bool,
    avatarUrl: PropTypes.string,
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired, // string, number, bool, component
    usuario: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onApagar: PropTypes.func,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onApagar: () => {},
    onClick: null,
    // onClick: () => {},
    totalLikes: 0,
    likeado: false,
    removivel: false,
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  }

  // state = {
  //   numeroLikes: this.props.totalLikes,
  //   curtido: this.props.likeado
  // }

  handleLike = async () => {
    const { id } = this.props;
    // const { curtido, numeroLikes } = this.state;
    await this.props.onLike(id);

    // const resposta = await fetch(
    //   `http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
    //   { method: 'POST' }
    // );

    // if (resposta.ok) {
    //   this.setState({
    //     numeroLikes: numeroLikes + (curtido ? -1 : 1),
    //     curtido: !curtido
    //   });
    // }
  }

  handleExcluir = () => {
    this.props.onApagar(this.props.id);
  }

  handleClick = (evento) => {
    const { onClick } = this.props;

    if (!evento.target.closest('.tweet__action') && onClick) {
      onClick();
    }
  }

  getHeartIconClass = () => {
    const { likeado } = this.props;

    return `icon icon--small iconHeart ${likeado ? 'iconHeart--active' : ''}`;
  }

  render() {
    const {
      avatarUrl,
      children,
      usuario,
      username,
      totalLikes,
      removivel
    } = this.props;
    // const { numeroLikes } = this.state;

    return (
      <article className="tweet" onClick={this.handleClick}>
        <div className="tweet__cabecalho">
          <img className="tweet__fotoUsuario" src={avatarUrl} alt="" />
          <span className="tweet__nomeUsuario">
            {usuario}
          </span>
          <a href="/">
            <span className="tweet__userName">
              @{username}
            </span>
          </a>
        </div>
        <p className="tweet__conteudo">
          <span>
            {children}
          </span>
        </p>
        <footer className="tweet__footer">
          <button
            className="tweet__action btn btn--clean"
            onClick={this.handleLike}
          >
            <svg
              className={this.getHeartIconClass()}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.5 47.5"
            >
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {totalLikes}
          </button>
          {removivel && (
            <button
              // onClick={() => onApagar(id)}
              onClick={this.handleExcluir}
              className="tweet__action btn btn--blue btn--remove"
            >
              X
            </button>
          )}
        </footer>
      </article>
    )
  }
}

// export default connect()(Tweet);
export default Tweet;