'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, Calendar, ClipboardList, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { MOCK_STUDENTS, MOCK_LEAVE_REQUESTS, MOCK_ASSIGNMENTS, ATTENDANCE_WEEKLY, PERFORMANCE_DATA } from '@/lib/mockData';
import styles from './dashboard.module.css';

const STAT_CARDS = [
  { label: 'My Students', value: '125', sub: 'Across 4 classes', icon: Users, color: '#6366f1', bg: 'var(--primary-light)' },
  { label: 'Today\'s Attendance', value: '94%', sub: '6 students absent', icon: Calendar, color: '#10b981', bg: 'var(--success-light)' },
  { label: 'Assignments Active', value: '5', sub: '2 due this week', icon: ClipboardList, color: '#f59e0b', bg: 'var(--warning-light)' },
  { label: 'Leave Pending', value: '2', sub: 'Needs approval', icon: ShieldCheck, color: '#ef4444', bg: 'var(--danger-light)' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const atRiskStudents = MOCK_STUDENTS.filter(s => s.attendance < 75 || s.status === 'Warning');
  const topStudents = MOCK_STUDENTS.sort((a, b) => b.gpa - a.gpa).slice(0, 4);
  const pendingLeaves = MOCK_LEAVE_REQUESTS.filter(l => l.status === 'Pending');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Teacher Dashboard</h1>
          <p className={styles.pageSub}>Welcome back, {user?.name} · {user?.subject}</p>
        </div>
        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

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

      <div className={styles.mainGrid}>
        {/* Weekly Attendance */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Weekly Attendance</h2>
            <span className={styles.chip}>This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ATTENDANCE_WEEKLY} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="present" fill="var(--primary)" radius={[4,4,0,0]} name="Present" />
              <Bar dataKey="absent" fill="var(--danger)" radius={[4,4,0,0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Subject-wise Avg Marks</h2>
            <span className={styles.chip}>Class avg vs yours</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} name="Class Avg" />
              <Line type="monotone" dataKey="class" stroke="var(--secondary)" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3 }} name="School Avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* At Risk Students */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>At-Risk Students</h2>
            <span className={styles.chip} style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>{atRiskStudents.length}</span>
          </div>
          <div className={styles.studentList}>
            {atRiskStudents.map(s => (
              <div key={s.id} className={styles.studentRow}>
                <div className={styles.studentAvatar}>{s.name.charAt(0)}</div>
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{s.name}</p>
                  <p className={styles.studentMeta}>{s.grade}-{s.section} · Attendance: {s.attendance}%</p>
                </div>
                <AlertTriangle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Pending Leaves */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Leave Approvals</h2>
            <span className={styles.chip} style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>{pendingLeaves.length} pending</span>
          </div>
          <div className={styles.leaveList}>
            {pendingLeaves.map(l => (
              <div key={l.id} className={styles.leaveItem}>
                <div>
                  <p className={styles.leaveName}>{l.studentName}</p>
                  <p className={styles.leaveMeta}>{l.type} · {l.from} to {l.to}</p>
                  <p className={styles.leaveReason}>{l.reason}</p>
                </div>
                <div className={styles.leaveActions}>
                  <button className={styles.approveBtn}>✓</button>
                  <button className={styles.rejectBtn}>✗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
