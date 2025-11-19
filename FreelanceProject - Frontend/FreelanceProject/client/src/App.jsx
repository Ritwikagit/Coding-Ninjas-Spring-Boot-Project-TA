// import React from 'react'
// import Home from './pages/home'
// import { Route, Routes } from 'react-router-dom'
// import SignIn from './pages/SignIn'
// import ClientDashboard from './pages/ClientDashboard'
// import ReceivedBids from './pages/ReceivedBids'

// const App = () => {
//   return (
//     <div>
//      <Routes>
//        <Route path="/" element={<Home />} />
//        <Route path="/signin" element={<SignIn />} />
//        <Route path="/ClientDashboard" element={<ClientDashboard />} />
//        <Route path="/received-bids" element={<ReceivedBids onBack={() => window.history.back()} />} />
//      </Routes>
     
      
//       </div>
//   )
// }

// export default App


import React from 'react'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import ClientDashboard from './pages/ClientDashboard'
import ReceivedBids from './pages/ReceivedBids'
import FreelancerDashboard from './pages/FreelancerDashboard'
import MatchesPage from './pages/MatchesPage'
const App = () => {
  return (
    <div>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signin" element={<SignIn />} />
       <Route path="/ClientDashboard" element={<ClientDashboard />} />
       <Route path="/received-bids" element={<ReceivedBids onBack={() => window.history.back()} />} />
        <Route path="/FreelancerDashboard" element={<FreelancerDashboard />} />
      <Route path="/received-bids" element={<ReceivedBids />} />
      <Route path="/matches/:projectId" element={<MatchesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>
     
      
      </div>
  )
}

export default App