import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import BidModal from './BidModal'
import axios from 'axios'

// sample data (you can fetch from API later)
const sample = [
  // {
  //   id: 'p1',
  //   title: 'E-commerce Platform Development',
  //   postedBy: 'TechCorp Inc.',
  //   description: 'Build a modern e-commerce platform with React frontend and Spring Boot backend. Need someone experienced with microservices architecture.',
  //   budget: 5000,
  //   skills: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
  //   status: 'open',
  // },
  // {
  //   id: 'p2',
  //   title: 'Mobile App UI/UX Redesign',
  //   postedBy: 'StartupXYZ',
  //   description: 'Redesign our existing mobile app with modern UI/UX principles. Looking for creative designers with proven track record.',
  //   budget: 3000,
  //   skills: ['Figma', 'UX Design', 'React Native'],
  //   status: 'open',
  // },
]

export default function AvailableProjects() {
  const [projects, setProjects] = useState([])
  const [openBidFor, setOpenBidFor] = useState(null)

 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming JWT token is stored
        const response = await axios.get("http://localhost:8082/api/projects/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
        localStorage.setItem("fh_available_projects", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching projects:", error);
        // fallback to sample if needed
        const saved = localStorage.getItem("fh_available_projects");
        if (saved) setProjects(JSON.parse(saved));
      }
    };

    fetchProjects();
  }, []);
  function openBid(project) {
    setOpenBidFor(project)
  }

  function onBidSubmit(projectId, bid) {
    // store in localStorage as "my bids"
    const saved = JSON.parse(localStorage.getItem('fh_my_bids') || '[]')
    saved.unshift({
      id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      projectId,
      projectTitle: projects.find(p => p.id === projectId)?.title || '',
      amount: bid.amount,
      proposal: bid.proposal,
      status: 'pending',
      createdAt: Date.now()
    })
    localStorage.setItem('fh_my_bids', JSON.stringify(saved))
    setOpenBidFor(null)
    //alert('Bid submitted')
  }

  return (
    <div>
      <div className="space-y-6">
        {projects.map(p => (
          <div key={p.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-start justify-between">
              <div className="max-w-[75%]">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="text-sm text-slate-500 mt-1">Posted by <span className="font-medium">{p.postedBy}</span></div>
                <p className="mt-4 text-slate-600">{p.description}</p>

                <div className="mt-4 flex items-center gap-6">
                  <div className="text-slate-600 flex items-center gap-2">
                    <span className="text-blue-500">$</span>
                    <span className="font-semibold text-lg">{p.budget?.toLocaleString()}</span>
                  </div>

                  <div>
                    <div className="text-sm text-slate-700 font-medium">Required Skills:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.skills.map(s => <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{s}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button onClick={() => openBid(p)} className="px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center gap-2">
                    <FiSend /> Submit Bid
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{p.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openBidFor && (
        <BidModal
          project={openBidFor}
          onClose={() => setOpenBidFor(null)}
          onSubmit={(bid) => onBidSubmit(openBidFor.id, bid)}
        />
      )}
    </div>
  )
}
