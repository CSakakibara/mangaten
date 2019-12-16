import React from 'react'

import axios, { setHeaders } from '../utils/axios'

class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    name: '',
    error: null
  }

  submitForm = (event) => {
    event.preventDefault()

    axios.post('signup', {
      email: this.state.email,
      username: this.state.username,
      name: this.state.name,
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
    debugger

    return (
      <form onSubmit={this.submitForm}>
        <div className="container">
          <label forhtml="name"><b>Nome</b></label>
          <input
            value={this.state.name}
            onChange={this.onFormFieldChange}
            type="text"
            placeholder="Inserir Nome"
            name="name"
            required
          />
          <label forhtml="email"><b>Email</b></label>
          <input
            value={this.state.email}
            onChange={this.onFormFieldChange}
            type="text"
            placeholder="Inserir Email"
            name="email"
            required
          />
          <label forhtml="username"><b>Username</b></label>
          <input
            value={this.state.username}
            onChange={this.onFormFieldChange}
            type="text"
            placeholder="Inserir username"
            name="username"
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


          <button type="submit">Criar Conta</button>
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

export default SignUpForm
