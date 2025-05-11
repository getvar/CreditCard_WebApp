import './App.css'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UserForm from './components/User/UserForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Navigate to="/UserForm" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserForm" element={<UserForm />} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={2000}
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
