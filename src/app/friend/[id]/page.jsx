"use client";

import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { 
  Phone, 
  MessageSquare, 
  Video, 
  Calendar, 
  Target, 
  Clock, 
  Edit2, 
  Archive, 
  Trash2, 
  BellOff,
  Loader2
} from "lucide-react";
import { clsx } from "clsx";
import toast from "react-hot-toast";

export default function FriendDetailsPage() {
  const { id } = useParams();
  const { friends, addTimelineEntry, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#1e3a3a] mb-4" size={48} />
      </div>
    );
  }

  const friend = friends.find(f => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Friend not found</h2>
      </div>
    );
  }

  const handleCheckIn = (type) => {
    const entry = {
      id: Date.now(),
      friendName: friend.name,
      type: type, // 'Call', 'Text', 'Video'
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      timestamp: Date.now()
    };
    addTimelineEntry(entry);
    toast.success(`${type} with ${friend.name} logged!`);
  };

  const statusClasses = {
    "overdue": "status-overdue",
    "almost due": "status-almost-due",
    "on-track": "status-on-track",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Friend Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-slate-50">
              <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-[#1e3a3a] mb-2">{friend.name}</h2>
            
            <div className="flex justify-center mb-4">
              <span className={clsx("badge", statusClasses[friend.status])}>
                {friend.status}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {friend.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <p className="text-slate-500 italic mb-4">"{friend.bio}"</p>
            <p className="text-sm text-slate-400">Preferred: {friend.email}</p>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              <BellOff size={18} /> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              <Archive size={18} /> Archive
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>

        {/* Right Column - Stats and Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card text-center py-8">
              <h4 className="text-3xl font-bold text-[#1e3a3a] mb-1">{friend.days_since_contact}</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Days Since Contact</p>
            </div>
            <div className="card text-center py-8">
              <h4 className="text-3xl font-bold text-[#1e3a3a] mb-1">{friend.goal}</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Goal (Days)</p>
            </div>
            <div className="card text-center py-8">
              <h4 className="text-xl font-bold text-[#1e3a3a] mb-1">{friend.next_due_date}</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Next Due</p>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="card flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#1e3a3a] mb-1">Relationship Goal</h4>
              <p className="text-slate-500">Connect every <span className="font-bold text-[#1e3a3a]">{friend.goal} days</span></p>
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Edit2 size={18} className="text-slate-400" />
            </button>
          </div>

          {/* Quick Check-In */}
          <div className="card">
            <h4 className="font-bold text-[#1e3a3a] mb-6">Quick Check-In</h4>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleCheckIn('Call')}
                className="flex flex-col items-center gap-3 p-6 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="p-3 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                  <Phone size={24} className="text-[#1e3a3a]" />
                </div>
                <span className="font-bold text-[#1e3a3a]">Call</span>
              </button>
              
              <button 
                onClick={() => handleCheckIn('Text')}
                className="flex flex-col items-center gap-3 p-6 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="p-3 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                  <MessageSquare size={24} className="text-[#1e3a3a]" />
                </div>
                <span className="font-bold text-[#1e3a3a]">Text</span>
              </button>

              <button 
                onClick={() => handleCheckIn('Video')}
                className="flex flex-col items-center gap-3 p-6 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="p-3 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                  <Video size={24} className="text-[#1e3a3a]" />
                </div>
                <span className="font-bold text-[#1e3a3a]">Video</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
