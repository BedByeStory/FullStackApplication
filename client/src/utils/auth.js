import { getToken } from './token'

export default function header () {
  return {
    Authorization: 'Bearer ' + getToken()
  }
}
