"use client";

import { useAppContext } from "@/context/AppContext";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { Loader2 } from "lucide-react";

export default function StatsPage() {
  const { timeline, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#1e3a3a] mb-4" size={48} />
      </div>
    );
  }

  // Aggregate timeline data
  const counts = timeline.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, { Call: 0, Text: 0, Video: 0 });

  const data = [
    { name: 'Call', value: counts.Call },
    { name: 'Text', value: counts.Text },
    { name: 'Video', value: counts.Video },
  ];

  const COLORS = ['#1e3a3a', '#8b5cf6', '#22c55e'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#1e3a3a] mb-8">Friendship Analytics</h1>

      <div className="card">
        <h3 className="text-lg font-bold text-slate-500 mb-8 px-2">By Interaction Type</h3>
        
        <div className="h-[400px] w-full">
          {timeline.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <p>No interaction data yet. Start connecting with friends!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
