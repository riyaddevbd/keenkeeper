"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { PlusCircle, Loader2 } from "lucide-react";
import { clsx } from "clsx";

const FriendCard = ({ friend }) => {
  const statusClasses = {
    "overdue": "status-overdue",
    "almost due": "status-almost-due",
    "on-track": "status-on-track",
  };

  return (
    <Link href={`/friend/${friend.id}`}>
      <div className="card hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-slate-100">
          <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-bold mb-1 text-[#1e3a3a]">{friend.name}</h3>
        <p className="text-xs text-slate-500 mb-3">{friend.days_since_contact}d ago</p>
        
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {friend.tags.map(tag => (
            <span key={tag} className="tag leading-tight">{tag}</span>
          ))}
        </div>

        <span className={clsx("badge leading-tight", statusClasses[friend.status])}>
          {friend.status}
        </span>
      </div>
    </Link>
  );
};

export default function HomePage() {
  const { friends, loading, getInteractionsThisMonth } = useAppContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#1e3a3a] mb-4" size={48} />
        <p className="text-slate-500 font-medium italic">Finding your connections...</p>
      </div>
    );
  }

  const summaryData = [
    { label: "Total Friends", value: friends.length },
    { label: "On Track", value: friends.filter(f => f.status === "on-track").length },
    { label: "Need Attention", value: friends.filter(f => f.status !== "on-track").length },
    { label: "Interactions This Month", value: getInteractionsThisMonth() },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Banner */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a3a] mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="btn-primary mx-auto">
          <PlusCircle size={20} />
          <span>Add a Friend</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {summaryData.map(stat => (
          <div key={stat.label} className="card text-center p-4">
            <h4 className="text-3xl font-bold text-[#1e3a3a] mb-1">{stat.value}</h4>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Friends Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1e3a3a] mb-8">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
