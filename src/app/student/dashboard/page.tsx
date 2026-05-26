'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar, ClipboardList, TrendingUp, Bell,
  CheckCircle, Clock, AlertTriangle, BookOpen
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis
} from 'recharts';
import { MOCK_ASSIGNMENTS, MOCK_NOTIFICATIONS, STUDENT_MARKS, PERFORMANCE_DATA } from '@/lib/mockData';
import styles from './dashboard.module.css';

const STAT_CARDS = [
  { label: 'Attendance', value: '92%', sub: '+2% this month', icon: Calendar, color: '#6366f1', bg: 'var(--primary-light)' },
  { label: 'Assignments Due', value: '2', sub: 'Next: June 2nd', icon: ClipboardList, color: '#ef4444', bg: 'var(--danger-light)' },
  { label: 'GPA', value: '3.8', sub: 'Rank #12 in class', icon: TrendingUp, color: '#10b981', bg: 'var(--success-light)' },
  { label: 'Unread Alerts', value: '3', sub: '2 urgent', icon: Bell, color: '#f59e0b', bg: 'var(--warning-light)' },
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Pending: <Clock size={14} style={{ color: 'var(--warning)' }} />,
  Submitted: <CheckCircle size={14} style={{ color: 'var(--success)' }} />,
  Graded: <CheckCircle size={14} style={{ color: 'var(--info)' }} />,
  Late: <AlertTriangle size={14} style={{ color: 'var(--danger)' }} />,
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const pendingAssignments = MOCK_ASSIGNMENTS.filter(a => a.status === 'Pending' || a.status === 'Late');
  const recentNotifs = MOCK_NOTIFICATIONS.filter(n => !n.read).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Good afternoon, {user?.name.split(' ')[0]}! 👋</h1>
          <p className={styles.pageSub}>Here&apos;s your academic snapshot for today</p>
        </div>
        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIconBox} style={{ background: stat.bg, color: stat.color }}>
                <Icon size={22} />
              </div>
              <div>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statSub}>{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Performance Chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Performance Trend</h2>
            <span className={styles.chip}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={STUDENT_MARKS} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="marks" stroke="var(--primary)" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: 'var(--primary)' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Radar */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Subject Performance</h2>
            <span className={styles.chip}>vs Class Avg</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={PERFORMANCE_DATA}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="You" dataKey="avg" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Class" dataKey="class" stroke="var(--accent-amber)" fill="var(--accent-amber)" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignments */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Pending Assignments</h2>
            <span className={styles.chip} style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>{pendingAssignments.length}</span>
          </div>
          <div className={styles.assignList}>
            {pendingAssignments.map(a => (
              <div key={a.id} className={styles.assignItem}>
                <div className={`${styles.assignStatus} status_${a.status.toLowerCase()}`}>
                  {STATUS_ICONS[a.status]}
                  <span>{a.status}</span>
                </div>
                <div className={styles.assignInfo}>
                  <p className={styles.assignTitle}>{a.title}</p>
                  <p className={styles.assignMeta}>{a.subject} · Due {a.dueDate}</p>
                </div>
                <span className={styles.assignMarks}>/{a.totalMarks}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Alerts</h2>
            <span className={styles.chip}>{recentNotifs.length} unread</span>
          </div>
          <div className={styles.notifList}>
            {recentNotifs.map(n => (
              <div key={n.id} className={styles.notifItem}>
                <div className={`${styles.notifDot} dot_${n.type}`} />
                <div>
                  <p className={styles.notifTitle}>{n.title}</p>
                  <p className={styles.notifMeta}>{n.message}</p>
                  <p className={styles.notifTime}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
