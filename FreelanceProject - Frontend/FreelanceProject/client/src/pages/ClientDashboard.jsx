// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// // Mock unique id generator
// const uid = () => Math.random().toString(36).slice(2, 9)

// const sampleProjects = [
//   {
//     id: uid(),
//     title: 'E-commerce Platform Development',
//     description:
//       'Build a modern e-commerce platform with React frontend and Spring Boot backend. Need someone experienced with microservices architecture.',
//     budget: 5000,
//     skills: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
//     status: 'open',
//     matches: 3,
//   },
//   {
//     id: uid(),
//     title: 'Mobile App UI/UX Redesign',
//     description:
//       'Redesign our existing mobile app with modern UI/UX principles. Looking for creative designers with proven track record.',
//     budget: 3000,
//     skills: ['Figma', 'UX Design', 'React Native'],
//     status: 'open',
//     matches: 5,
//   },
// ]

// export default function ClientDashboard() {
//   const [tab, setTab] = useState('my-projects') // or 'received-bids'
//   const [projects, setProjects] = useState([])
//   const [query, setQuery] = useState('')
//   const [showNew, setShowNew] = useState(false)
//   const [editing, setEditing] = useState(null)

//   // Form state for create/edit
//   const emptyForm = { title: '', description: '', budget: '', skills: '', status: 'open' }
//   const [form, setForm] = useState(emptyForm)

//   // Load projects from localStorage or use sample data
//   // useEffect(() => {
//   //   const saved = localStorage.getItem('fh_projects')
//   //   if (saved) setProjects(JSON.parse(saved))
//   //   else setProjects(sampleProjects)
//   // }, [])

//   // Persist whenever projects change
//   // useEffect(() => {
//   //   localStorage.setItem('fh_projects', JSON.stringify(projects))
//   // }, [projects])
// useEffect(() => {
//   async function fetchProjects() {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:8082/api/projects/my-projects", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // Map backend skills objects to array of skill names
//       const projectsWithSkillNames = res.data.map(p => ({
//         ...p,
//         skills: (p.skills || []).map(s => s.name) // map [{id,name,category}] -> ["Spring Boot","React"]
//       }));

//       setProjects(projectsWithSkillNames);
//     } catch (err) {
//       console.error("Failed to fetch projects:", err);
//       // fallback: show sample projects if needed
//       setProjects(sampleProjects);
//     }
//   }

//   fetchProjects();
// }, []);

//   // Create or update project
//   async function saveProject(e) {
//     e.preventDefault()
//     const skillsArray = form.skills
//       .split(',')
//       .map((s) => s.trim())
//       .filter(Boolean)

//     if (editing) {
//       // local update for editing
//       setProjects((prev) =>
//         prev.map((p) => (p.id === editing.id ? { ...p, ...form, skills: skillsArray } : p))
//       )
//       setForm(emptyForm)
//       setShowNew(false)
//       setEditing(null)
//       return
//     }

//     // Creating new project: prepare payload for backend
//     const newP = { ...form, id: uid(), skills: skillsArray, budget: Number(form.budget) || 0 }

//     // Backend API expects JSON like:
//     // {
//     //   "title": "...",
//     //   "description": "...",
//     //   "budget": 75000.0,
//     //   "requiredSkills": ["Java","Spring Boot","React","MySQL"]
//     // }
//     const payload = {
//       title: form.title,
//       description: form.description,
//       budget: Number(form.budget) || 0,
//       requiredSkills: skillsArray,
//     }
// console.log(payload);
// //     try {
// //       // const res = await fetch('http://localhost:8082/api/projects', {
// //       //   method: 'POST',
// //       //   headers: {
// //       //     'Content-Type': 'application/json',
// //       //   },
// //       //   body: JSON.stringify(payload),
// //       // })
// //       const res = await axios.post(
// //         "http://localhost:8082/api/projects",
// //         payload
// //       );

// //       if (!res.ok) {
// //         // backend error - still add locally or show error (kept simple)
// //         const text = await res.text()
// //         console.error('Project creation failed:', res.status, text)
// //         alert('Project creation failed on server. Check console for details.')
// //         // still add locally so UX isn't blocked
// //         setProjects((prev) => [newP, ...prev])
// //       } else {
// //         // Prefer using backend returned project if available
// //         const created = await res.json().catch(() => null)
// //         if (created && created.id) {
// //           setProjects((prev) => [created, ...prev])
// //         } else {
// //           setProjects((prev) => [newP, ...prev])
// //         }
// //       }
// //     } catch (err) {
// //       console.error('Network error creating project:', err)
// //       alert('Network error creating project. Check console for details.')
// //       // fallback: add locally
// //       setProjects((prev) => [newP, ...prev])
// //     }
// const token = localStorage.getItem("token");

// const res = await axios.post(
//   "http://localhost:8082/api/projects",
//   payload,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// );



//     setForm(emptyForm)
//     setShowNew(false)
//     setEditing(null)
//   }

//   function openNew() {
//     setEditing(null)
//     setForm(emptyForm)
//     setShowNew(true)
//   }

//   function startEdit(project) {
//     setEditing(project)
//     setForm({ ...project, skills: (project.skills || []).join(', ') })
//     setShowNew(true)
//   }

//   function deleteProject(id) {
//     if (!confirm('Delete this project?')) return
//     setProjects((prev) => prev.filter((p) => p.id !== id))
//   }

//   function toggleStatus(id) {
//     setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === 'open' ? 'closed' : 'open' } : p)))
//   }

//   // Filtered projects by search query
//   const filtered = projects.filter(
//     (p) =>
//       p.title.toLowerCase().includes(query.toLowerCase()) ||
//       p.description.toLowerCase().includes(query.toLowerCase()) ||
//       p.skills.join(' ').toLowerCase().includes(query.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-white text-slate-800">
//       {/* Header */}
//       <header className="border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {/* <img src={headerLogo} alt="logo" className="w-9 h-9 object-contain" /> */}
//             <h2 className="text-lg font-semibold">FreelanceHub</h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-sm text-slate-500 text-right">
//               <div className="font-medium">ejfie</div>
//               <div className="uppercase text-xs">Client</div>
//             </div>
//             <button className="px-3 py-2 rounded-md border hover:bg-slate-50">Logout</button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex items-start justify-between gap-6">
//           <div>
//             <h1 className="text-3xl font-bold">Client Dashboard</h1>
//             <p className="text-slate-500 mt-1">Manage your projects and review bids</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={openNew} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
//               + New Project
//             </button>
//           </div>
//         </div>

//         <div className="mt-6">
//           <div className="flex items-center gap-4">
//             <div className="bg-slate-100 rounded-md p-1 flex items-center">
//               <button
//                 onClick={() => setTab('my-projects')}
//                 className={`px-4 py-2 rounded-md ${tab === 'my-projects' ? 'bg-white shadow' : 'text-slate-600'}`}
//               >
//                 My Projects
//               </button>
//               <Link to="/received-bids" 
//                 onClick={() => setTab('received-bids')}
//                 className={`px-4 py-2 rounded-md ${tab === 'received-bids' ? 'bg-white shadow' : 'text-slate-600'}`}
//               >
//                 Received Bids
//               </Link>
//             </div>

//             <div className="flex-1">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search projects or skills..."
//                 className="w-full border rounded-md px-4 py-2"
//               />
//             </div>
//           </div>

//           {/* Project list */}
//           <div className="mt-6 space-y-6">
//             {filtered.length === 0 && (
//               <div className="text-center text-slate-500 py-8">No projects found.</div>
//             )}

//             {filtered.map((p) => (
//               <div key={p.id} className="border rounded-lg p-6 bg-white shadow-sm">
//                 <div className="flex items-start justify-between">
//                   <div className="max-w-[70%]">
//                     <h3 className="text-xl font-semibold">{p.title}</h3>
//                     <p className="mt-2 text-slate-500">{p.description}</p>

//                     <div className="mt-4 flex items-center gap-6">
//                       <div className="text-slate-600">$
//                         <span className="font-semibold ml-2">{p.budget?.toLocaleString?.() || p.budget}</span>
//                       </div>

//                       <div>
//                         <div className="text-sm text-slate-700 font-medium">Required Skills:</div>
//                         <div className="mt-2 flex flex-wrap gap-2">
//                           {(p.skills || []).map((s) => (
//                             <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{s}</span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-md">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
//                         </svg>
//                         View Matches ({p.matches || 0})
//                       </button>
//                     </div>
//                   </div>

//                   <div className="text-right flex flex-col items-end gap-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
//                       {p.status.toUpperCase()}
//                     </span>

//                     <div className="flex flex-col gap-2">
//                       <button onClick={() => startEdit(p)} className="px-3 py-2 border rounded-md">Edit</button>
//                       <button onClick={() => deleteProject(p.id)} className="px-3 py-2 border rounded-md text-red-600">Delete</button>
//                       <button onClick={() => toggleStatus(p.id)} className="px-3 py-2 border rounded-md">
//                         Toggle Status
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* New / Edit Modal (simple inline modal) */}
//       {showNew && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl p-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">{editing ? 'Edit Project' : 'Create Project'}</h3>
//               <button onClick={() => { setShowNew(false); setEditing(null) }} className="text-slate-500">Close</button>
//             </div>

//             <form onSubmit={saveProject} className="mt-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium">Title</label>
//                 <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" rows={4} />
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 <div>
//                   <label className="block text-sm font-medium">Budget (USD)</label>
//                   <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium">Skills (comma separated)</label>
//                   <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <label className="flex items-center gap-2">
//                   <input type="radio" name="status" checked={form.status === 'open'} onChange={() => setForm({ ...form, status: 'open' })} />
//                   <span>Open</span>
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="radio" name="status" checked={form.status === 'closed'} onChange={() => setForm({ ...form, status: 'closed' })} />
//                   <span>Closed</span>
//                 </label>
//               </div>

//               <div className="flex items-center justify-end gap-3">
//                 <button type="button" onClick={() => { setShowNew(false); setEditing(null) }} className="px-4 py-2 border rounded-md">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">{editing ? 'Save' : 'Create'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// // Mock unique id generator
// const uid = () => Math.random().toString(36).slice(2, 9)

// const sampleProjects = [
//   {
//     id: uid(),
//     title: 'E-commerce Platform Development',
//     description:
//       'Build a modern e-commerce platform with React frontend and Spring Boot backend. Need someone experienced with microservices architecture.',
//     budget: 5000,
//     skills: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
//     status: 'open',
//     matches: 3,
//   },
//   {
//     id: uid(),
//     title: 'Mobile App UI/UX Redesign',
//     description:
//       'Redesign our existing mobile app with modern UI/UX principles. Looking for creative designers with proven track record.',
//     budget: 3000,
//     skills: ['Figma', 'UX Design', 'React Native'],
//     status: 'open',
//     matches: 5,
//   },
// ]

// export default function ClientDashboard() {
//   const navigate = useNavigate()
//   const [tab, setTab] = useState('my-projects') // or 'received-bids'
//   const [projects, setProjects] = useState([])
//   const [query, setQuery] = useState('')
//   const [showNew, setShowNew] = useState(false)
//   const [editing, setEditing] = useState(null)

//   // Form state for create/edit
//   const emptyForm = { title: '', description: '', budget: '', skills: '', status: 'open' }
//   const [form, setForm] = useState(emptyForm)

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const token = localStorage.getItem("token")
//         const res = await axios.get("http://localhost:8082/api/projects/my-projects", {
//           headers: { Authorization: `Bearer ${token}` }
//         })

//         // Map backend skills objects to array of skill names
//         const projectsWithSkillNames = res.data.map(p => ({
//           ...p,
//           skills: (p.skills || []).map(s => s.name)
//         }))

//         setProjects(projectsWithSkillNames)
//       } catch (err) {
//         console.error("Failed to fetch projects:", err)
//         setProjects(sampleProjects)
//       }
//     }

//     fetchProjects()
//   }, [])

//   // Create or update project
//   async function saveProject(e) {
//     e.preventDefault()
//     const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean)

//     if (editing) {
//       setProjects(prev =>
//         prev.map(p => (p.id === editing.id ? { ...p, ...form, skills: skillsArray } : p))
//       )
//       setForm(emptyForm)
//       setShowNew(false)
//       setEditing(null)
//       return
//     }

//     const newP = { ...form, id: uid(), skills: skillsArray, budget: Number(form.budget) || 0 }

//     const payload = {
//       title: form.title,
//       description: form.description,
//       budget: Number(form.budget) || 0,
//       requiredSkills: skillsArray,
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const res = await axios.post(
//         "http://localhost:8082/api/projects",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       setProjects(prev => [newP, ...prev])
//     } catch (err) {
//       console.error('Network error creating project:', err)
//       alert('Network error creating project. Check console for details.')
//       setProjects(prev => [newP, ...prev])
//     }

//     setForm(emptyForm)
//     setShowNew(false)
//     setEditing(null)
//   }

//   function openNew() {
//     setEditing(null)
//     setForm(emptyForm)
//     setShowNew(true)
//   }

//   function startEdit(project) {
//     setEditing(project)
//     setForm({ ...project, skills: (project.skills || []).join(', ') })
//     setShowNew(true)
//   }

//   function deleteProject(id) {
//     if (!confirm('Delete this project?')) return
//     setProjects(prev => prev.filter(p => p.id !== id))
//   }

//   function toggleStatus(id) {
//     setProjects(prev =>
//       prev.map(p => (p.id === id ? { ...p, status: p.status === 'open' ? 'closed' : 'open' } : p))
//     )
//   }

//   // Filtered projects by search query
//   const filtered = projects.filter(
//     p =>
//       p.title.toLowerCase().includes(query.toLowerCase()) ||
//       p.description.toLowerCase().includes(query.toLowerCase()) ||
//       p.skills.join(' ').toLowerCase().includes(query.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-white text-slate-800">
//       {/* Header */}
//       <header className="border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <h2 className="text-lg font-semibold">FreelanceHub</h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-sm text-slate-500 text-right">
//               <div className="font-medium">ejfie</div>
//               <div className="uppercase text-xs">Client</div>
//             </div>
//             <button
//   onClick={() => {
//     localStorage.removeItem("token"); // optional: clear token
//     navigate("/signin");
//   }}
//   className="px-3 py-2 rounded-md border hover:bg-slate-50"
// >
//   Logout
// </button>

//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex items-start justify-between gap-6">
//           <div>
//             <h1 className="text-3xl font-bold">Client Dashboard</h1>
//             <p className="text-slate-500 mt-1">Manage your projects and review bids</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={openNew} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
//               + New Project
//             </button>
//           </div>
//         </div>

//         <div className="mt-6">
//           <div className="flex items-center gap-4">
//             <div className="bg-slate-100 rounded-md p-1 flex items-center">
//               <button
//                 onClick={() => setTab('my-projects')}
//                 className={`px-4 py-2 rounded-md ${tab === 'my-projects' ? 'bg-white shadow' : 'text-slate-600'}`}
//               >
//                 My Projects
//               </button>
//               <Link
//                 to="/received-bids"
//                 onClick={() => setTab('received-bids')}
//                 className={`px-4 py-2 rounded-md ${tab === 'received-bids' ? 'bg-white shadow' : 'text-slate-600'}`}
//               >
//                 Received Bids
//               </Link>
//             </div>

//             <div className="flex-1">
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search projects or skills..."
//                 className="w-full border rounded-md px-4 py-2"
//               />
//             </div>
//           </div>

//           {/* Project list */}
//           <div className="mt-6 space-y-6">
//             {filtered.length === 0 && (
//               <div className="text-center text-slate-500 py-8">No projects found.</div>
//             )}

//             {filtered.map((p) => (
//               <div key={p.id} className="border rounded-lg p-6 bg-white shadow-sm">
//                 <div className="flex items-start justify-between">
//                   <div className="max-w-[70%]">
//                     <h3 className="text-xl font-semibold">{p.title}</h3>
//                     <p className="mt-2 text-slate-500">{p.description}</p>

//                     <div className="mt-4 flex items-center gap-6">
//                       <div className="text-slate-600">
//                         $<span className="font-semibold ml-2">{p.budget?.toLocaleString?.() || p.budget}</span>
//                       </div>

//                       <div>
//                         <div className="text-sm text-slate-700 font-medium">Required Skills:</div>
//                         <div className="mt-2 flex flex-wrap gap-2">
//                           {(p.skills || []).map((s) => (
//                             <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{s}</span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <button
//                         onClick={() => navigate(`/matches/${p.id}`)}
//                         className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-50"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
//                         </svg>
//                         View Matches ({p.matches || 0})
//                       </button>
//                     </div>
//                   </div>

//                   <div className="text-right flex flex-col items-end gap-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
//                       {p.status.toUpperCase()}
//                     </span>

//                     <div className="flex flex-col gap-2">
//                       <button onClick={() => startEdit(p)} className="px-3 py-2 border rounded-md">Edit</button>
//                       <button onClick={() => deleteProject(p.id)} className="px-3 py-2 border rounded-md text-red-600">Delete</button>
//                       <button onClick={() => toggleStatus(p.id)} className="px-3 py-2 border rounded-md">Toggle Status</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* New / Edit Modal */}
//       {showNew && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl p-6">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">{editing ? 'Edit Project' : 'Create Project'}</h3>
//               <button onClick={() => { setShowNew(false); setEditing(null) }} className="text-slate-500">Close</button>
//             </div>

//             <form onSubmit={saveProject} className="mt-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium">Title</label>
//                 <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" rows={4} />
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 <div>
//                   <label className="block text-sm font-medium">Budget (USD)</label>
//                   <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium">Skills (comma separated)</label>
//                   <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <label className="flex items-center gap-2">
//                   <input type="radio" name="status" checked={form.status === 'open'} onChange={() => setForm({ ...form, status: 'open' })} />
//                   <span>Open</span>
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="radio" name="status" checked={form.status === 'closed'} onChange={() => setForm({ ...form, status: 'closed' })} />
//                   <span>Closed</span>
//                 </label>
//               </div>

//               <div className="flex items-center justify-end gap-3">
//                 <button type="button" onClick={() => { setShowNew(false); setEditing(null) }} className="px-4 py-2 border rounded-md">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">{editing ? 'Save' : 'Create'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Mock unique id generator
const uid = () => Math.random().toString(36).slice(2, 9)

const sampleProjects = [
  {
    id: uid(),
    title: 'E-commerce Platform Development',
    description:
      'Build a modern e-commerce platform with React frontend and Spring Boot backend. Need someone experienced with microservices architecture.',
    budget: 5000,
    skills: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
    status: 'open',
    matches: 3,
  },
  {
    id: uid(),
    title: 'Mobile App UI/UX Redesign',
    description:
      'Redesign our existing mobile app with modern UI/UX principles. Looking for creative designers with proven track record.',
    budget: 3000,
    skills: ['Figma', 'UX Design', 'React Native'],
    status: 'open',
    matches: 5,
  },
]

export default function ClientDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('my-projects')
  const [projects, setProjects] = useState([])
  const [query, setQuery] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [editing, setEditing] = useState(null)

  const emptyForm = { title: '', description: '', budget: '', skills: '', status: 'open' }
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:8082/api/projects/my-projects", {
          headers: { Authorization: `Bearer ${token}` }
        })

        // Map backend skills objects to array of skill names
        const projectsWithSkillNames = res.data.map(p => ({
          ...p,
          skills: (p.skills || []).map(s => (typeof s === 'string' ? s : s.name))
        }))

        setProjects(projectsWithSkillNames)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
        setProjects(sampleProjects)
      }
    }

    fetchProjects()
  }, [])

  async function saveProject(e) {
    e.preventDefault()
    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean)

    if (editing) {
      setProjects(prev =>
        prev.map(p => (p.id === editing.id ? { ...p, ...form, skills: skillsArray } : p))
      )
      setForm(emptyForm)
      setShowNew(false)
      setEditing(null)
      return
    }

    const newP = { ...form, id: uid(), skills: skillsArray, budget: Number(form.budget) || 0 }

    const payload = {
      title: form.title,
      description: form.description,
      budget: Number(form.budget) || 0,
      requiredSkills: skillsArray,
    }

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:8082/api/projects",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setProjects(prev => [newP, ...prev])
    } catch (err) {
      console.error('Network error creating project:', err)
      alert('Network error creating project. Check console for details.')
      setProjects(prev => [newP, ...prev])
    }

    setForm(emptyForm)
    setShowNew(false)
    setEditing(null)
  }

  function openNew() {
    setEditing(null)
    setForm(emptyForm)
    setShowNew(true)
  }

  function startEdit(project) {
    setEditing(project)
    setForm({ ...project, skills: (project.skills || []).join(', ') })
    setShowNew(true)
  }

  function deleteProject(id) {
    if (!confirm('Delete this project?')) return
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  function toggleStatus(id) {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, status: p.status === 'open' ? 'closed' : 'open' } : p))
    )
  }

  // ===== Updated Filtered projects by search query =====
  const filtered = projects.filter(p => {
    const q = query.toLowerCase()
    const title = (p.title || '').toLowerCase()
    const description = (p.description || '').toLowerCase()
    const skillsStr = (p.skills || []).map(s => (typeof s === 'string' ? s : s.name)).join(' ').toLowerCase()
    return title.includes(q) || description.includes(q) || skillsStr.includes(q)
  })
  // =====================================================

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">FreelanceHub</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 text-right">
              <div className="font-medium">ejfie</div>
              <div className="uppercase text-xs">Client</div>
            </div>
            <button
              onClick={() => { localStorage.removeItem("token"); navigate("/signin"); }}
              className="px-3 py-2 rounded-md border hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your projects and review bids</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={openNew} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
              + New Project
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 rounded-md p-1 flex items-center">
              <button
                onClick={() => setTab('my-projects')}
                className={`px-4 py-2 rounded-md ${tab === 'my-projects' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                My Projects
              </button>
              <Link
                to="/received-bids"
                onClick={() => setTab('received-bids')}
                className={`px-4 py-2 rounded-md ${tab === 'received-bids' ? 'bg-white shadow' : 'text-slate-600'}`}
              >
                Received Bids
              </Link>
            </div>

            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or skills..."
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Project list */}
          <div className="mt-6 space-y-6">
            {filtered.length === 0 && (
              <div className="text-center text-slate-500 py-8">No projects found.</div>
            )}

            {filtered.map((p) => (
              <div key={p.id} className="border rounded-lg p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="max-w-[70%]">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-slate-500">{p.description}</p>

                    <div className="mt-4 flex items-center gap-6">
                      <div className="text-slate-600">
                        $<span className="font-semibold ml-2">{p.budget?.toLocaleString?.() || p.budget}</span>
                      </div>

                      <div>
                        <div className="text-sm text-slate-700 font-medium">Required Skills:</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(p.skills || []).map((s) => (
                            <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/matches/${p.id}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-100"
                      >
                        View Matches
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                      {p.status.toUpperCase()}
                    </span>

                    <div className="flex flex-col gap-2">
                      <button onClick={() => startEdit(p)} className="px-3 py-2 border rounded-md">Edit</button>
                      <button onClick={() => deleteProject(p.id)} className="px-3 py-2 border rounded-md text-red-600">Delete</button>
                      <button onClick={() => toggleStatus(p.id)} className="px-3 py-2 border rounded-md">Toggle Status</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* New / Edit Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Project' : 'Create Project'}</h3>
              <button onClick={() => { setShowNew(false); setEditing(null) }} className="text-slate-500">Close</button>
            </div>

            <form onSubmit={saveProject} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" rows={4} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium">Budget (USD)</label>
                  <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">Skills (comma separated)</label>
                  <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="status" checked={form.status === 'open'} onChange={() => setForm({ ...form, status: 'open' })} />
                  <span>Open</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="status" checked={form.status === 'closed'} onChange={() => setForm({ ...form, status: 'closed' })} />
                  <span>Closed</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => { setShowNew(false); setEditing(null) }} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">{editing ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
