import React from 'react'
// import axios from 'axios'
import './LoginForm.css'

import axios, { setHeaders } from '../axios'

class Profile extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    axios.get('/users/me')
      .then(payload => {
        if (payload.data) {
          this.setState(payload.data)
        }
      })
  }

  render() {
    // console.log(this.state)

    return (
      <div>
        {JSON.stringify(this.state, null, 2)}
      </div>
    )
  }
}

export default Profile
