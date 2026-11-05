import React from "react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({mode="login"}){
  const isLogin=mode==="login"; const {user,login,register}=useAuth(); const nav=useNavigate(); const loc=useLocation();
  const [form,setForm]=useState({username:"",email:"",password:""}); const [error,setError]=useState("");
  if(user) return <Navigate to="/dashboard" replace/>;
  async function submit(e){e.preventDefault();setError("");try{isLogin?await login(form.email,form.password):await register(form.username,form.email,form.password);nav(loc.state?.from||"/dashboard")}catch(e){setError(e.response?.data?.message||"Something went wrong")}}
  return <section className="mx-auto max-w-md py-12"><div className="card p-7"><h1 className="text-3xl font-black">{isLogin?"Welcome back":"Join CyberNexus"}</h1><p className="mt-2 text-sm text-slate-400">{isLogin?"Sign in to your community account.":"Create an account and start connecting."}</p><form onSubmit={submit} className="mt-7 space-y-4">{!isLogin&&<input required className="input" placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>}<input required type="email" className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input required minLength="8" type="password" className="input" placeholder="Password (8+ characters)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>{error&&<p className="text-sm text-red-400">{error}</p>}<button className="btn-primary w-full">{isLogin?"Login":"Create account"}</button></form><p className="mt-5 text-center text-sm text-slate-500">{isLogin?"New here? ":"Already have an account? "}<Link className="text-cyan-400" to={isLogin?"/register":"/login"}>{isLogin?"Register":"Login"}</Link></p></div></section>
}
