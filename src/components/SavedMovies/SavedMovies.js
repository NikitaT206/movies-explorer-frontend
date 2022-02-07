import { Header } from '../Header/Header'
import { SearchForm } from '../Movies/SearchForm/SearchForm'
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList'
import { Footer } from '../Footer/Footer'
import { savedFilms } from '../../utils/constants'

export function SavedMovies() {
  return (
    <div className='movies'>
      <SearchForm/>
      <MoviesCardList films={savedFilms} savedFilms={true}/>
    </div>
  )
}