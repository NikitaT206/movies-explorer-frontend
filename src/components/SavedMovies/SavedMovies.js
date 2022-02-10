import { SearchForm } from '../Movies/SearchForm/SearchForm'
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

export function SavedMovies(props) {

  return (
    <div className='movies'>
      <SearchForm
        searchValue={props.searchValue} 
        onChangeSearchValue={props.onChangeSearchValue} 
        onSearch={props.onSearch}
        onToogleCheckbox={props.onToogleCheckbox}
        shortFilm={props.shortFilm}
        onSearchValidationError={props.onSearchValidationError}/>
      {props.loader ? (
        <Preloader 
          onSerchNotFound={props.onSearchNotFound}
          onSearchLoading={props.onSearchLoading}/>
      )  : (
        <MoviesCardList 
          savedFilms={true} 
          films={props.films} 
          onSavedFilmDelete={props.onSavedFilmDelete}/>
      ) }
    </div>
  )
}