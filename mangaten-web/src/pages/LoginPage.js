import React from 'react'

import '../css/login.css'

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

class LoginPage extends React.Component {
  state = {
    isLogin: true
  }

  toogleIsLogin = () => {
    this.setState({ isLogin: !this.state.isLogin })
  }

  render() {
    return (
      <div className="sign">
        {this.state.isLogin &&
          <div>
            <LoginForm />
            <div className = "tooglesign">Não possui conta, <span className="click" onClick={this.toogleIsLogin}>clique aqui</span> para se cadastrar</div>
          </div>
        }
        {!this.state.isLogin &&
          <div>
            <SignUpForm />
            <div className = "tooglesign">Já possui uima conta, <span className="click" onClick={this.toogleIsLogin}>clique aqui</span> para logar</div>
          </div>
        }
      </div>
    )
  }
}

export default LoginPage
