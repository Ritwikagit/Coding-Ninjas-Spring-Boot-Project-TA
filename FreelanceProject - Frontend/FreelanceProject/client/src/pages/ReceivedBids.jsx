// src/pages/ReceivedBids.jsx
import React, { useEffect, useState } from 'react'

const headerLogo = '/mnt/data/5e24886b-b939-494c-a781-d3eda42060be.png' // uploaded image path

// helper uid
const uid = () => Math.random().toString(36).slice(2, 9)

// sample bids data (will be loaded into localStorage on first run)
const sampleBids = [
  {
    id: uid(),
    projectId: 'p1',
    projectTitle: 'E-commerce Platform Development',
    bidder: { name: 'Aditi Verma', profile: '' },
    amount: 4800,
    proposal:
      'I have 5+ years of experience building e-commerce platforms with React and Spring Boot. Can deliver in 8 weeks.',
    status: 'pending', // pending | accepted | rejected
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: uid(),
    projectId: 'p1',
    projectTitle: 'E-commerce Platform Development',
    bidder: { name: 'Rohit Singh', profile: '' },
    amount: 5200,
    proposal:
      'I can implement microservices-based architecture, CI/CD and test coverage. Delivery in 10 weeks.',
    status: 'pending',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: uid(),
    projectId: 'p2',
    projectTitle: 'Mobile App UI/UX Redesign',
    bidder: { name: 'Sneha Patel', profile: '' },
    amount: 2900,
    proposal: 'Experienced in Figma and React Native. I can redesign screens and hand off assets within 3 weeks.',
    status: 'pending',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
]

export default function ReceivedBids({ onBack }) {
  // onBack is optional prop to navigate back to dashboard (if you use router)
  const [bids, setBids] = useState([])
  const [filter, setFilter] = useState('all') // all | pending | accepted | rejected
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(null)

  // load from localStorage or seed with sample data
  useEffect(() => {
    const saved = localStorage.getItem('fh_bids')
    if (saved) {
      setBids(JSON.parse(saved))
    } else {
      localStorage.setItem('fh_bids', JSON.stringify(sampleBids))
      setBids(sampleBids)
    }
  }, [])

  // persist
  useEffect(() => {
    localStorage.setItem('fh_bids', JSON.stringify(bids))
  }, [bids])

  // simple toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  function showToast(msg) {
    setToast(msg)
  }

  function handleAccept(bidId) {
    if (!confirm('Accept this bid? This will mark the bid as accepted.')) return
    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: 'accepted' } : b)))
    showToast('Bid accepted')
  }

  function handleReject(bidId) {
    if (!confirm('Reject this bid? This will mark the bid as rejected.')) return
    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: 'rejected' } : b)))
    showToast('Bid rejected')
  }

  function handleUndo(bidId) {
    // allow undo to pending
    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: 'pending' } : b)))
    showToast('Action undone')
  }

  // grouped by project
  const filtered = bids
    .filter((b) => (filter === 'all' ? true : b.status === filter))
    .filter((b) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        b.projectTitle.toLowerCase().includes(q) ||
        b.bidder.name.toLowerCase().includes(q) ||
        b.proposal.toLowerCase().includes(q)
      )
    })

  // group into map: projectId -> bids
  const grouped = filtered.reduce((acc, b) => {
    if (!acc[b.projectId]) acc[b.projectId] = { title: b.projectTitle, bids: [] }
    acc[b.projectId].bids.push(b)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={headerLogo} alt="logo" className="w-9 h-9 object-contain" />
            <h2 className="text-lg font-semibold">FreelanceHub</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 text-right">
              <div className="font-medium">ejfie</div>
              <div className="uppercase text-xs">Client</div>
            </div>
            <button className="px-3 py-2 rounded-md border hover:bg-slate-50">Logout</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your projects and review bids</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onBack && onBack()}
              className="px-4 py-2 border rounded-md flex items-center gap-2"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 rounded-md p-1 flex items-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('accepted')}
                className={`px-4 py-2 rounded-md ${filter === 'accepted' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                Accepted
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-md ${filter === 'rejected' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, bidder or proposal..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Bids list */}
        <div className="mt-6 space-y-6">
          {Object.keys(grouped).length === 0 && (
            <div className="text-center text-slate-500 py-8">No bids found.</div>
          )}

          {Object.entries(grouped).map(([projectId, group]) => (
            <div key={projectId} className="space-y-4">
              {/* For each project, render each bid in its own card */}
              {group.bids.map((b) => (
                <div key={b.id} className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="max-w-[75%]">
                      <h3 className="text-xl font-semibold">{b.projectTitle}</h3>
                      <div className="text-sm text-slate-500 mt-1">
                        Bid by <span className="font-medium text-slate-700">{b.bidder.name}</span>
                      </div>

                      <div className="mt-4 flex items-center gap-6">
                        <div className="text-slate-600 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3.866 0-7 1.79-7 4v2a3 3 0 003 3h8a3 3 0 003-3v-2c0-2.21-3.134-4-7-4z" />
                          </svg>
                          <span className="font-semibold text-lg">${b.amount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-medium">Proposal:</div>
                        <p className="mt-2 text-slate-600">{b.proposal}</p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        {b.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAccept(b.id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                              Accept Bid
                            </button>
                            <button onClick={() => handleReject(b.id)} className="px-4 py-2 border rounded-md">
                              Reject
                            </button>
                          </>
                        )}

                        {b.status === 'accepted' && (
                          <>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md">Start Project</button>
                            <button onClick={() => handleUndo(b.id)} className="px-4 py-2 border rounded-md">
                              Undo
                            </button>
                          </>
                        )}

                        {b.status === 'rejected' && (
                          <>
                            <button onClick={() => handleUndo(b.id)} className="px-4 py-2 border rounded-md">
                              Undo
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.status === 'pending'
                            ? 'bg-slate-100 text-slate-600'
                            : b.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>

                      <div className="text-xs text-slate-400">{new Date(b.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 bg-slate-900 text-white px-4 py-2 rounded-md shadow">
          {toast}
        </div>
      )}
    </div>
  )
}
