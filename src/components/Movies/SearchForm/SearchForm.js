import './SearchForm.css'
import { FilterCheckbox } from './FilterCheckbox/FilterCheckbox'

export function SearchForm() {
  return (
    <div className='search'>
      <form className='search__container'>
        <div className='search__input-container'>
          <div className='search__image-container'/>
          <input className='search__input' placeholder='Фильм' type='text' required></input>
          <button className='search__search-button opacity' type='submit'></button>
          <div className='search__border'></div>
        </div>
        <FilterCheckbox/>
      </form>
    </div>
  )
}