import './MoviesCard.css'
import { useEffect, useState } from 'react'
import { moviesUrl } from '../../../utils/constants'

export function MoviesCard(props) {
  const [like, setLike] = useState(false)

  const [filmDuration, setFilmDuration] = useState(props.film.duration)

  function handleLike() {
    if (like) {
      setLike(false)
    } else {
      setLike(true)
      console.log(props.film)
      props.onLikeMovie(props.film)
    }
  }

  function handleDislike() {
    props.onDislikeMovie(props.film)
  }

  function getFilmDuration() {
    let x = (filmDuration / 60).toString().slice(0, 4).split('.')
    let hours = x[0]
    let minutes = Math.round(Number(`0.${x[1]}`) * 60)
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
            <button className='movie__delete-button opacity' onClick={handleDislike}></button>
          ) : (
            <button className={like ? 'movie__like movie__like_active opacity' : 'movie__like opacity'} onClick={handleLike}></button>
          )}
        </div>
        <p className='movie__time'>{filmDuration}</p>
      </div>
    </div>
  )
}

//moviesUrl + props.film.image.url ||