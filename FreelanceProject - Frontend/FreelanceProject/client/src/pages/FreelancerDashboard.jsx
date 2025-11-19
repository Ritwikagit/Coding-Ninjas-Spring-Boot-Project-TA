// import React, { useState } from 'react'
// import Header from './Header'
// import AvailableProjects from './AvailableProjects'
// import MyBids from './MyBids'
// import MySkills from './MySkills'

// export default function FreelancerDashboard() {
//   const [tab, setTab] = useState('available') // available | bids | skills

//   return (
//     <div className="min-h-screen bg-white text-slate-800">
//       <Header username="fnd" role="FREELANCER" />

//       <main className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex items-start justify-between gap-6 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
//             <p className="text-slate-500 mt-1">Find projects and manage your bids</p>
//           </div>
//         </div>

//         <div>
//           <div className="bg-slate-100 inline-flex gap-2 p-1 rounded-md">
//             <button
//               className={`px-4 py-2 rounded-md ${tab === 'available' ? 'bg-white shadow' : 'text-slate-600'}`}
//               onClick={() => setTab('available')}
//             >
//               Available Projects
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${tab === 'bids' ? 'bg-white shadow' : 'text-slate-600'}`}
//               onClick={() => setTab('bids')}
//             >
//               My Bids
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${tab === 'skills' ? 'bg-white shadow' : 'text-slate-600'}`}
//               onClick={() => setTab('skills')}
//             >
//               My Skills
//             </button>
//           </div>
//         </div>

//         <div className="mt-6">
//           {tab === 'available' && <AvailableProjects />}
//           {tab === 'bids' && <MyBids />}
//           {tab === 'skills' && <MySkills />}
//         </div>
//       </main>
//     </div>
//   )
// }
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvailableProjects from './AvailableProjects'
import MyBids from './MyBids'
import MySkills from './MySkills'

// Updated Header with logout
function Header({ username, role }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token') // Clear token
    navigate('/signin') // Navigate to sign in page
  }

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">FreelanceHub</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500 text-right">
            <div className="font-medium">{username}</div>
            <div className="uppercase text-xs">{role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md border hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default function FreelancerDashboard() {
  const [tab, setTab] = useState('available') // available | bids | skills

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header username="fnd" role="FREELANCER" />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
            <p className="text-slate-500 mt-1">Find projects and manage your bids</p>
          </div>
        </div>

        <div>
          <div className="bg-slate-100 inline-flex gap-2 p-1 rounded-md">
            <button
              className={`px-4 py-2 rounded-md ${tab === 'available' ? 'bg-white shadow' : 'text-slate-600'}`}
              onClick={() => setTab('available')}
            >
              Available Projects
            </button>
            <button
              className={`px-4 py-2 rounded-md ${tab === 'bids' ? 'bg-white shadow' : 'text-slate-600'}`}
              onClick={() => setTab('bids')}
            >
              My Bids
            </button>
            <button
              className={`px-4 py-2 rounded-md ${tab === 'skills' ? 'bg-white shadow' : 'text-slate-600'}`}
              onClick={() => setTab('skills')}
            >
              My Skills
            </button>
          </div>
        </div>

        <div className="mt-6">
          {tab === 'available' && <AvailableProjects />}
          {tab === 'bids' && <MyBids />}
          {tab === 'skills' && <MySkills />}
        </div>
      </main>
    </div>
  )
}
