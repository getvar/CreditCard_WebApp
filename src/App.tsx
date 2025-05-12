import './App.css'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UserForm from './components/User/UserForm'
import ProductForm from './components/Product/Product'
import TopBar from './components/TopBar'
import ShopCart from './components/ShopCart'
import CreditCard from './components/CreditCardForms/CreditCard'
import CreditCardForm from './components/CreditCardForms/CreditCardForm'
import TransactionForm from './components/TransactionForm'
import PurchaseForm from './components/PurchaseForm'
import { LoadingProvider } from './components/Loading/Loading'
import GlobalLoader from './components/Loading/GlobalLoading'

function App() {
  return (
    <>
      <LoadingProvider>
        <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={< Navigate to="/Product" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/UserForm" element={<UserForm />} />
            <Route path="/Product" element={<ProductForm />} />
            <Route path="/ShopCart" element={<ShopCart />} />
            <Route path="/CreditCard" element={<CreditCard />} />
            <Route path="/CreditCardForm" element={<CreditCardForm />} />
            <Route path="/TransactionForm" element={<TransactionForm />} />
            <Route path="/PurchaseForm" element={<PurchaseForm />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </BrowserRouter>
        <GlobalLoader />
      </LoadingProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
