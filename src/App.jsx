import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { Forgot } from './pages/Forgot'
import { Register } from './pages/Register'
import { Confirm } from './pages/Confirm'
import Reset from './pages/Reset'
import { Map } from './pages/Map'
import Dashboard from './layout/Dashboard'
import Profile from './pages/Profile'
import Event from './pages/Event'
import Chat from './pages/Chat'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'
import DashboardHome from './pages/DashboardHome'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleCallback from './components/GoogleCallback'; 
import Classroom from './pages/Classroom'
import Teacher from './pages/Teacher'
import Tutoring from './pages/Tutoring'
import List from './pages/List'
import ListClassroom from './pages/ListClassroom'

function App() {
  const { profile } = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if(token){
      profile()
    }
  },[profile, token])

  return (  
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicRoute/>}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />}/>
          <Route path="/login/federated/google" element={<GoogleCallback />} /> 
          <Route path='register' element={<Register/>}/>
          <Route path='forgot/:id' element={<Forgot/>}/>
          <Route path='confirmar/:token' element={<Confirm/>}/>
          <Route path='recuperarpassword/:token' element={<Reset/>}/>
          <Route path='map' element={<Map/>}/>
        </Route>

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }>

          <Route index element={<DashboardHome/>}/>
          
          <Route path='profile' element={<Profile/>}/>
          
          <Route path='event' element={<Event/>}/>

          <Route path='classroom' element={<Classroom/>}/>

          <Route path='teacher' element={<Teacher/>}/>

          <Route path='tutoring' element={<Tutoring/>}/>

          <Route path='list' element={<List/>}/>

          <Route path='list/aulas' element={<ListClassroom/>}/>

          <Route path='list/eventos' element={<ListEvents/>}/>

          <Route path='list/docentes' element={<ListDocentes/>}/>

          <Route path='chat' element={<Chat/>}/>
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App