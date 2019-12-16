import React from "react";
import { Link, withRouter } from "react-router-dom";

import '../css/header.css';

import { setHeaders } from '../utils/axios'

function Header(props) { //define os itens do cabeçalho fixo
  function logout () {
    setHeaders('Authorization', '')
    localStorage.setItem('access-token', '')
    window.location.href = '/'
  }

  return (
    <header className="header">
      <Link id="mangaten" to="/">MangaTen</Link>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Mangas</Link>
          </li>
          <li>
            <Link to="/cart">Carrinho</Link>
          </li>
          {props.logged &&
            <>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li onClick={logout}>
                <a>Sair</a>
              </li>
            </>
          }
          {!props.logged &&
            <li>
              <Link to="/login">Entrar/Registrar</Link>
            </li>
          }
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header)
