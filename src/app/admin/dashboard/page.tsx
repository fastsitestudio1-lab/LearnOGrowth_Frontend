'use client';

import React from 'react';
import { GraduationCap, BookOpen, TrendingUp, IndianRupee, BarChart2, Users } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { MOCK_STUDENTS, MOCK_TEACHERS, FEE_COLLECTION, PERFORMANCE_DATA, ATTENDANCE_WEEKLY } from '@/lib/mockData';
import styles from './dashboard.module.css';

const KPIS = [
  { label: 'Total Students', value: '1,245', sub: '+12 this month', icon: GraduationCap, color: '#6366f1', bg: 'var(--primary-light)' },
  { label: 'Total Teachers', value: '48', sub: '4 departments', icon: BookOpen, color: '#10b981', bg: 'var(--success-light)' },
  { label: 'Avg Attendance', value: '94.2%', sub: '+1.2% vs last month', icon: TrendingUp, color: '#f59e0b', bg: 'var(--warning-light)' },
  { label: 'Fee Collected', value: '₹18.8L', sub: '94% of target', icon: IndianRupee, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  { label: 'Active Classes', value: '32', sub: 'Grades 9–12', icon: BarChart2, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  { label: 'Parent Logins', value: '892', sub: 'This week', icon: Users, color: '#ef4444', bg: 'var(--danger-light)' },
];

const STATUS_DIST = [
  { name: 'Active', value: 1100, color: '#22c55e' },
  { name: 'Warning', value: 98, color: '#f59e0b' },
  { name: 'Inactive', value: 47, color: '#ef4444' },
];

export default function AdminDashboard() {
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.gpa - a.gpa).slice(0, 5);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          <p className={styles.pageSub}>School-wide overview · Academic Year 2024–25</p>
        </div>
        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        {KPIS.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiIconBox} style={{ background: k.bg, color: k.color }}>
                <Icon size={20} />
              </div>
              <div>
                <p className={styles.kpiValue}>{k.value}</p>
                <p className={styles.kpiLabel}>{k.label}</p>
                <p className={styles.kpiSub}>{k.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className={styles.mainGrid}>
        {/* Fee Collection */}
        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h2>Fee Collection Trend</h2>
            <span className={styles.chip}>Jan – May 2025</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={FEE_COLLECTION} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="feeCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feePending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                formatter={(v: any) => [`₹${(v/1000).toFixed(1)}k`, '']}
              />
              <Legend />
              <Area type="monotone" dataKey="collected" stroke="#6366f1" fill="url(#feeCollected)" strokeWidth={2.5} name="Collected" />
              <Area type="monotone" dataKey="pending" stroke="#ef4444" fill="url(#feePending)" strokeWidth={2} name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Student Status Pie */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Student Status</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={STATUS_DIST} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {STATUS_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance Bar */}
        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h2>Subject-wise Performance</h2>
            <span className={styles.chip}>School average</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60,100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="avg" fill="var(--primary)" radius={[4,4,0,0]} name="Avg Marks" />
              <Bar dataKey="class" fill="var(--secondary)" radius={[4,4,0,0]} name="School Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Students */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Top Performers</h2>
            <span className={styles.chip}>By GPA</span>
          </div>
          <div className={styles.studentList}>
            {topStudents.map((s, i) => (
              <div key={s.id} className={styles.studentRow}>
                <div className={styles.rank}>#{i + 1}</div>
                <div className={styles.studentAvatar}>{s.name.charAt(0)}</div>
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{s.name}</p>
                  <p className={styles.studentMeta}>{s.grade}-{s.section}</p>
                </div>
                <span className={styles.gpaTag}>{s.gpa}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teachers List */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Department Overview</h2>
          </div>
          <div className={styles.studentList}>
            {MOCK_TEACHERS.map(t => (
              <div key={t.id} className={styles.studentRow}>
                <div className={styles.studentAvatar} style={{ background: 'var(--success-light)', color: 'var(--success)' }}>{t.name.charAt(0)}</div>
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{t.name}</p>
                  <p className={styles.studentMeta}>{t.subject} · {t.studentsCount} students</p>
                </div>
                <span className={styles.gpaTag} style={{ background: 'var(--success-light)', color: 'var(--success)' }}>{t.classesCount} cls</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
