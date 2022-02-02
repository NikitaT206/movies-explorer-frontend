import { SearchForm } from '../Movies/SearchForm/SearchForm'
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

export function SavedMovies(props) {

  return (
    <div className='movies'>
      <SearchForm searchValue={props.searchValue} onChangeSearchValue={props.onChangeSearchValue} onSearch={props.onSearch}/>
      {props.loader ? <Preloader onSerchNotFound={props.onSerchNotFound} /> : <MoviesCardList savedFilms={true} films={props.films} onDislikeMovie={props.onDislikeMovie}/>}
    </div>
  )
}