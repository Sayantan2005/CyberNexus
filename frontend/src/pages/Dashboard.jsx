import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { api } from "../lib/api";
import React from "react";
export default function Dashboard(){
 const {user}=useAuth(); const [bio,setBio]=useState(user.bio||""); const [saved,setSaved]=useState([]);
 async function load(){setSaved((await api.get("/bookmarks")).data)} 
 async function save(){await api.put("/users/me",{bio,interests:user.interests});alert("Profile updated")}
 return <section className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Your space</p><h1 className="mt-2 text-4xl font-black">Hello, {user.username} 👋</h1></div><div className="grid gap-5 md:grid-cols-3"><div className="card p-6"><p className="text-sm text-slate-500">Role</p><p className="mt-2 text-xl font-bold">{user.role}</p></div><div className="card p-6"><p className="text-sm text-slate-500">Interests</p><p className="mt-2 text-xl font-bold">{user.interests?.length||0}</p></div><div className="card p-6"><p className="text-sm text-slate-500">Saved</p><button onClick={load} className="mt-2 text-xl font-bold text-cyan-400">{saved.length || "Load"}</button></div></div><div className="card max-w-2xl p-6"><h2 className="text-xl font-bold">Profile</h2><textarea className="input mt-4 min-h-32" value={bio} onChange={e=>setBio(e.target.value)} placeholder="Tell the community about yourself"/><button onClick={save} className="btn-primary mt-4">Save profile</button></div></section>
}
