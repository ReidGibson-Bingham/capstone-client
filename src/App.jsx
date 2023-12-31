import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import './App.scss'
import Header from './components/Header/Header'

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
          </Routes>
        </BrowserRouter>

        <Header/>

    </>
  )

}

export default App
