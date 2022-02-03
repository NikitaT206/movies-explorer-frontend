import './App.css'
import { Main } from '../Main/Main';
import { BurgerMenu } from '../Header/BurgerMenu/BurgerMenu';
import { useState } from 'react'
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { NotFound } from '../NotFound/NotFound';
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile'
import { Header } from '../Header/Header';
import { PromoHeader } from '../Header/PromoHeader';
import { Footer } from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { InfoToolTip } from '../InfoToolTip/InfoToolTip';
import { useEffect } from 'react/cjs/react.development';
import { moviesApi } from '../../utils/MoviesApi';

function App() {

  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth);

  const [burgerOpen, setBurgerOpen] = useState(false)

  const [infoOpen, setInfoOpen] = useState(false)
  const [infoError, setInfoError] = useState(false)
  const [infoText, setInfoText] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [films, setFilms] = useState([])
  const [savedFilms, setSavedFilms] = useState([])

  const [counter, setCounter] = useState(0)
  const [shortFilm, setShortFilm] = useState(false)

  const [loader, setLoader] = useState(false)
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const [savedFilmsLoader, setSavedFilmsLoader] = useState(false)
  const [savedFilmsSearchNotFound, setSavedFilmsSearchNotFound] = useState(false)
  const [savedFilmsSearchLoading, setSavedFilmsSearchLoading] = useState(false)
  const [savedFilmsSearchValue, setSavedFilmsSearchValue] = useState('')

  const [moreButton, setMoreButton] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  function handleBurgerOpen() {
    setBurgerOpen(!burgerOpen)
  }

  function closeInfo() {
    setInfoOpen(false)
  }

  function handleToogleCheckbox() {
    setShortFilm(!shortFilm)    
  }

  function handleRegistration(data) {    
    mainApi.createUser(data)
      .then(() => {
        setInfoOpen(true)
        setInfoError(false)
        setInfoText('Вы зарегистрированы!')
        navigate('/signin')
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Кажется что-то пошло не так :( Попробуйте еще раз')        
      })
  }

  function handleLogin(data) {
    mainApi.login(data)
      .then(data => {
        localStorage.setItem('jwt', data.data)
        setLoggedIn(true)
        navigate('/movies')
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Вы ввели неверные данные :( Попробуйте еще раз')
      })
  }

  function handleChangeSearchValue(event) {
    setSearchValue(event.target.value)
  }

  function handleChangeSavedFilmsSearchValue(event) {
    setSavedFilmsSearchValue(event.target.value)
  }

  function handleSearch(event) {
    event.preventDefault()
   
    moviesApi.getFilms()
      .then(films => {
        setLoader(true)
        setSearchLoading(true)
        setSearchNotFound(false)
        setSearchError(false)
        setCounter(0)
        setTimeout(() => {
          const filteredFilms = films.filter(film => shortFilm ? (
            film.duration <= 40 && film.nameRU.toLowerCase().includes(searchValue.toLowerCase())
          )  : (
            film.nameRU.toLowerCase().includes(searchValue.toLowerCase())
          ))
          if (!filteredFilms.length) {
            setSearchLoading(false)
            setSearchNotFound(true)
          } else {
            setFilms(filteredFilms)
            localStorage.setItem('searchValue', searchValue)
            localStorage.setItem('films', JSON.stringify(filteredFilms))
            setSearchValue('')
            setSearchLoading(false)
            setLoader(false)
          }
        }, 1000) 
      })
      .catch(err => {
        console.log(err)
        setLoader(true)
        setSearchError(true)
      })
  }

  function handleSearchSavedFilms(event) {
    event.preventDefault()

    const storageSavedFilms = JSON.parse(localStorage.getItem('savedFilms'))
    setSavedFilmsLoader(true)
    setSavedFilmsSearchLoading(true)
    setSavedFilmsSearchNotFound(false)
    const filteredFilms = storageSavedFilms.filter(film => shortFilm ? (
      film.nameRU.toLowerCase().includes(savedFilmsSearchValue.toLowerCase()) && film.duration <= 40
    ) : (
      film.nameRU.toLowerCase().includes(savedFilmsSearchValue.toLowerCase())
    ) )
    setTimeout(() => {
      if (!filteredFilms.length) {
        setSavedFilmsSearchLoading(false)
        setSavedFilmsSearchNotFound(true)
      } else {
        setSavedFilmsLoader(false)
        setSavedFilmsSearchLoading(false)
        setSavedFilmsSearchNotFound(false)
        setSavedFilms(filteredFilms)
      }
    }, 200)
    
  }

  // увеличивает counter массива с карточками, в зависимости от ширины экрана

  function handleMoreButtonClick() {
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

  function handleLogout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('films')
    localStorage.removeItem('savedFilms')
    localStorage.removeItem('searchValue')
    setUserInfo({})
    setLoggedIn(false)    
    navigate('/')
  }

  function handleUpdateUser(data) {
    mainApi.editUserInfo(data, localStorage.getItem('jwt'))
      .then(data => {
        setInfoOpen(true)
        setInfoError(false)
        setUserInfo(data)
        setInfoText('Все хорошо')
      })
      .catch(err => {
        console.log(err)
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Кажется что-то пошло не так :( Попробуйте еще раз')
      })
  }

  function handleLikeMovie(data) {
    mainApi.createMovie(data, localStorage.getItem('jwt')).then(data =>{
      setSavedFilms([data, ...savedFilms])
      localStorage.setItem('savedFilms', JSON.stringify([data, ...savedFilms]))      
    })
  }

  function handleDislikeMovie(data) {
    mainApi.deletemovie(data, localStorage.getItem('jwt')).then(data => setSavedFilms(savedFilms.filter(film => film._id !== data._id)))
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true)
      if (loggedIn) {
        navigate('/movies')
      }
    }
  }, [loggedIn])

  useEffect(() => {
    mainApi.getUserInfo(localStorage.getItem('jwt')).then(data => setUserInfo(data[0]))
  }, [userInfo.name])

  useEffect(() => {
      mainApi.getMovies(localStorage.getItem('jwt')).then(data => {
        const ownFilms = data.filter(film => film.owner === userInfo._id)  
        localStorage.setItem('savedFilms', JSON.stringify(ownFilms))      
        setSavedFilms(ownFilms)
      })
  }, [userInfo, setSavedFilms])

  // закрывает попап при нажатии на escape

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeInfo()
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // слушает событие resize для получения ширины окна браузера

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

  // показывает кнопку 'еще' если длинна массива с фильмами больше counter
  
  useEffect(() => {
    if (films.length > counter) {
      setMoreButton(true)
    } else {
      setMoreButton(false)
    }
  }, [width, films.length, counter])

  // задает изначальное количество отображаемых карточек в зависимости от ширины экрана

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

  // добавляет на страницу фильмы с последним результатом поиска

  useEffect(() => {
    if (localStorage.getItem('films')) {
      setFilms(JSON.parse(localStorage.getItem('films')))
      setSearchValue(localStorage.getItem('searchValue'))
    }
  }, [])

  // useEffect(() => {
  //   films.some(film => savedFilms.map(savedFilm => {
  //     if (film.id === savedFilm.movieId) {
  //      console.log(savedFilm)
  //      setIsLiked(true)
  //     }
  //   }))
  // })


  return (
    <div className={burgerOpen ? 'app no-scroll' : 'app'}>
      <InfoToolTip open={infoOpen} error={infoError} text={infoText} onClose={closeInfo}/>
      <BurgerMenu burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>
      
      <Routes>
        {!loggedIn ? <Route path='/' element={<PromoHeader/>}/> : ''}
        {['/', '/movies', '/saved-movies', '/profile'].map((item, index) => {
            return  <Route path={item} key={index} element={<Header burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>}/>
          })}
      </Routes>
      
      <Routes>
        <Route path='/signup' element={<Registration onRegister={handleRegistration}/>}/>
        <Route path='/signin' element={<Login onLogin={handleLogin}/>}/>
        <Route exact path="/" element={<Main/>}/>
        <Route 
          path="/profile"
          element={loggedIn ? (
            <Profile
              onLogout={handleLogout} 
              name={userInfo.name} 
              email={userInfo.email} 
              onEditUser={handleUpdateUser}
            />
          ) : <Navigate to='/'/>
           }/>
        <Route 
          path="/movies" 
          element={loggedIn ? (
            <Movies 
            onLikeMovie={handleLikeMovie}
            searchValue={searchValue}
            onChangeSearchValue={handleChangeSearchValue}
            onSearch={handleSearch}
            loader={loader}
            onSerchNotFound={searchNotFound}
            onSearchLoading={searchLoading}
            onSearchError={searchError}
            films={films}
            counter={counter}
            showMoreButton={moreButton}
            onMoreButtonClick={handleMoreButtonClick}
            shortFilm={shortFilm}
            onToogleCheckbox={handleToogleCheckbox}
            isLiked={isLiked}
            />
          ) : <Navigate to='/'/>
           }/>
        <Route 
          path="/saved-movies" 
          element={loggedIn ? (
            <SavedMovies 
              onDislikeMovie={handleDislikeMovie}
              films={savedFilms}
              searchValue={savedFilmsSearchValue}
              loader={savedFilmsLoader}
              onSearchNotFound={savedFilmsSearchNotFound}
              onSearchLoading={savedFilmsSearchLoading}
              onChangeSearchValue={handleChangeSavedFilmsSearchValue}
              onSearch={handleSearchSavedFilms}
            />
          ) : <Navigate to='/'/>
           }/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>  

      <Routes>
        {['/', '/movies', '/saved-movies'].map((item, index) => {
          return <Route path={item} key={index} element={<Footer/>}/>
        })}
      </Routes>
    </div>
  );
}

export default App;
