import './MoviesCard.css'
import { useState } from 'react'


export function MoviesCard(props) {
  const [like, setLike] = useState(false)

  function handleLike() {
    if (like) {
      setLike(false)
    } else {
      setLike(true)
    }
  }
  
  return (
    <div className='movie'>
      <div className='movie__image-container'>
        <img className='movie__image' alt={props.film.name} src={props.film.image}/>
      </div>
      <div className='movie__despription-container'>
        <div className='movie__description'>
          <p className='movie__name'>{props.film.name}</p>
          {props.savedFilms ? (
            <button className='movie__delete-button opacity'></button>
          ) : (
            <button className={like ? 'movie__like movie__like_active opacity' : 'movie__like opacity'} onClick={handleLike}></button>
          )}
        </div>
        <p className='movie__time'>{props.film.time}</p>
      </div>
    </div>
  )
}