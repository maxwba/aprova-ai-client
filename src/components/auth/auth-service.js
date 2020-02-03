import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true //indicates whether or not cross-site Access-Control requests should be made using credentials, so there is the magic.
    });
  }

// Methods
  signup(email, password) {
    return this.service.post('/signup', {
        email,
        password
    })
    .then(response => response.data)
  }

  login(email, password) {
    return this.service.post('/login', {
        email,
        password
      })
      .then(response => response.data)
  }
  logout() {
    return this.service.get('/logout')
      .then(response => response.data)
  }
  loggedin() {
    return this.service.get('/loggedin')
      .then(response =>{
        return  response.data
        
      })
  }
}

export default AuthService;

