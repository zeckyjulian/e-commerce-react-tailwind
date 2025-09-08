import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductOverview from './pages/ProductOverview'
import { Store } from './pages/Store'
import Category from './pages/Category'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import LoginAdmin from './pages/admin/LoginAdmin'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import ProductsAdmin from './pages/admin/ProductsAdmin'
import { OrderAdmin } from './pages/admin/OrderAdmin'
import { UsersAdmin } from './pages/admin/UsersAdmin'
import Checkout from './pages/Checkout'
import { MyProfile } from './pages/MyProfile'
import Register from './pages/Register'

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
          <Route path='/checkout' element={ <Checkout/> }/>
          <Route path='/profile' element={ <MyProfile/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/admin/login' element={ <LoginAdmin/> }/>
          <Route path='/admin/dashboard' element={ <DashboardAdmin /> }/>
          <Route path='/admin/products' element={ <ProductsAdmin /> }/>
          <Route path='/admin/order' element={ <OrderAdmin /> }/>
          <Route path='/admin/users' element={ <UsersAdmin /> }/>
          <Route path='*' element={ <NotFound/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
