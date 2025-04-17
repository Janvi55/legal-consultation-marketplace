import { useEffect, useState } from 'react';

import StatCard from '../../components/admin/StatCard';
import axios from 'axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeLawyers: 0,
    openCases: 0,
    revenue: 0,
    pendingVerifications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, lawyers, cases, billing, verifications] = await Promise.all([
          axios.get('/users/stats'),
          axios.get('/lawyers?status=active'),
          axios.get('/cases?status=open'),
          axios.get('/admin/analytics/revenue'),
          axios.get('/lawyers?verified=false')
        ]);
        
        setStats({
          totalUsers: users.data.count,
          activeLawyers: lawyers.data.length,
          openCases: cases.data.length,
          revenue: billing.data.total,
          pendingVerifications: verifications.data.length
        });
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-grid">
      <StatCard title="Total Users" value={stats.totalUsers} icon="👥" trend="+12%"/>
      <StatCard title="Active Lawyers" value={stats.activeLawyers} icon="⚖️" trend="+5%"/>
      <StatCard title="Open Cases" value={stats.openCases} icon="📂" trend="-3%"/>
      <StatCard title="Revenue" value={`$${stats.revenue}`} icon="💰" trend="+18%"/>
      <StatCard title="Pending Verifications" value={stats.pendingVerifications} icon="🕵️" alert={stats.pendingVerifications > 0}/>
    </div>
  );
}