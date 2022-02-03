import './FilterCheckbox.css'

export function FilterCheckbox(props) {
 
  return (
    <div className='checkbox__container'>
      <div className={props.shortFilm ? 'checkbox checkbox_active' : 'checkbox'} onClick={props.onToogleCheckbox}>
        <div className={props.shortFilm ? 'checkbox__circle checkbox__circle_active' : 'checkbox__circle'}></div>
      </div>
      <p className='checkbox__description' onClick={props.onToogleCheckbox}>Короткометражки</p>
    </div>
  )
}