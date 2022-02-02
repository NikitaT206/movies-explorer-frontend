import './SearchForm.css'
import { FilterCheckbox } from './FilterCheckbox/FilterCheckbox'
import { useState } from 'react/cjs/react.development'

export function SearchForm(props) {

  return (
    <div className='search'>
      <form className='search__container' onSubmit={props.onSubmitSearchForm}>
        <div className='search__input-container'>
          <div className='search__image-container'/>
          <input className='search__input' placeholder='Фильм' type='text' value={props.value} required onChange={props.handleChangeValue}></input>
          <button className='search__search-button opacity' type='submit'></button>
          <div className='search__border'></div>
        </div>
        <FilterCheckbox/>
      </form>
    </div>
  )
}