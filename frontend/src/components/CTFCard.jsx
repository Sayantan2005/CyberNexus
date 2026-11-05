import { CalendarDays, ExternalLink, Bookmark } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function CTFCard({ item }) {
  const { user } = useAuth();
  async function bookmark() {
    if (!user) return alert("Login to bookmark CTFs.");
    await api.post(`/bookmarks/${item._id}`, { type: "ctf" });
  }
  return (
    <article className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{item.platform}</span>
          <h3 className="mt-1 text-xl font-bold">{item.name}</h3>
        </div>
        <FlagIcon />
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-slate-400">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.categories?.map(c => <span key={c} className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-300">{c}</span>)}
      </div>
      <div className="mt-5 grid gap-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><CalendarDays size={15}/> {new Date(item.startDate).toLocaleString()} → {new Date(item.endDate).toLocaleString()}</div>
      </div>
      <div className="mt-5 flex gap-2">
        <button onClick={bookmark} className="btn-secondary p-2"><Bookmark size={16}/></button>
        <a href={item.registrationUrl} target="_blank" rel="noreferrer" className="btn-primary flex flex-1 items-center justify-center gap-2">Register <ExternalLink size={14}/></a>
      </div>
    </article>
  );
}
function FlagIcon() { return <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">🚩</div>; }
