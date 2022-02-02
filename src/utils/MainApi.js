import { mainUrl } from "./constants"
import { moviesUrl } from "./constants"

class MainApi {
  constructor() {
    this.url = mainUrl
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies(token) {
    return fetch(this.url + 'movies', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(this._returnRes)
  }

  createMovie(data, token) {
    return fetch(this.url + 'movies', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: moviesUrl + data.image.url,
        trailer: data.trailerLink,
        thumbnail: moviesUrl + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    }).then(this._returnRes)
  }

  deletemovie(data, token) {
    return fetch(this.url + 'movies/' + data._id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).then(this._returnRes)
  }

  createUser(data) {
    return fetch(this.url + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name
      })
    }).then(this._returnRes)
  }

  login(data) {
    return fetch(this.url + 'signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    }).then(this._returnRes)
  }

  getUserInfo(token) {
    return fetch(this.url + 'users/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(this._returnRes)
  }

  editUserInfo(data, token) {
    return fetch(this.url + 'users/me', {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    }).then(this._returnRes)
  }
}

export const mainApi = new MainApi()