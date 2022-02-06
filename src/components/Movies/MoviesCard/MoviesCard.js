import './MoviesCard.css'
import React from 'react'
import { useEffect, useState } from 'react'
import { moviesUrl } from '../../../utils/constants'
import { SavedFilmsContext } from '../../../context/SavedFilmsContext'

export function MoviesCard(props) {
  const [filmDuration, setFilmDuration] = useState(props.film.duration)
  const savedFilms = React.useContext(SavedFilmsContext)
  const isLiked = savedFilms.some(s => s.movieId === props.film.id)

  function handleLike() {
    props.onFilmLike(props.film)
  }

  function handleDelete() {
    props.onSavedFilmDelete(props.film)
  }

  function getFilmDuration() {
    const arr = (filmDuration / 60).toString().slice(0, 4).split('.')
    const hours = arr[0]
    const minutes = Math.round(Number(`0.${arr[1]}`) * 60)
    if (filmDuration < 60) return `${filmDuration}м`
    if (!minutes) return `${hours}ч`
    return `${hours}ч ${minutes}м`    
  }

  useEffect(() => {
    setFilmDuration(getFilmDuration)     
  }, [])

  return (
    <div className='movie'>
      <div className='movie__image-container'>
        {props.savedFilms ? (
          <img className='movie__image' alt={props.film.nameRU} src={props.film.image}/>
        ) : (
          <img className='movie__image' alt={props.film.nameRU} src={moviesUrl + props.film.image.url}/>
        )}
      </div>
      <div className='movie__despription-container'>
        <div className='movie__description'>
          <p className='movie__name'>{props.film.nameRU}</p>
          {props.savedFilms ? (
            <button className='movie__delete-button opacity' onClick={handleDelete}></button>
          ) : (
            <button className={isLiked ? 'movie__like movie__like_active opacity' : 'movie__like opacity'} onClick={handleLike}></button>
          )}
        </div>
        <p className='movie__time'>{filmDuration}</p>
      </div>
    </div>
  )
}