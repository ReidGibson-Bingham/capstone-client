import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favourites from './pages/Favourites/Favourites'
import SearchHistory from './pages/SearchHistory/SearchHistory'
import Header from './components/Header/Header'
import './App.scss'

// to do: 
// create header
// create background images for each page
// create the history, saved items and add new pages

function App() {

  return (
    <>

        <Header/>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favourites" element={<Favourites/>} />
            <Route path="/history" element={<SearchHistory/>} />
          </Routes>
        </BrowserRouter>

        <Header/>

    </>
  )

}

export default App
