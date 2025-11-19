// // import React from "react";
// // import { IoBag } from "react-icons/io5";

// // const SignIn = () => {
// //   return (
// //     // <div className="">
// //     //   <div className="flex flex-col justify-center items-center">
// //     //     <div>
// //     //       <IoBag className="text-white bg-blue-400 text-6xl p-2 rounded-full"/>
// //     //     </div>

// //     //     <h1 className="text-3xl font-semibold">
// //     //         FreelanceHub
// //     //     </h1>
// //     //     <p>Connect with opportunities and talent</p>

// //     //     <div className="flex">
// //     //         <form action="">
// //     //             <div className="flex justify-start">
// //     //                 <label htmlFor="
// //     //                 ">Email</label>
// //     //             </div>
// //     //         </form>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6">
// // <div className="w-full max-w-md">
// // <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
// // <div className="p-8 text-center">
// // <div className="mx-auto w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
// //      <IoBag className="text-white text-6xl p-3"/>
// // {/* small suitcase icon using svg */}
// // {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
// // <path d="M9 3a2 2 0 00-2 2v1H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H9zm0 2h6v1H9V5z" /> */}
// // {/* </svg> */}
// // </div>

// // <h1 className="mt-6 text-2xl font-semibold text-slate-800">FreelanceHub</h1>
// // <p className="mt-1 text-sm text-slate-500">Connect with opportunities and talent</p>

// // {/* tabs */}
// // <div className="mt-6 flex items-center justify-center">
// // <div className="flex gap-2 bg-slate-100 rounded-md p-1">
// // <button className="px-5 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Login</button>
// // <button className="px-5 py-2 rounded-md text-sm font-medium text-slate-600">Register</button>
// // </div>
// // </div>

// // <form className="mt-6 text-left space-y-4">
// // <div>
// // <label className="block text-sm font-medium text-slate-700">Email</label>
// // <input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// // </div>

// // <div>
// // <label className="block text-sm font-medium text-slate-700">Password</label>
// // <input type="password" placeholder="" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// // </div>

// // <div className="pt-2">
// // <label className="block text-sm font-medium text-slate-700 mb-2">I am a</label>
// // <div className="flex flex-col gap-2 text-sm text-slate-700">
// // <label className="flex items-center gap-2">
// // <input type="radio" name="role" defaultChecked className="accent-blue-500" />
// // <span>Client (Post Projects)</span>
// // </label>
// // <label className="flex items-center gap-2">
// // <input type="radio" name="role" className="accent-blue-500" />
// // <span>Freelancer (Find Work)</span>
// // </label>
// // </div>
// // </div>

// // <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-blue-600">Login</button>
// // </form>
// // </div>

// // {/* decorative image & footer spacing - shown only on md+ screens */}
// // <div className="hidden md:block">
// // {/* <img src={heroImage} alt="decor" className="w-full object-cover opacity-80" /> */}
// // </div>
// // </div>

// // {/* small footer under card for mobile spacing */}
// // <p className="mt-4 text-center text-xs text-slate-400">© FreelanceHub</p>
// // </div>
// // </div>
// //   );
// // };

// // export default SignIn;

// import React, { useState } from "react";
// import { IoBag } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SignIn() {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   //signIn
//   const [signInFormData, setSignInFormData] = useState({
//     email: "",
//     password: "",
//     // role: "Client",
//   });
//   const handleSignInInput = (e) => {
//     setSignInFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     console.log(signInFormData);
//   };

//   const handleSignInForm = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/auth/login",
//         signInFormData
//       );
//       localStorage.setItem("token", response.data.token);
//     localStorage.setItem("role", response.data.role);
//       if(response.data.role == "CLIENT"){
//         navigate("/ClientDashboard");
//       }else if(response.data.role == "FREELANCER")
//       {
//         navigate("/FreelancerDashboard");
//       }else{
//         navigator("/")
//       }
      


//       //  if(response.data.Status === "Success"){
//       //         setLoading(true)
//       //         setRole(response.data.role)
//       //         setAdminName(response.data.name)
//       //         //localStorage.setItem("Role",JSON.stringify(response.data.role))
//       //         if(response.data.role === "patient"){
//       //             navigate('/')
//       //             //localStorage.setItem("AdminName",JSON.stringify(response.data.name))
//       //             toast.success("User Login Successfully")
//       //         }else if(response.data.role === "admin"){
//       //             navigate('/admin')
//       //            // localStorage.setItem("AdminName",JSON.stringify(response.data.name))
//       //             toast.success("Admin Login Successfully")
//       //         }
//       //         else{
//       //              toast.error("No User Found.")
//       //             navigate('/')
//       //         }
//       //     }
//     } catch (error) {
//       console.log("Fill the correct detail");
//     }
//   };

//   //   signUp
//   const [signUpFormData, setSignUpFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "CLIENT",
//   });

//   const handleSignUpInput = (e) => {
//     setSignUpFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     console.log(signUpFormData);
//   };

//   const handleSignUpForm = async(e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post(
//         "http://localhost:8081/auth/register",
//         signUpFormData
//       );
//       navigate("/ClientDashboard");
        
//     } catch (error) {
        
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-slate-50 to-emerald-50 px-10 py-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
//           <div className="px-12 py-6 text-center">
//             <div className="mx-auto w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
//               <IoBag className="text-white text-6xl p-3" />
//             </div>

//             <h1 className="mt-6 text-2xl font-semibold text-slate-800">
//               FreelanceHub
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Connect with opportunities and talent
//             </p>

//             <div className="mt-6 flex items-center justify-center">
//               <div className="flex gap-2 bg-slate-100 rounded-md p-1">
//                 <button
//                   onClick={() => setIsLogin(true)}
//                   className={`px-5 py-2 rounded-md text-sm font-medium ${
//                     isLogin ? "bg-white shadow-sm" : "text-slate-600"
//                   }`}
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => setIsLogin(false)}
//                   className={`px-5 py-2 rounded-md text-sm font-medium ${
//                     !isLogin ? "bg-white shadow-sm" : "text-slate-600"
//                   }`}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>

//             {/* LOGIN FORM */}
//             {isLogin && (
//               <form
//                 className="mt-6 text-left space-y-4"
//                 onSubmit={handleSignInForm}
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={handleSignInInput}
//                     placeholder="you@example.com"
//                     className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handleSignInInput}
//                     className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 </div>

//                 {/* <div className="pt-2">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     I am a
//                   </label>
//                   <div className="flex flex-col gap-2 text-sm text-slate-700">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         onChange={handleSignInInput}
//                         defaultChecked
//                         className="accent-blue-500"
//                       />
//                       <span>Client (Post Projects)</span>
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         className="accent-blue-500"
//                       />
//                       <span>Freelancer (Find Work)</span>
//                     </label>
//                   </div>
//                 </div> */}
//                 <div className="pt-2">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     I am a
//                   </label>

//                   <div className="flex flex-col gap-2 text-sm text-slate-700">
//                     {/* Client */}
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         value="CLIENT"
//                         checked={signInFormData.role === "CLIENT"}
//                         onChange={handleSignInInput}
//                         className="accent-blue-500"
//                       />
//                       <span>Client (Post Projects)</span>
//                     </label>

//                     {/* Freelancer */}
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         value="FREELANCER"
//                         checked={signInFormData.role === "FREELANCER"}
//                         onChange={handleSignInInput}
//                         className="accent-blue-500"
//                       />
//                       <span>Freelancer (Find Work)</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     type="onsubmit"
//                     className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-blue-600 text-center"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* REGISTRATION FORM */}
//             {!isLogin && (
//               <form
//                 className="mt-6 text-left space-y-2"
//                 onSubmit={handleSignUpForm}
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     onChange={handleSignUpInput}
//                     placeholder="John Doe"
//                     className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={handleSignUpInput}
//                     placeholder="you@example.com"
//                     className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handleSignUpInput}
//                     className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 </div>

//                 {/* <div className="pt-2">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     I am a
//                   </label>
//                   <div className="flex flex-col gap-2 text-sm text-slate-700">
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role2"
//                         defaultChecked
//                         className="accent-blue-500"
//                       />
//                       <span>Client (Post Projects)</span>
//                     </label>
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role2"
//                         className="accent-blue-500"
//                       />
//                       <span>Freelancer (Find Work)</span>
//                     </label>
//                   </div>
//                 </div> */}
//                 <div className="pt-2">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     I am a
//                   </label>

//                   <div className="flex flex-col gap-2 text-sm text-slate-700">
//                     {/* Client */}
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         value="CLIENT"
//                         checked={signUpFormData.role === "CLIENT"}
//                         onChange={handleSignUpInput}
//                         className="accent-blue-500"
//                       />
//                       <span>Client (Post Projects)</span>
//                     </label>

//                     {/* Freelancer */}
//                     <label className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name="role"
//                         value="FREELANCER"
//                         checked={signUpFormData.role === "FREELANCER"}
//                         onChange={handleSignUpInput}
//                         className="accent-blue-500"
//                       />
//                       <span>Freelancer (Find Work)</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     type="onsubmit"
//                     className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-blue-600 text-center"
//                   >
//                     Create Account
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React from "react";
// import { IoBag } from "react-icons/io5";

// const SignIn = () => {
//   return (
//     // <div className="">
//     //   <div className="flex flex-col justify-center items-center">
//     //     <div>
//     //       <IoBag className="text-white bg-blue-400 text-6xl p-2 rounded-full"/>
//     //     </div>

//     //     <h1 className="text-3xl font-semibold">
//     //         FreelanceHub
//     //     </h1>
//     //     <p>Connect with opportunities and talent</p>

//     //     <div className="flex">
//     //         <form action="">
//     //             <div className="flex justify-start">
//     //                 <label htmlFor="
//     //                 ">Email</label>
//     //             </div>
//     //         </form>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6">
// <div className="w-full max-w-md">
// <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
// <div className="p-8 text-center">
// <div className="mx-auto w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
//      <IoBag className="text-white text-6xl p-3"/>
// {/* small suitcase icon using svg */}
// {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
// <path d="M9 3a2 2 0 00-2 2v1H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H9zm0 2h6v1H9V5z" /> */}
// {/* </svg> */}
// </div>

// <h1 className="mt-6 text-2xl font-semibold text-slate-800">FreelanceHub</h1>
// <p className="mt-1 text-sm text-slate-500">Connect with opportunities and talent</p>

// {/* tabs */}
// <div className="mt-6 flex items-center justify-center">
// <div className="flex gap-2 bg-slate-100 rounded-md p-1">
// <button className="px-5 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Login</button>
// <button className="px-5 py-2 rounded-md text-sm font-medium text-slate-600">Register</button>
// </div>
// </div>

// <form className="mt-6 text-left space-y-4">
// <div>
// <label className="block text-sm font-medium text-slate-700">Email</label>
// <input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// </div>

// <div>
// <label className="block text-sm font-medium text-slate-700">Password</label>
// <input type="password" placeholder="" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// </div>

// <div className="pt-2">
// <label className="block text-sm font-medium text-slate-700 mb-2">I am a</label>
// <div className="flex flex-col gap-2 text-sm text-slate-700">
// <label className="flex items-center gap-2">
// <input type="radio" name="role" defaultChecked className="accent-blue-500" />
// <span>Client (Post Projects)</span>
// </label>
// <label className="flex items-center gap-2">
// <input type="radio" name="role" className="accent-blue-500" />
// <span>Freelancer (Find Work)</span>
// </label>
// </div>
// </div>

// <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-blue-600">Login</button>
// </form>
// </div>

// {/* decorative image & footer spacing - shown only on md+ screens */}
// <div className="hidden md:block">
// {/* <img src={heroImage} alt="decor" className="w-full object-cover opacity-80" /> */}
// </div>
// </div>

// {/* small footer under card for mobile spacing */}
// <p className="mt-4 text-center text-xs text-slate-400">© FreelanceHub</p>
// </div>
// </div>
//   );
// };

// export default SignIn;
// import React from "react";
// import { IoBag } from "react-icons/io5";

// const SignIn = () => {
//   return (
//     // <div className="">
//     //   <div className="flex flex-col justify-center items-center">
//     //     <div>
//     //       <IoBag className="text-white bg-blue-400 text-6xl p-2 rounded-full"/>
//     //     </div>

//     //     <h1 className="text-3xl font-semibold">
//     //         FreelanceHub
//     //     </h1>
//     //     <p>Connect with opportunities and talent</p>

//     //     <div className="flex">
//     //         <form action="">
//     //             <div className="flex justify-start">
//     //                 <label htmlFor="
//     //                 ">Email</label>
//     //             </div>
//     //         </form>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6">
// <div className="w-full max-w-md">
// <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
// <div className="p-8 text-center">
// <div className="mx-auto w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
//      <IoBag className="text-white text-6xl p-3"/>
// {/* small suitcase icon using svg */}
// {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
// <path d="M9 3a2 2 0 00-2 2v1H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2V5a2 2 0 00-2-2H9zm0 2h6v1H9V5z" /> */}
// {/* </svg> */}
// </div>

// <h1 className="mt-6 text-2xl font-semibold text-slate-800">FreelanceHub</h1>
// <p className="mt-1 text-sm text-slate-500">Connect with opportunities and talent</p>

// {/* tabs */}
// <div className="mt-6 flex items-center justify-center">
// <div className="flex gap-2 bg-slate-100 rounded-md p-1">
// <button className="px-5 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Login</button>
// <button className="px-5 py-2 rounded-md text-sm font-medium text-slate-600">Register</button>
// </div>
// </div>

// <form className="mt-6 text-left space-y-4">
// <div>
// <label className="block text-sm font-medium text-slate-700">Email</label>
// <input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// </div>

// <div>
// <label className="block text-sm font-medium text-slate-700">Password</label>
// <input type="password" placeholder="" className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
// </div>

// <div className="pt-2">
// <label className="block text-sm font-medium text-slate-700 mb-2">I am a</label>
// <div className="flex flex-col gap-2 text-sm text-slate-700">
// <label className="flex items-center gap-2">
// <input type="radio" name="role" defaultChecked className="accent-blue-500" />
// <span>Client (Post Projects)</span>
// </label>
// <label className="flex items-center gap-2">
// <input type="radio" name="role" className="accent-blue-500" />
// <span>Freelancer (Find Work)</span>
// </label>
// </div>
// </div>

// <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-blue-600">Login</button>
// </form>
// </div>

// {/* decorative image & footer spacing - shown only on md+ screens */}
// <div className="hidden md:block">
// {/* <img src={heroImage} alt="decor" className="w-full object-cover opacity-80" /> */}
// </div>
// </div>

// {/* small footer under card for mobile spacing */}
// <p className="mt-4 text-center text-xs text-slate-400">© FreelanceHub</p>
// </div>
// </div>
//   );
// };

// export default SignIn;
import React, { useState } from "react";
import { IoBag } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // LOGIN STATE
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleSignInInput = (e) => {
    setSignInFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignInForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        signInFormData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "CLIENT") {
        navigate("/ClientDashboard");
      } else if (response.data.role === "FREELANCER") {
        navigate("/FreelancerDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Fill the correct details");
    }
  };

  // REGISTER STATE
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleSignUpInput = (e) => {
    setSignUpFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSignUpForm = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post("http://localhost:8081/auth/register", signUpFormData);
  //     alert("Registration successful!");
  //     setIsLogin(true);
  //   } catch (error) {
  //     console.log("Registration failed", error);
  //   }
  // };
const handleSignUpForm = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Register user
    const registerRes = await axios.post(
      "http://localhost:8081/auth/register",
      signUpFormData
    );

    alert("Registration successful!");

    // 2️⃣ Login immediately to get token
    const loginRes = await axios.post(
      "http://localhost:8081/auth/login",
      {
        email: signUpFormData.email,
        password: signUpFormData.password,
        role: signUpFormData.role,
      }
    );

    const token = loginRes.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("role", loginRes.data.role);

    // 3️⃣ If user is a FREELANCER, create profile automatically
    if (signUpFormData.role === "FREELANCER") {
      await axios.post(
        "http://localhost:8083/api/freelancers/profile",
        { experienceLevel: "SENIOR" }, // you can adjust or ask user for input
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Freelancer profile created automatically!");
    }

    // 4️⃣ Navigate to dashboard
    if (loginRes.data.role === "CLIENT") {
      navigate("/ClientDashboard");
    } else if (loginRes.data.role === "FREELANCER") {
      navigate("/FreelancerDashboard");
    }

    setIsLogin(true);
  } catch (error) {
    console.log("Registration failed", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-slate-50 to-emerald-50 px-10 py-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-12 py-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
              <IoBag className="text-white text-6xl p-3" />
            </div>

            <h1 className="mt-6 text-2xl font-semibold text-slate-800">
              FreelanceHub
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Connect with opportunities and talent
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex gap-2 bg-slate-100 rounded-md p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-5 py-2 rounded-md text-sm font-medium ${
                    isLogin ? "bg-white shadow-sm" : "text-slate-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-5 py-2 rounded-md text-sm font-medium ${
                    !isLogin ? "bg-white shadow-sm" : "text-slate-600"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* LOGIN FORM */}
            {isLogin && (
              <form
                className="mt-6 text-left space-y-4"
                onSubmit={handleSignInForm}
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleSignInInput}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleSignInInput}
                    className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    I am a
                  </label>

                  <div className="flex flex-col gap-2 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="CLIENT"
                        checked={signInFormData.role === "CLIENT"}
                        onChange={handleSignInInput}
                        className="accent-blue-500"
                      />
                      <span>Client (Post Projects)</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="FREELANCER"
                        checked={signInFormData.role === "FREELANCER"}
                        onChange={handleSignInInput}
                        className="accent-blue-500"
                      />
                      <span>Freelancer (Find Work)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg"
                >
                  Login
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {!isLogin && (
              <form
                className="mt-6 text-left space-y-4"
                onSubmit={handleSignUpForm}
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleSignUpInput}
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleSignUpInput}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleSignUpInput}
                    className="mt-2 w-full rounded-md border border-slate-200 px-4 py-2"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    I am a
                  </label>

                  <div className="flex flex-col gap-2 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="CLIENT"
                        checked={signUpFormData.role === "CLIENT"}
                        onChange={handleSignUpInput}
                        className="accent-blue-500"
                      />
                      <span>Client (Post Projects)</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="FREELANCER"
                        checked={signUpFormData.role === "FREELANCER"}
                        onChange={handleSignUpInput}
                        className="accent-blue-500"
                      />
                      <span>Freelancer (Find Work)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-500 text-white font-medium py-3 rounded-lg"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
