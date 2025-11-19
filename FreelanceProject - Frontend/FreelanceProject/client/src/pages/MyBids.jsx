import React, { useEffect, useState } from 'react'

// My bids page reads from localStorage 'fh_my_bids'
export default function MyBids() {
  const [bids, setBids] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('fh_my_bids') || '[]')
    setBids(saved)
  }, [])

  function cancelBid(id) {
    if (!confirm('Cancel this bid?')) return
    const updated = bids.filter(b => b.id !== id)
    setBids(updated)
    localStorage.setItem('fh_my_bids', JSON.stringify(updated))
  }

  return (
    <div>
      <div className="space-y-6">
        {bids.length === 0 && <div className="text-slate-500">You have not submitted any bids yet.</div>}
        {bids.map(b => (
          <div key={b.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-start justify-between">
              <div className="max-w-[75%]">
                <h3 className="text-xl font-semibold">{b.projectTitle}</h3>
                <div className="text-sm text-slate-500 mt-1">Submitted on {new Date(b.createdAt).toLocaleDateString()}</div>

                <div className="mt-4 flex items-center gap-6">
                  <div className="text-slate-600 flex items-center gap-2">
                    <span className="text-blue-500">$</span>
                    <span className="font-semibold text-lg">{b.amount?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium">Your Proposal:</div>
                  <p className="mt-2 text-slate-600">{b.proposal}</p>
                </div>

                <div className="mt-4">
                  <button onClick={() => cancelBid(b.id)} className="px-4 py-2 border rounded-md text-red-600">Cancel Bid</button>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'pending' ? 'bg-slate-100 text-slate-600' : b.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {b.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
