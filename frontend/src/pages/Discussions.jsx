import { useEffect, useState } from "react";
import { api } from "../lib/api";
import React from "react";
export default function Discussions(){
  const [groups,setGroups]=useState([]);
  useEffect(()=>{api.get("/groups").then(r=>setGroups(r.data))},[]);
  return <section><div className="mb-8"><p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Talk</p><h1 className="mt-2 text-4xl font-black">Discussions</h1><p className="mt-2 text-slate-400">Choose a community space to join the conversation.</p></div><div className="grid gap-4 md:grid-cols-2">{groups.map(g=><a className="card p-6 hover:border-cyan-500/40" href={`/groups/${g._id}`} key={g._id}><h3 className="font-bold">{g.name}</h3><p className="mt-2 text-sm text-slate-400">{g.description}</p></a>)}</div></section>
}
