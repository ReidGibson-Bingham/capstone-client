import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favourites from './pages/Favourites/Favourites'
import Login from './pages/Login/Login'
import User from './pages/User/User'
import './App.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
