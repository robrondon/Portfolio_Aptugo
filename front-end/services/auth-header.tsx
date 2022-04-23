import axios from 'axios'

const authHeaders = () => {
  const token = localStorage.getItem('user') && localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
    return true
  } else {
    axios.defaults.headers.common['Authorization'] = null
    return false
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
}

export default authHeaders
