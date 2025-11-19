// import axios from 'axios'
// import React, { useState } from 'react'
// import { FiX } from 'react-icons/fi'

// export default function BidModal({ project, onClose, onSubmit }) {
//   const [amount, setAmount] = useState(project?.budget ? Math.max(100, project.budget) : '')
//   const [proposal, setProposal] = useState('')

//  async function submit(e) {
//     e.preventDefault()
//     if (!amount || !proposal.trim()) {
//       alert('Please enter amount and proposal')
//       return
//     }
//     onSubmit({ amount: Number(amount), proposal })
//   //    try {
//   //         const token = localStorage.getItem("token")
//   //         await axios.post(
//   //           "http://localhost:8083/api/freelancers/bids",
//   //           payload,
//   //           { headers: { Authorization: `Bearer ${token}` } }
//   //         )
//   //         setProjects(prev => [newP, ...prev])
//   //       } catch (err) {
//   //         console.error('Network error creating project:', err)
//   //         alert('Network error creating project. Check console for details.')
//   //         setProjects(prev => [newP, ...prev])
//   //       }
//   // }
//  }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-slate-500"><FiX /></button>
//         <h3 className="text-lg font-semibold">Submit Your Bid</h3>
//         <p className="text-slate-500 mt-1">Propose your rate and explain why you're the best fit</p>

//         <form onSubmit={submit} className="mt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Your Bid Amount (USD)</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="mt-2 w-full border rounded-md px-3 py-2"
//               min={0}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Cover Letter</label>
//             <textarea
//               value={proposal}
//               onChange={(e) => setProposal(e.target.value)}
//               className="mt-2 w-full border rounded-md px-3 py-2"
//               rows={5}
//               placeholder="Explain your experience and why you're perfect for this project..."
//             />
//           </div>

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit Bid</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
import axios from 'axios'
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function BidModal({ project, onClose, onSubmit }) {
  const [amount, setAmount] = useState(project?.budget ? Math.max(100, project.budget) : '')
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!amount || !proposal.trim()) {
      alert('Please enter amount and proposal')
      return
    }

    const payload = {
      projectId: project.id,
      bidAmount: Number(amount),
      message: proposal
    }

    setLoading(true)
    try {
      const token = localStorage.getItem("token") // your JWT token
      await axios.post(
        "http://localhost:8083/api/freelancers/bids",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert('Bid submitted successfully!')
      onSubmit({ amount: Number(amount), proposal }) // optional: update parent state
      onClose()
    } catch (err) {
      console.error('Error submitting bid:', err)
      alert('Failed to submit bid. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500"><FiX /></button>
        <h3 className="text-lg font-semibold">Submit Your Bid</h3>
        <p className="text-slate-500 mt-1">Propose your rate and explain why you're the best fit</p>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Bid Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 w-full border rounded-md px-3 py-2"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cover Letter</label>
            <textarea
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="mt-2 w-full border rounded-md px-3 py-2"
              rows={5}
              placeholder="Explain your experience and why you're perfect for this project..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Bid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
