"use client";

import { useAppContext } from "@/context/AppContext";
import { 
  Phone, 
  MessageSquare, 
  Video, 
  Filter,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function TimelinePage() {
  const { timeline } = useAppContext();
  const [filter, setFilter] = useState("All");

  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(entry => entry.type === filter);

  const icons = {
    'Call': Phone,
    'Text': MessageSquare,
    'Video': Video
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1e3a3a]">Timeline</h1>
        
        <div className="relative group">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1e3a3a] text-slate-600 font-medium"
          >
            <option value="All">All interactions</option>
            <option value="Call">Calls only</option>
            <option value="Text">Texts only</option>
            <option value="Video">Video calls only</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTimeline.length === 0 ? (
          <div className="text-center py-20 card border-dashed">
            <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No interactions recorded yet.</p>
          </div>
        ) : (
          filteredTimeline.map(entry => {
            const Icon = icons[entry.type];
            return (
              <div key={entry.id} className="card flex items-center gap-6 p-6 hover:shadow-md transition-shadow">
                <div className={clsx(
                  "p-3 rounded-xl",
                  entry.type === 'Call' ? "bg-blue-50 text-blue-600" :
                  entry.type === 'Text' ? "bg-purple-50 text-purple-600" :
                  "bg-green-50 text-green-600"
                )}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a3a] mb-1">
                    {entry.type} with {entry.friendName}
                  </h4>
                  <p className="text-sm text-slate-500">{entry.date}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
