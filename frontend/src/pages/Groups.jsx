import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import React from "react";
export default function Groups() {
  const {user}=useAuth(); const [groups,setGroups]=useState([]); const [show,setShow]=useState(false);
  const [form,setForm]=useState({name:"",description:"",category:"General"});
  async function load(){setGroups((await api.get("/groups")).data)}
  useEffect(()=>{load()},[]);
  async function create(e){e.preventDefault(); await api.post("/groups",form); setShow(false); setForm({name:"",description:"",category:"General"}); load();}
  return <section>
    <div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Community</p><h1 className="mt-2 text-4xl font-black">Groups</h1></div>{user&&<button onClick={()=>setShow(!show)} className="btn-primary flex gap-2"><Plus size={18}/> Create</button>}</div>
    {show&&<form onSubmit={create} className="card mb-6 grid gap-3 p-5 md:grid-cols-3"><input required className="input" placeholder="Group name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/><input className="input md:col-span-3" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><button className="btn-primary md:w-fit">Create group</button></form>}
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{groups.map(g=><div className="card p-6" key={g._id}><div className="flex items-center justify-between"><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">{g.category}</span><Users size={18} className="text-slate-500"/></div><h3 className="mt-5 text-xl font-bold">{g.name}</h3><p className="mt-2 text-sm text-slate-400">{g.description}</p><p className="mt-4 text-xs text-slate-500">{g.members.length} members · by {g.owner?.username}</p><Link to={`/groups/${g._id}`} className="mt-5 inline-block text-sm font-bold text-cyan-400">Open group →</Link></div>)}</div>
  </section>
}
