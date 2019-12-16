import React from 'react'

import axios, { setHeaders } from '../utils/axios'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  submitForm = (event) => {
    event.preventDefault()

    axios.post('signin', {
      email: this.state.email,
      password: this.state.password
    })
      .then(payload => {
        if (payload.data.message) {
          this.setState({ error: payload.data.message })
          return
        }

        if (payload.data.token) {
          setHeaders('Authorization', payload.data.token)
          localStorage.setItem('access-token', payload.data.token)
          window.location.href = '/'
        }
      })
  }

  onFormFieldChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    const newState = {}
    newState[name] = value

    this.setState(newState)
  }

  render() {
    return ( //chama submitForm ao usar o botao do tipo submit
      <form onSubmit={this.submitForm}>
        <div className="container">
          <label forhtml="email"><b>Email</b></label>
          <input
            value={this.state.email}
            onChange={this.onFormFieldChange}
            type="text"
            placeholder="Inserir Email"
            name="email"
            required
          />

          <label forhtml="password"><b>Senha</b></label>
          <input
            value={this.state.password}
            onChange={this.onFormFieldChange}
            type="password"
            placeholder="Inserir Senha"
            name="password"
            required
          />

          <button type="submit">Entrar</button>
        </div>

        {this.state.error &&
          <div className = "error">
            {this.state.error}
          </div>
        }
      </form>
    )
  }
}

export default LoginForm
