import {fetchDataFromApi} from './utis/api'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGeners } from './store/Homeslice'
import {Details, Home, PageNotFound, SearchResult, Explore} from './pages'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=> state.home)
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])

  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration')
    .then(data =>{
      const url = {
        backdrop : data.images.secure_base_url + 'original',
        poster : data.images.secure_base_url + 'original',
        profile : data.images.secure_base_url + 'original',
      }
      dispatch(getApiConfigurations(url))
    })
  }
  const genresCall = async ()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGeners = {}
    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    data.map((genres)=>{
      genres.genres?.map((item)=>{
        allGeners[item.id] = item;
      })
    })
    dispatch(getGeners(allGeners))
  }

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/:mediaType/:id'  element={<Details/>} />
        <Route path='/search/:query'  element={<SearchResult/>} />
        <Route path='/explore/:mediaType'  element={<Explore/>} />
        <Route path='*'  element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
