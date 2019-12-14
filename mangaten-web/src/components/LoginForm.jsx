import React from 'react'
// import axios from 'axios'
import './LoginForm.css'

import axios, { setHeaders } from '../axios'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  submitForm = async (event) => {
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
        }
      })
  }

  onFormFieldChange = (event) => {
    const value = event.target.value
    const name = event.target.name // email || password

    const newState = {}
    newState[name] = value

    // limpar this.setState.error quando mudar qualquer campo do formulario

    this.setState(newState)
  }

  render() {
    console.log(this.state)

    return (
      <form onSubmit={this.submitForm}>
        <div on className="container">
          <label forhtml="email"><b>Email</b></label>
          <input
            value={this.state.email}
            onChange={this.onFormFieldChange}
            type="email"
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

          <button type="submit">Login</button>
        </div>

        {this.state.error &&
          <div>
            {this.state.error}
          </div>
        }
      </form>
    )
  }
}

export default LoginForm
