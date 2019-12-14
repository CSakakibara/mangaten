import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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
              <Link to="/topics">Topicos</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Switch>
        <Route path="/about">
          <div>Sobre</div>
        </Route>
        <Route path="/topics">
          <div>topicos</div>
        </Route>
        <Route path="/">
          <div>Pagina inicial</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
