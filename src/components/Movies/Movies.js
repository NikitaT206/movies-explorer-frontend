import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

export function Movies(props) {

  return (
    <div className="movies">
      <SearchForm 
        searchValue={props.searchValue} 
        onChangeSearchValue={props.onChangeSearchValue} 
        onSearch={props.onSearch} 
        onToogleCheckbox={props.onToogleCheckbox} 
        shortFilm={props.shortFilm}
        onSearchValidationError={props.onSearchValidationError}/>
      {props.loader ? (
        <Preloader 
          onSerchNotFound={props.onSerchNotFound} 
          onSearchLoading={props.onSearchLoading} 
          onSearchError={props.onSearchError}/>
      )  : (
        <MoviesCardList 
          films={props.films} 
          counter={props.counter} 
          showMoreButton={props.showMoreButton} 
          onMoreButtonClick={props.onMoreButtonClick} 
          onFilmLike={props.onFilmLike}
          isLiked={props.isLiked}
          onLikeClick={props.onLikeClick}/>   
      ) }
    </div> 
  )
}