import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Create from './Components/Create'
import Edit from './Components/Edit'
import Nav from './Components/Nav'

const App = () => {
  return (
    <div className='flex flex-col md:flex-row w-full h-screen overflow-hidden'>
      <div className='w-full md:w-[250px] lg:w-[300px] h-full'>
        <Nav />
      </div>
      <main className='flex-1 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/category/:category' element={<Home/>} />
          <Route path='/details/:id' element={<Details/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/edit/:id' element={<Edit/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App