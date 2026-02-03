import HomePage from './pages/homePage'
import Info from './pages/info';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/info/:id' element={<Info/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
