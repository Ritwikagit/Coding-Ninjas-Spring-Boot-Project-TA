import React from 'react'
import { FiLogOut } from 'react-icons/fi'

// Use your uploaded header logo path (the file you provided)
const headerLogo = '/mnt/data/a778c7e9-9c74-49eb-98a3-9a35348c265c.png'

export default function Header({ username = 'fnd', role = 'FREELANCER' }) {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={headerLogo} alt="FreelanceHub" className="w-9 h-9 object-contain" />
          <h2 className="text-lg font-semibold">FreelanceHub</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500 text-right">
            <div className="font-medium">{username}</div>
            <div className="uppercase text-xs">{role}</div>
          </div>
          <button className="px-3 py-2 rounded-md border hover:bg-slate-50 inline-flex items-center gap-2">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </header>
  )
}
