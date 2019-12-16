import React from 'react'

import '../css/login.css'

import axios from '../utils/axios'

import Loading from './Loading'

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    isEditing: false,
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    axios.get('/users/me')
      .then(payload => {
        if (payload.data.data) {
          const newState = payload.data.data
          newState.isLoading = false

          this.setState(newState)
        }
      })
  }

  toogleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  submitForm = (event) => {
    event.preventDefault()

    const isValid = this.validate()
    if (!isValid) {
      return
    }

    this.setState({
      error: null,
      isLoading: true
    })

    const update = {
      name: this.state.name
    }

    if (this.state.password) {
      update.password = this.state.password
    }

    axios.put('users/me', update)
      .then(() => {
        this.setState({ isLoading: false })
        this.toogleEditing()
      })
  }

  validate = () => {
    if (!this.state.name || this.state.name.trim() === '') {
      return false
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Senha e confirmação diferentes" })
      return false
    }

    return true
  }

  onFormFieldChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    const newState = {}
    newState[name] = value

    this.setState(newState)
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }

    return (
      <div>
        {this.state.isEditing &&
          <div className="sign">
            <form onSubmit={this.submitForm}>
              <div on className="container">
                <label forhtml=""><b>Editar Nome</b></label>
                <input
                  value={this.state.name}
                  onChange={this.onFormFieldChange}
                  type="text"
                  placeholder="Inserir nome"
                  name="name"
                  required
                />
                <label forhtml="password"><b>Nova senha</b></label>
                <input
                  value={this.state.password}
                  onChange={this.onFormFieldChange}
                  type="password"
                  placeholder="Inserir nova senha"
                  name="password"
                />
                <label forhtml="password"><b>Confirme a nova Senha</b></label>
                <input
                  value={this.state.confirmPassword}
                  onChange={this.onFormFieldChange}
                  type="password"
                  placeholder="Confirmar nova senha"
                  name="confirmPassword"
                />
              </div>

              {this.state.error &&
                <div>
                  {this.state.error}
                </div>
              }

              <button type="submit">Atualizar</button>
            </form>
            <button onClick={this.toogleEditing}>Cancelar</button>
          </div>
        }
        {!this.state.isEditing &&
          <div className="profile">
            <div>Dados do usuario</div>
            <div>Nome: {this.state.name}</div>
            <div>Username: {this.state.username}</div>
            <div>Email: {this.state.email}</div>
            <button onClick={this.toogleEditing}>Editar</button>
          </div>
        }
      </div>
    )
  }
}

export default Profile
