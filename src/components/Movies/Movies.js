import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";


export function Movies(props) {

  const [films, setFilms] = useState([])
  const [counter, setCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [button, setButton] = useState(false)
  const [value, setValue] = useState('')
  let [width, setWidth] = useState(window.innerWidth);

  
  function handleButtonClick() {
    if (width > 768) {
      setCounter(counter + 3)
    }
    else if(width < 768 && width > 500) {
      setCounter(counter + 2)
    }
    else if(width <= 500) {
      setCounter(counter + 1)
    }
  }

  function handleChangeValue(event) {
    setValue(event.target.value)    
  }

  function handleSearch(event) {
    event.preventDefault()
   
    moviesApi.getFilms()
      .then(films => {
        setLoader(true)
        setLoading(true)
        setNotFound(false)
        setError(false)
        setCounter(0)
        setTimeout(() => {
          const filteredFilms = films.filter(film => film.nameRU.includes(value))
          if (!filteredFilms.length) {
            setLoading(false)
            setNotFound(true)
          } else {
            setFilms(filteredFilms)
            localStorage.setItem('films', JSON.stringify(filteredFilms))
            setValue('')
            setLoading(false)
            setLoader(false)
          }
        }, 1000) 
      })
      .catch(err => {
        console.log(err)
        setLoader(true)
        setError(true)
      })
  }

  useEffect(() => {
    if (films.length > counter ) {
      setButton(true)
    } else {
      setButton(false)
    }
  }, [width, films.length, counter])

  useEffect(() => {
    if (width > 768) {
      if (counter < 12) {
        setCounter(12)
      } else return
    }
    else if(width < 768 && width > 500) {
      if (counter < 6) {
        setCounter(6)
      } else return
    }
    else if(width <= 500) {
      if (counter < 5) {
        setCounter(5)
      } else return
    }
  }, [width, counter])

  useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        setWidth(window.innerWidth)
      }, 1000)
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('films')) {
      setFilms(JSON.parse(localStorage.getItem('films')))
    }
  }, [])

  return (
    <div className="movies">
      <SearchForm value={value} handleChangeValue={handleChangeValue} onSubmitSearchForm={handleSearch}/>
      {loader ? <Preloader notFound={notFound} loading={loading} error={error} /> : <MoviesCardList films={films} counter={counter} button={button} onButtonClick={handleButtonClick} onLikeMovie={props.onLikeMovie}/>}
    </div> 
  )
}