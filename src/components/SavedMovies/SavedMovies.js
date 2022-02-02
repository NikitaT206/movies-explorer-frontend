import { SearchForm } from '../Movies/SearchForm/SearchForm'
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList'
import { useEffect } from 'react/cjs/react.development'
import { mainApi } from '../../utils/MainApi'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'

export function SavedMovies(props) {
  const [savedFilms, setSavedFilms] = useState([])
  const [value, setValue] = useState('')
  const [notFound, setNotFound] = useState(false)

  function handleChangeValue(event) {
    setValue(event.target.value)    
  }

  function handleSearch(event) {
    event.preventDefault()
    const storageFilms = JSON.parse(localStorage.getItem('savedFilms'))
    const filteredFilms = storageFilms.filter(film => film.nameRU.toLowerCase().includes(value.toLocaleLowerCase()))
    console.log(storageFilms)
    if (!filteredFilms.length) {
      setNotFound(true)
      setSavedFilms(filteredFilms)
    } else {
      setNotFound(false)
      setSavedFilms(filteredFilms)
    }
  }

  useEffect(() => {
    mainApi.getMovies(localStorage.getItem('jwt')).then(data => {
      const ownFilms = data.filter(film => film.owner === props.user)   
      setSavedFilms(ownFilms)
      localStorage.setItem('savedFilms', JSON.stringify(ownFilms))
    })
  }, [props.user, props.onDislikeMovie])


  return (
    <div className='movies'>
      <SearchForm value={value} handleChangeValue={handleChangeValue} onSubmitSearchForm={handleSearch}/>
      {notFound ? <Preloader notFound={true} /> : <MoviesCardList savedFilms={true} films={savedFilms} onDislikeMovie={props.onDislikeMovie}/>}
    </div>
  )
}