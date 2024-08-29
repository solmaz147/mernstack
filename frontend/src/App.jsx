
import 'flowbite'






import { Toaster } from 'react-hot-toast'


import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'


import useUserRoutes from './components/routes/userRoutes'
import useAdminRoutes from './components/routes/adminRoutes'
import Cart from './components/Cart'




function App() {

  const userRoutes = useUserRoutes()
  const adminRoutes = useAdminRoutes()


  return (
    
   
   
  <BrowserRouter>
  <Toaster position='top-center' />
  <Header />
  
  <Routes>
  
    {userRoutes}
   {adminRoutes}
   <Route path='/cart' element={<Cart/>} />


    
  


  </Routes>
  
  <Footer />
  
  </BrowserRouter>
  
    
  )
}

export default App
