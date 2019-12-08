import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

function MeuPrimeiroComponenteReact(props) {
    return (
        <div>
            <div>ABC</div>
            <div>{props.nome}</div>
            <div>{props.batata}</div>
            <SegundoComponente nome={props.nome} />
        </div>
    )
}

function SegundoComponente (props) {
    return (
        <div>{props.nome}</div>
    )
}

ReactDOM.render(<MeuPrimeiroComponenteReact batata="muito boa" nome="jun"/>, document.getElementById('root'));
