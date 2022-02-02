import { moviesUrl } from "./constants"

class MoviesApi {
  constructor() {
    this.url = moviesUrl
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getFilms() {
    return fetch(this.url + 'beatfilm-movies').then(this._returnRes)
  }
}

export const moviesApi = new MoviesApi()