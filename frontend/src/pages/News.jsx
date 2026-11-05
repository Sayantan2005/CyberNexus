import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../lib/api";
import NewsCard from "../components/NewsCard";
import React from "react";
const cats = ["All", "Vulnerability", "Malware", "Data Breach", "Phishing", "AI Security", "Cybersecurity"];

export default function News() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { const {data} = await api.get("/news", {params:{category, search}}); setItems(data.items); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [category]);
  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-sm font-bold uppercase tracking-wider text-cyan-400">Live feed</p><h1 className="mt-2 text-4xl font-black">Cybersecurity News</h1></div>
        <div className="flex gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} className="input w-64" placeholder="Search news"/><button onClick={load} className="btn-primary"><Search size={18}/></button></div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">{cats.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"btn-primary text-sm":"btn-secondary text-sm"}>{c}</button>)}</div>
      {loading ? <p className="text-slate-400">Loading news...</p> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(x=><NewsCard key={x._id} item={x}/>)}</div>}
      {!loading && items.length===0 && <div className="card p-10 text-center text-slate-400">No news yet. Run the automation worker to populate the feed.</div>}
    </section>
  );
}
