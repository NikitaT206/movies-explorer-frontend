import { MoviesCard } from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
export function MoviesCardList(props) {

  return (
    <div className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {props.films.slice(0, props.counter).map(film => {
          return (
            <MoviesCard 
              film={film} 
              key={film.id || film._id} 
              savedFilms={props.savedFilms}
              onFilmLike={props.onFilmLike} 
              isLiked={props.isLiked}
              onLikeClick={props.onLikeClick}
              onSavedFilmDelete={props.onSavedFilmDelete}
            />
          )
        })}
      </ul>
      {props.showMoreButton ? <button className="movies-card-list__button" onClick={props.onMoreButtonClick}>Еще</button> : ''}
    </div>
  )
}