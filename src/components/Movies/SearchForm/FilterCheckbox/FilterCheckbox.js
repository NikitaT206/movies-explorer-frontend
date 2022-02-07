import { useState } from 'react'
import './FilterCheckbox.css'

export function FilterCheckbox() {
  const [shortFilm, setShortFilm] = useState(false)

  function toogleCheckBox() {
    if (shortFilm) {
      setShortFilm(false)
    } else {
      setShortFilm(true)
    }
  }

  return (
    <div className='checkbox__container'>
      <div className={shortFilm ? 'checkbox checkbox_active' : 'checkbox'} onClick={toogleCheckBox}>
        <div className={shortFilm ? 'checkbox__circle checkbox__circle_active' : 'checkbox__circle'}></div>
      </div>
      <p className='checkbox__description' onClick={toogleCheckBox}>Короткометражки</p>
    </div>
  )
}