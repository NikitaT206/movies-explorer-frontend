import { MoviesCard } from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

export function MoviesCardList(props) {
  return (
    <div className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {props.films.map(film => {
          return <MoviesCard film={film} key={film.id} savedFilms={props.savedFilms}/>
        })}
      </ul>
      <button className='movies-card-list__button opacity'>Ещё</button>
    </div>
  )
}