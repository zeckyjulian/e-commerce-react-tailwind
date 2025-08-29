import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductOverview from './pages/ProductOverview'
import { Store } from './pages/Store'
import Category from './pages/Category'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import LoginAdmin from './pages/admin/LoginAdmin'
import Dashboard from './pages/admin/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home/> }/>
          <Route path='/stores' element={ <Store/> }/>
          <Route path='/cart' element={ <Cart/> }/>
          <Route path='/product/:id' element={ <ProductOverview/> }/>
          <Route path='/category' element={ <Category/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/admin/login' element={ <LoginAdmin/> }/>
          <Route path='/admin/Dashboard' element={ <Dashboard/> }/>
          <Route path='*' element={ <NotFound/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
