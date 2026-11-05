import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function GroupDetails(){
  const {id}=useParams(); const {user}=useAuth(); const [posts,setPosts]=useState([]); const [form,setForm]=useState({title:"",content:""});
  async function load(){setPosts((await api.get(`/groups/${id}/posts`)).data)}
  useEffect(()=>{load()},[id]);
  async function join(){await api.post(`/groups/${id}/join`); alert("Joined group");}
  async function create(e){e.preventDefault(); await api.post("/posts",{...form,group:id}); setForm({title:"",content:""}); load();}
  return <section className="mx-auto max-w-4xl">
    <div className="card mb-6 p-7"><p className="text-sm text-cyan-400">COMMUNITY GROUP</p><h1 className="mt-2 text-3xl font-black">Group discussion</h1><button onClick={join} className="btn-secondary mt-5">Join Group</button></div>
    {user&&<form onSubmit={create} className="card mb-6 p-5"><h2 className="font-bold">Start a discussion</h2><input required className="input mt-3" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><textarea required className="input mt-3 min-h-32" placeholder="Share something..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/><button className="btn-primary mt-3">Publish</button></form>}
    <div className="space-y-4">{posts.map(p=><article className="card p-6" key={p._id}><p className="text-xs text-cyan-400">@{p.author?.username}</p><h3 className="mt-1 text-xl font-bold">{p.title}</h3><p className="mt-3 whitespace-pre-wrap text-slate-300">{p.content}</p><button onClick={async()=>{await api.post(`/posts/${p._id}/like`);load()}} className="mt-5 text-sm text-slate-400">♥ {p.likes.length}</button></article>)}</div>
  </section>
}
