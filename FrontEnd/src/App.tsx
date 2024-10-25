
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import DashBord from './components/DashBord'

function App() {


  return (
    <div className="app-container md-6">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="Dashbord" element={<DashBord />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
