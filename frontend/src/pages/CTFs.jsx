import { useEffect, useState } from "react";
import { api } from "../lib/api";
import CTFCard from "../components/CTFCard";
import React from "react"; 

const cats = ["All","Web","Crypto","Forensics","Pwn","Reverse Engineering","OSINT","Misc"];

export default function CTFs() {
  const [items,setItems]=useState([]);
  const [category,setCategory]=useState("All");
  useEffect(()=>{api.get("/ctfs",{params:{category}}).then(r=>setItems(r.data))},[category]);
  return <section>
    <div className="mb-8"><p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Compete</p><h1 className="mt-2 text-4xl font-black">Upcoming CTFs</h1><p className="mt-2 text-slate-400">Discover competitions and choose your next challenge.</p></div>
    <div className="mb-6 flex flex-wrap gap-2">{cats.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"btn-primary text-sm":"btn-secondary text-sm"}>{c}</button>)}</div>
    <div className="grid gap-5 md:grid-cols-2">{items.map(x=><CTFCard key={x._id} item={x}/>)}</div>
    {!items.length && <div className="card p-10 text-center text-slate-400">No upcoming CTFs found. Add CTF data through the backend/admin workflow.</div>}
  </section>
}
