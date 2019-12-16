import axios from 'axios'

const URL = 'https://mangaten-api.herokuapp.com/'

const instance = axios.create({
  baseURL: URL,
  headers: {
    Authorization: null
  },
})

export function setHeaders(header, value) {
  if (header && value) {
    instance.defaults.headers[header] = value
  }
}

export default instance