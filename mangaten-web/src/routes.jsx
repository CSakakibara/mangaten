import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import LoginForm from './components/LoginForm'
import Profile from './components/Profile'

export default function Routes() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/perfil">Perfil</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Switch>
        <Route path="/about">
          <div>Sobre</div>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/perfil">
          <Profile />
        </Route>
        <Route path="/">
          <div>Pagina inicial</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
