
import 'flowbite'

import './App.css'


import Login from './components/Login'
import Register from './components/Register'

import { Toaster } from 'react-hot-toast'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import AuthProtected from './components/AuthProtected'

function App() {


  return (
    <>
  <BrowserRouter>
  <Toaster position='top-center' />
  <Header />
  <Routes>
  <Route path='/' element={<Home/>} />
    <Route path='/login' element={<AuthProtected><Login/></AuthProtected>}/>
    <Route path='/register' element={<AuthProtected><Register/></AuthProtected>} />
    <Route path='/forget/password' element={<ForgotPassword/>} />
    <Route path='/password/reset/:token' element={<ResetPassword/>}/>


  </Routes>
  <Footer />
  
  </BrowserRouter>
    </>
  )
}

export default App
