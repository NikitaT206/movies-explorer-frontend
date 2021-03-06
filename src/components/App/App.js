import './App.css'
import { Main } from '../Main/Main';
import { BurgerMenu } from '../Header/BurgerMenu/BurgerMenu';
import { useState } from 'react'
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { NotFound } from '../NotFound/NotFound';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile'
import { Header } from '../Header/Header';
import { PromoHeader } from '../Header/PromoHeader';
import { Footer } from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { InfoToolTip } from '../InfoToolTip/InfoToolTip';
import { useEffect } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { FilmsContext } from '../../context/FilmsContext';
import { SavedFilmsContext } from '../../context/SavedFilmsContext';

function App() {

  const navigate = useNavigate()
  const location = useLocation()

  const [width, setWidth] = useState(window.innerWidth);
  const [counter, setCounter] = useState(0)
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [moreButton, setMoreButton] = useState(false)

  const [infoOpen, setInfoOpen] = useState(false)
  const [infoError, setInfoError] = useState(false)
  const [infoText, setInfoText] = useState('')

  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')))
  const [userInfo, setUserInfo] = useState({})
  const [films, setFilms] = useState([])
  const [savedFilms, setSavedFilms] = useState([])

  const [loader, setLoader] = useState(false)
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchValidationError, setSearchValidationError] = useState(false)
  const [shortFilm, setShortFilm] = useState(false)

  const [savedFilmsLoader, setSavedFilmsLoader] = useState(false)
  const [savedFilmsSearchNotFound, setSavedFilmsSearchNotFound] = useState(false)
  const [savedFilmsSearchLoading, setSavedFilmsSearchLoading] = useState(false)
  const [savedFilmsSearchValue, setSavedFilmsSearchValue] = useState('')
  const [savedFilmsSearchValidationError, setSavedFilmsSearchValidationError] = useState(false)
  const [savedFilmsShortFilm, setSavedFilmsShortFilm] = useState(false)


  function handleBurgerOpen() {
    setBurgerOpen(!burgerOpen)
  }

  function closeInfo() {
    setInfoOpen(false)
  }

  function handleToogleCheckbox() {
    if (location.pathname === '/movies') {
      setShortFilm(!shortFilm)
      handleShortFilmsSearch()
    } else if (location.pathname === '/saved-movies') {
      setSavedFilmsShortFilm(!savedFilmsShortFilm)
    }
  }

  function handleRegistration(data) {    
    mainApi.createUser(data)
      .then(() => {
        setInfoOpen(true)
        setInfoError(false)
        setInfoText('???? ????????????????????????????????!')
        handleLogin(data)
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('?????????????? ??????-???? ?????????? ???? ??????. ???????????????????? ?????? ??????')        
      })
  }

  function handleLogin(data) {
    mainApi.login(data)
      .then(data => {
        localStorage.setItem('jwt', data.data)
        localStorage.setItem('loggedIn', JSON.stringify(true))
        setLoggedIn(JSON.parse(localStorage.getItem('loggedIn')))
        setTimeout(() => {
          navigate('/movies')
        }, 0)
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('???? ?????????? ???????????????? ????????????. ???????????????????? ?????? ??????')
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('films')
    localStorage.removeItem('savedFilms')
    localStorage.removeItem('searchValue')
    localStorage.removeItem('shortFilm')
    localStorage.removeItem('loggedIn')
    setFilms([])
    setSearchValue('')
    setShortFilm(false)
    setSavedFilms([])
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
        setInfoText('???????????? ?????????????? ??????????????????')
      })
      .catch(err => {
        console.log(err)
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('?????????????? ???????? email ?????? ??????????. ???????????????????? ???????????? ????????????.')
      })
  }

  function handleChangeSearchValue(event) {
    if (location.pathname === '/movies') {      
      setSearchValue(event.target.value)
    } else if (location.pathname === '/saved-movies') {
      setSavedFilmsSearchValue(event.target.value)
    }
  }

  function handleSearch(films, shortFilms, value) {
    return films.filter(film => {
      const searchQuery = () => film.nameRU.toLowerCase().includes(value.toLowerCase().trim())

      return shortFilms
      ? film.duration <= 40 && searchQuery()
      : searchQuery()
    })
  }

  function handleSearchFilms(event) {
    event.preventDefault()
    if (!searchValue) return setSearchValidationError(true)
    setSearchValidationError(false)
    moviesApi.getFilms()
      .then(films => {
        setLoader(true)
        setSearchLoading(true)
        setSearchNotFound(false)
        setSearchError(false)
        setCounter(0)
        setTimeout(() => {
          const filteredFilms = handleSearch(films, shortFilm, searchValue)
          
          if (!filteredFilms.length) {
            setSearchLoading(false)
            setSearchNotFound(true)
            setFilms(filteredFilms)
          } else {
            setFilms(filteredFilms)
            localStorage.setItem('searchValue', searchValue)
            localStorage.setItem('films', JSON.stringify(filteredFilms))
            localStorage.setItem('shortFilm', JSON.stringify(shortFilm))
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
    if (!savedFilmsSearchValue) return setSavedFilmsSearchValidationError(true)
    setSavedFilmsSearchValidationError(false)
    setSavedFilmsLoader(true)
    setSavedFilmsSearchLoading(true)
    setSavedFilmsSearchNotFound(false)

    const storageSavedFilms = JSON.parse(localStorage.getItem('savedFilms'))
    const filteredFilms = handleSearch(storageSavedFilms, savedFilmsShortFilm, savedFilmsSearchValue)
    
    setTimeout(() => {
      if (!filteredFilms.length) {
        setSavedFilmsSearchLoading(false)
        setSavedFilmsSearchNotFound(true)
      } else {
        setSavedFilms(filteredFilms)
        setSavedFilmsLoader(false)
        setSavedFilmsSearchLoading(false)
        setSavedFilmsSearchNotFound(false)
        setSearchValue('')
      }
    }, 200)
  }

  function handleShortFilmsSearch() {
    setLoader(false)
    setSearchNotFound(false)
    if (localStorage.getItem('films')) {

      if (!shortFilm) {
        const filtered = films.filter(film => film.duration <= 40)

        if (filtered.length) {
          setFilms(filtered)
        } else {
          if (!films.length) {
            return
          } else {
            setLoader(true)
            setSearchNotFound(true)
          }
        }
      }

      if (shortFilm && films.length) {
        setFilms(JSON.parse(localStorage.getItem('films')))
      }

    } else return
  }

  function handleLikeMovie(film) {
    const isLiked = savedFilms.some(s => s.movieId === film.id)
    if (!isLiked) {
      mainApi.createMovie(film, localStorage.getItem('jwt'))
        .then(newFilm => {
          setSavedFilms([newFilm, ...savedFilms])
          localStorage.setItem('savedFilms', JSON.stringify([newFilm, ...savedFilms]))    
        })
        .catch(err => {
          console.log(err)
          setInfoOpen(true)
          setInfoError(true)
          setInfoText('?????????????? ???????? ?????????? ???????????? ?????????????????? :(')
        })
    } else {
      const id = savedFilms.filter(s => s.movieId === film.id)[0]._id
      mainApi.deleteMovie(id, localStorage.getItem('jwt'))
        .then(() => {
          const newFilms = savedFilms.filter(savedFilm => savedFilm.movieId !== film.id)
          setSavedFilms(newFilms)
          localStorage.setItem('savedFilms', JSON.stringify(newFilms))    
        })
        .catch(err => console.log(err))
    }
  }

  function handleDeleteMovie(film) {
    mainApi.deleteMovie(film._id, localStorage.getItem('jwt'))
      .then(deletedFilm => {
        const newFilms = savedFilms.filter(savedFilm => savedFilm._id !== deletedFilm._id)
        setSavedFilms(newFilms)
        localStorage.setItem('savedFilms', JSON.stringify(newFilms))
      })
      .catch(err => console.log(err))
  }

  // ?????????????????????? counter ?????????????? ?? ????????????????????, ?? ?????????????????????? ???? ???????????? ????????????

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

  useEffect(() => {    
    if (loggedIn) {
      mainApi.getUserInfo(localStorage.getItem('jwt'))
      .then(data => setUserInfo(data[0]))
      .catch(err => console.log(err)
      )
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getMovies(localStorage.getItem('jwt'))
        .then(data => {
          const ownFilms = data.filter(film => film.owner === userInfo._id)  
          localStorage.setItem('savedFilms', JSON.stringify(ownFilms))
          setSavedFilms(ownFilms)
        })
        .catch(err => console.log(err)
        )        
    }
      
  }, [userInfo, loggedIn])

  // ?????????????????? ?????????? ?????? ?????????????? ???? escape

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeInfo()
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // ?????????????? ?????????????? resize ?????? ?????????????????? ???????????? ???????? ????????????????

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

  // ???????????????????? ???????????? '??????' ???????? ???????????? ?????????????? ?? ???????????????? ???????????? counter
  
  useEffect(() => {
    if (films.length > counter) {
      setMoreButton(true)
    } else {
      setMoreButton(false)
    }
  }, [width, films.length, counter])

  // ???????????? ?????????????????????? ???????????????????? ???????????????????????? ???????????????? ?? ?????????????????????? ???? ???????????? ????????????

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

  // ?????????????????? ???? ???????????????? ???????????? ?? ?????????????????? ?????????????????????? ????????????

  useEffect(() => {
    if (localStorage.getItem('films')) {
      setFilms(JSON.parse(localStorage.getItem('films')))
      setSearchValue(localStorage.getItem('searchValue'))
      setShortFilm(JSON.parse(localStorage.getItem('shortFilm')))
    }
    if (localStorage.getItem('savedFilms')) {
      setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')))
    }
  }, [])

  return (
    <FilmsContext.Provider value={films}>
    <SavedFilmsContext.Provider value={savedFilms}>
    <div className={burgerOpen ? 'app no-scroll' : 'app'}>
      <InfoToolTip open={infoOpen} error={infoError} text={infoText} onClose={closeInfo}/>
      <BurgerMenu burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>
      
      <Routes>
        {!loggedIn ? <Route path='/' element={<PromoHeader/>}/> : ''}
        {['/', '/movies', '/saved-movies', '/profile'].map((path, index) => {
            return  <Route path={path} key={index} element={<Header burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>}/>
          })}
      </Routes>
      
      <Routes>
        <Route 
          path='/signup' 
          element={
            !loggedIn 
            ? <Registration onRegister={handleRegistration}/>
            : <Navigate to='/'/>
        }/>
        <Route 
          path='/signin' 
          element={
            !loggedIn
            ? <Login onLogin={handleLogin}/>
            : <Navigate to='/'/>
        }/>

        <Route path="/" element={<Main/>}/>
        <Route 
          path="/profile"
          element={
            loggedIn 
            ?  <Profile
                onLogout={handleLogout} 
                name={userInfo.name} 
                email={userInfo.email} 
                onEditUser={handleUpdateUser}
              /> 
            : <Navigate to='/'/>
        }/>
        <Route 
          exact path="/movies" 
          element={
            loggedIn 
            ? <Movies
                films={films}
                onFilmLike={handleLikeMovie}
                searchValue={searchValue}
                onChangeSearchValue={handleChangeSearchValue}
                onSearch={handleSearchFilms}
                loader={loader}
                onSerchNotFound={searchNotFound}
                onSearchLoading={searchLoading}
                onSearchError={searchError}
                counter={counter}
                showMoreButton={moreButton}
                onMoreButtonClick={handleMoreButtonClick}
                shortFilm={shortFilm}
                onToogleCheckbox={handleToogleCheckbox}
                onSearchValidationError={searchValidationError}
              />
            : <Navigate to='/'/>
        }/>
        <Route 
          path="/saved-movies" 
          element={
            loggedIn 
            ? <SavedMovies 
                films={savedFilms}
                onSavedFilmDelete={handleDeleteMovie}
                searchValue={savedFilmsSearchValue}
                onChangeSearchValue={handleChangeSearchValue}
                onSearch={handleSearchSavedFilms}
                loader={savedFilmsLoader}
                onSearchNotFound={savedFilmsSearchNotFound}
                onSearchLoading={savedFilmsSearchLoading}
                onToogleCheckbox={handleToogleCheckbox}
                shortFilm={savedFilmsShortFilm}
                onSearchValidationError={savedFilmsSearchValidationError}
              />
            : <Navigate to='/'/>
        }/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>  

      <Routes >
        {['/', '/movies', '/saved-movies'].map((item, index) => {
          return <Route suppressNoMatchWarning={true} path={item} key={index} element={<Footer/>}/>
        })}
      </Routes>
    </div>
    </SavedFilmsContext.Provider>
    </FilmsContext.Provider>
  );
}

export default App;
