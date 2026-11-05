import { ExternalLink, Bookmark } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function NewsCard({ item }) {
  const { user } = useAuth();
  async function bookmark() {
    if (!user) return alert("Login to bookmark news.");
    await api.post(`/bookmarks/${item._id}`, { type: "news" });
  }
  return (
    <article className="card overflow-hidden p-5 transition hover:-translate-y-1 hover:border-cyan-500/40">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">{item.category}</span>
        <span className="text-xs text-slate-500">{item.source}</span>
      </div>
      <h3 className="line-clamp-2 text-lg font-bold">{item.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{item.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-500">{new Date(item.publishedAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button onClick={bookmark} className="btn-secondary p-2"><Bookmark size={16}/></button>
          <a href={item.url} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 text-sm">Read <ExternalLink size={14}/></a>
        </div>
      </div>
    </article>
  );
}
