// import React, { useEffect, useState } from 'react'
// import { FiPlus } from 'react-icons/fi'

// function SkillModal({ open, onClose, onSave, initial }) {
//   const [name, setName] = useState(initial?.name || '')
//   const [category, setCategory] = useState(initial?.category || '')
//   const [level, setLevel] = useState(initial?.level || 'Intermediate')

//   useEffect(() => {
//     if (open) {
//       setName(initial?.name || '')
//       setCategory(initial?.category || '')
//       setLevel(initial?.level || 'Intermediate')
//     }
//   }, [open, initial])

//   if (!open) return null
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-slate-500">✕</button>
//         <h3 className="text-lg font-semibold">Add New Skill</h3>
//         <p className="text-slate-500 mt-1">Add a skill to your profile</p>

//         <form onSubmit={(e) => { e.preventDefault(); onSave({ name: name.trim(), category: category.trim(), level }) }} className="mt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Skill Name</label>
//             <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., React" className="mt-2 w-full border rounded-md px-3 py-2" />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Category</label>
//             <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Frontend / Backend / Design" className="mt-2 w-full border rounded-md px-3 py-2" />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Proficiency Level</label>
//             <select value={level} onChange={e => setLevel(e.target.value)} className="mt-2 w-full border rounded-md px-3 py-2">
//               <option>Beginner</option>
//               <option>Intermediate</option>
//               <option>Advanced</option>
//               <option>Expert</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Skill</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default function MySkills() {
//   const [skills, setSkills] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [editing, setEditing] = useState(null)

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('fh_skills') || '[]')
//     setSkills(saved)
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('fh_skills', JSON.stringify(skills))
//   }, [skills])

//   function addSkill(skill) {
//     if (!skill.name) { alert('Skill name required'); return }
//     if (editing) {
//       setSkills(prev => prev.map(s => s.id === editing.id ? { ...s, ...skill } : s))
//       setEditing(null)
//     } else {
//       setSkills(prev => [{ id: Date.now() + '_' + Math.random().toString(36).slice(2,6), ...skill }, ...prev])
//     }
//     setModalOpen(false)
//   }

//   function startEdit(s) {
//     setEditing(s)
//     setModalOpen(true)
//   }

//   function removeSkill(id) {
//     if (!confirm('Remove this skill?')) return
//     setSkills(prev => prev.filter(s => s.id !== id))
//   }

//   return (
//     <div>
//       <div className="border rounded-lg p-6 bg-white shadow-sm">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-xl font-semibold">Your Skills</h3>
//             <p className="text-slate-500 mt-1">Manage your skill set and proficiency levels</p>
//           </div>

//           <div>
//             <button onClick={() => { setEditing(null); setModalOpen(true) }} className="px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center gap-2">
//               <FiPlus /> Add Skill
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 space-y-4">
//           {skills.length === 0 && <div className="text-slate-500">You haven't added skills yet.</div>}
//           {skills.map(s => (
//             <div key={s.id} className="border rounded-md p-4 flex items-center justify-between">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <div className="text-lg font-medium">{s.name}</div>
//                   {s.category && <span className="px-2 py-1 rounded-full bg-slate-100 text-xs">{s.category}</span>}
//                 </div>
//                 <div className="text-sm text-slate-600 mt-1">Proficiency: {s.level.toUpperCase()}</div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button onClick={() => startEdit(s)} className="text-blue-600">Edit</button>
//                 <button onClick={() => removeSkill(s.id)} className="text-red-600">Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <SkillModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null) }} onSave={addSkill} initial={editing} />
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FiPlus } from 'react-icons/fi'

function SkillModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [category, setCategory] = useState(initial?.category || '')
  const [level, setLevel] = useState(initial?.level || 'Intermediate')

  useEffect(() => {
    if (open) {
      setName(initial?.name || '')
      setCategory(initial?.category || '')
      setLevel(initial?.level || 'Intermediate')
    }
  }, [open, initial])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500">✕</button>
        <h3 className="text-lg font-semibold">Add New Skill</h3>
        <p className="text-slate-500 mt-1">Add a skill to your profile</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave({ name: name.trim(), category: category.trim(), level })
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Skill Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., React"
              className="mt-2 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Frontend / Backend / Design"
              className="mt-2 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Proficiency Level</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="mt-2 w-full border rounded-md px-3 py-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function MySkills() {
  const [skills, setSkills] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('fh_skills') || '[]')
    setSkills(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('fh_skills', JSON.stringify(skills))
  }, [skills])

  function addSkill(skill) {
    if (!skill.name) { alert('Skill name required'); return }
    if (editing) {
      setSkills(prev => prev.map(s => s.id === editing.id ? { ...s, ...skill } : s))
      setEditing(null)
    } else {
      setSkills(prev => [
        {
          id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          ...skill
        },
        ...prev
      ])
    }
    setModalOpen(false)
  }

  function startEdit(s) {
    setEditing(s)
    setModalOpen(true)
  }

  function removeSkill(id) {
    if (!confirm('Remove this skill?')) return
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const convertLevel = (lvl) => {
    switch (lvl) {
      case "Beginner": return 1
      case "Intermediate": return 3
      case "Advanced": return 4
      case "Expert": return 5
      default: return 1
    }
  }

  // -----------------------------------------------------
  // ⭐ FIXED FUNCTION — No more 403
  // -----------------------------------------------------
  async function saveSkillsToBackend() {
    try {
      const payload = {
        skills: skills.map(s => ({
          name: s.name,
          proficiencyLevel: convertLevel(s.level)
        }))
      }

      console.log("Sending to backend:", payload)

      // 🔥 Detect correct token key automatically
      let token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("accessToken")

      console.log("Token from localStorage =", token)

      if (!token) {
        alert("❌ No token found! Login again.")
        return
      }

      const res = await axios.post(
        "http://localhost:8083/api/freelancers/skills",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Skills saved successfully!")
      console.log(res.data)
    } catch (err) {
      console.error("Axios Error:", err.response || err)
      alert("Failed to save skills. Check console.")
    }
  }

  return (
    <div>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Your Skills</h3>
            <p className="text-slate-500 mt-1">
              Manage your skill set and proficiency levels
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={saveSkillsToBackend}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Save to Backend
            </button>

            <button
              onClick={() => { setEditing(null); setModalOpen(true) }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md inline-flex items-center gap-2"
            >
              <FiPlus /> Add Skill
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {skills.length === 0 && (
            <div className="text-slate-500">
              You haven't added skills yet.
            </div>
          )}

          {skills.map(s => (
            <div
              key={s.id}
              className="border rounded-md p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-medium">{s.name}</div>
                  {s.category && (
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-xs">
                      {s.category}
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Proficiency: {s.level.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeSkill(s.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SkillModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={addSkill}
        initial={editing}
      />
    </div>
  )
}
