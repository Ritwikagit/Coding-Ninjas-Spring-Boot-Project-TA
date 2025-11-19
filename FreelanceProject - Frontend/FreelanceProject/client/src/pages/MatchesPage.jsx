// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import axios from 'axios'

// export default function MatchesPage() {
//   const { projectId } = useParams()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchMatches() {
//       try {
//         const token = localStorage.getItem('token')
//         const res = await axios.get(`http://localhost:8082/api/projects/${projectId}/matches`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//         setProject(res.data)
//       } catch (err) {
//         console.error('Failed to fetch matches:', err)
//         setError('Failed to load project matches.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMatches()
//   }, [projectId])

//   if (loading) return <div className="p-6 text-center">Loading project matches...</div>
//   if (error) return <div className="p-6 text-center text-red-600">{error}</div>
//   if (!project) return <div className="p-6 text-center">Project not found.</div>

//   return (
//     <div className="min-h-screen bg-white text-slate-800">
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Matches for "{project.title}"</h1>
//           <Link to="/client-dashboard" className="px-4 py-2 border rounded-md hover:bg-slate-50">Back to Dashboard</Link>
//         </div>

//         <p className="text-slate-500 mb-4">{project.description}</p>
//         <div className="mb-4">
//           <span className="font-medium">Budget:</span> ${project.budget?.toLocaleString?.() || project.budget}
//         </div>

//         <div className="mb-6">
//           <span className="font-medium">Required Skills:</span>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {(project.skills || []).map(skill => (
//               <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{skill}</span>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold">Matched Freelancers / Bids</h2>
//           {project.matches && project.matches.length > 0 ? (
//             project.matches.map(f => (
//               <div key={f.freelancerId} className="border rounded-lg p-4 flex justify-between items-center">
//                 <div>
//                   <div className="font-medium">{f.name}</div>
//                   <div className="text-sm text-slate-600">Skills: {f.skills.join(', ')}</div>
//                 </div>
//                 <div className="font-semibold text-slate-800">${f.bid?.toLocaleString?.() || f.bid}</div>
//               </div>
//             ))
//           ) : (
//             <div className="text-slate-500">No matches found yet.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// // }
// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import axios from 'axios'

// export default function MatchesPage() {
//   const { projectId } = useParams()
//   const [project, setProject] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

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

//         // Find project matching projectId
//         const matchedProject = projectsWithSkillNames.find(p => String(p.id) === String(projectId))
//         setProject(matchedProject)
//       } catch (err) {
//         console.error("Failed to fetch projects:", err)
//         setError("Failed to load project details.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [projectId])

//   if (loading) return <div className="p-6 text-center">Loading project details...</div>
//   if (error) return <div className="p-6 text-center text-red-600">{error}</div>
//   if (!project) return <div className="p-6 text-center">Project not found.</div>

//   return (
//     <div className="min-h-screen bg-white text-slate-800">
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">{project.title}</h1>
//           <Link to="/client-dashboard" className="px-4 py-2 border rounded-md hover:bg-slate-50">Back to Dashboard</Link>
//         </div>

//         <p className="text-slate-500 mb-4">{project.description}</p>

//         <div className="mb-4">
//           <span className="font-medium">Budget:</span> ${project.budget?.toLocaleString?.() || project.budget}
//         </div>

//         <div className="mb-6">
//           <span className="font-medium">Required Skills:</span>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {(project.skills || []).map(skill => (
//               <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{skill}</span>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold">Project Details</h2>
//           <div className="border rounded-lg p-4 flex flex-col gap-2">
//             <div><span className="font-medium">Status:</span> {project.status?.toUpperCase()}</div>
//             <div><span className="font-medium">Matches:</span> {project.matches || 0}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// // }
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function MatchesPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjectAndMatches() {
      try {
        const token = localStorage.getItem("token")
        
        // Fetch all projects for the client
        const projectRes = await axios.get("http://localhost:8082/api/projects/my-projects", {
          headers: { Authorization: `Bearer ${token}` }
        })

        const matchedProject = projectRes.data.find(p => String(p.id) === String(projectId))
        if (!matchedProject) {
          setError("Project not found.")
          return
        }
        setProject(matchedProject)

        // Fetch matches for the project
        const matchesRes = await axios.get(`http://localhost:8082/api/projects/${projectId}/matches`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setMatches(matchesRes.data || [])

      } catch (err) {
        console.error("Failed to fetch project or matches:", err)
        setError("Failed to load project details or matches.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjectAndMatches()
  }, [projectId])

  if (loading) return <div className="p-6 text-center">Loading project details...</div>
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>
  if (!project) return <div className="p-6 text-center">Project not found.</div>

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <Link to="/client-dashboard" className="px-4 py-2 border rounded-md hover:bg-slate-50">Back to Dashboard</Link>
        </div>

        <p className="text-slate-500 mb-4">{project.description}</p>

        <div className="mb-4">
          <span className="font-medium">Budget:</span> ${project.budget?.toLocaleString?.() || project.budget}
        </div>

        <div className="mb-6">
          <span className="font-medium">Required Skills:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(project.skills || []).map(skill => (
              <span key={skill.id || skill} className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                {skill.name || skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Matched Freelancers</h2>
          {matches.length > 0 ? (
            matches.map(f => (
              <div key={f.freelancerId} className="border rounded-lg p-4 flex justify-between items-center mt-2">
                <div className="font-medium">{f.name}</div>
                <div className="text-sm text-slate-600">Match Score: {f.matchScore}</div>
              </div>
            ))
          ) : (
            <div className="text-slate-500 mt-2">No freelancers matched yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
