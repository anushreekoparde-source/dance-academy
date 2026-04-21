import { Users, BookOpen, CreditCard, Calendar } from 'lucide-react';
import { dashboardStats, revenueData } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

export default function Dashboard() {
  const statCards = [
    { name: 'Total Students', value: dashboardStats.totalStudents, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Active Classes', value: dashboardStats.activeClasses, icon: BookOpen, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { name: 'Monthly Revenue', value: formatCurrency(dashboardStats.monthlyRevenue), icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Upcoming Batches', value: dashboardStats.upcomingBatches, icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-color)]">Dashboard Overview</h1>
        <div className="text-sm text-[var(--text-muted)]">Last updated: Today, 09:41 AM</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="card flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">{stat.name}</p>
              <p className="text-2xl font-bold mt-2 text-[var(--text-color)]">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 shadow-sm border-[var(--border-color)]">
          <h2 className="text-lg font-semibold mb-4 text-[var(--text-color)]">Revenue Overview</h2>
          <div className="w-full" style={{ minWidth: 0, minHeight: 320, height: 320 }}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-color)' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card shadow-sm border-[var(--border-color)]">
          <h2 className="text-lg font-semibold mb-4 text-[var(--text-color)]">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: "New student Aarav enrolled in Hip-Hop", time: "2 hours ago", color: "bg-blue-500" },
              { text: "Monthly fee received from Priya Patel", time: "4 hours ago", color: "bg-emerald-500" },
              { text: "New Batch 'Kids Contemporary' scheduled", time: "1 day ago", color: "bg-violet-500" },
              { text: "Salary disbursed to 4 trainers", time: "1 day ago", color: "bg-amber-500" },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-3 relative">
                {idx !== 3 && <div className="absolute left-1.5 top-5 bottom-[-1rem] w-0.5 bg-[var(--border-color)]"></div>}
                <div className={`w-3 h-3 rounded-full mt-1.5 z-10 shrink-0 outline outline-2 outline-[var(--surface-color)] ${activity.color}`} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-color)]">{activity.text}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-sm text-violet-500 hover:text-violet-600 font-medium py-2 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
