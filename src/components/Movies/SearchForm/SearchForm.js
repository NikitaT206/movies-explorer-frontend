import './SearchForm.css'
import { FilterCheckbox } from './FilterCheckbox/FilterCheckbox'

export function SearchForm(props) {

  return (
    <div className='search'>
      <form className='search__container' onSubmit={props.onSearch} noValidate>
        <div className='search__input-container'>
          <div className='search__image-container'/>
          <input 
            className='search__input' 
            placeholder='Фильм' 
            type='text' 
            value={props.searchValue || ''} 
            onChange={props.onChangeSearchValue} 
            minLength={1}
            name='search'
            required
            />
          <button className='search__search-button opacity' type='submit'></button>
          <div className='search__border'></div>
        </div>
        <FilterCheckbox shortFilm={props.shortFilm} onToogleCheckbox={props.onToogleCheckbox}/>
        <span className={props.onSearchValidationError ? 'search__error_active search__error' : 'search__error'}>Нужно ввести ключевое слово</span>
      </form>
    </div>
  )
}