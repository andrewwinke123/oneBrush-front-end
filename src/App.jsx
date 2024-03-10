// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Logout from './pages/Logout/Logout'
import RequestList from './pages/RequestList/RequestList'
import RequestDetails from './pages/RequestDetails/RequestDetails'
import NewRequest from './pages/NewRequest/NewRequest'
import EditRequest from './pages/EditRequest/EditRequest'
import Home from './pages/Home/Home/'
import Gallery from './pages/Gallery/Gallery/'
import Contact from './pages/Contact/Contact/'
import Offers from './pages/Offers/Offers/'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as requestService from './services/requestService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [requests, setRequests] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchAllRequests = async () => {
      const data = await requestService.index()
      setRequests(data)
    }
    if (user) fetchAllRequests()
  }, [user])

  const handleAddRequest = async (requestFormData) => {
    const newRequest = await requestService.create(requestFormData)
    setRequests([newRequest, ...requests])
    navigate('/requests')
  }

  const handleUpdateRequest = async (requestFormData) => {
    const updatedRequest = await requestService.update(requestFormData)
    setRequests(requests.map(request => request._id === updatedRequest._id ? updatedRequest : request))
    navigate('/requests')
  }

  const handleDeleteRequest = async (requestId) => {
    const deletedRequest = await requestService.deleteRequest(requestId)
    setRequests(requests.filter(b => b._id !== deletedRequest._id))
    navigate('/requests')
  }


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route 
          path='/requests'
          element={
            <ProtectedRoute user={user}>
              <RequestList requests={requests}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/requests/:requestId'
          element={
            <ProtectedRoute user={user}>
              <RequestDetails handleDeleteRequest={handleDeleteRequest} user={user} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/requests/new'
          element={
              <NewRequest handleAddRequest={handleAddRequest} />
          }
        />
        <Route 
          path='/requests/:requestId/edit'
          element={
            <ProtectedRoute user={user}>
              <EditRequest handleUpdateRequest={handleUpdateRequest} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/gallery'
          element={<Gallery />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/offers'
          element={<Offers />}
        />
      </Routes>
    </>
  )
}

export default App
