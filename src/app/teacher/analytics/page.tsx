'use client';

import React from 'react';
import { MOCK_STUDENTS, PERFORMANCE_DATA, ATTENDANCE_WEEKLY } from '@/lib/mockData';
import { TrendingUp, AlertTriangle, Users, BarChart2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import styles from './analytics.module.css';

const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.gpa - a.gpa).slice(0, 5);
const atRisk = MOCK_STUDENTS.filter(s => s.attendance < 75 || s.status === 'Warning');

export default function TeacherAnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div><h1 className={styles.title}>Student Analytics</h1><p className={styles.sub}>Performance insights for your classes</p></div>
      </div>

      {/* KPI */}
      <div className={styles.kpiRow}>
        {[
          { label: 'Class Avg GPA', value: (MOCK_STUDENTS.reduce((a, s) => a + s.gpa, 0) / MOCK_STUDENTS.length).toFixed(2), icon: TrendingUp, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'At-Risk Students', value: atRisk.length, icon: AlertTriangle, color: 'var(--danger)', bg: 'var(--danger-light)' },
          { label: 'Avg Attendance', value: Math.round(MOCK_STUDENTS.reduce((a, s) => a + s.attendance, 0) / MOCK_STUDENTS.length) + '%', icon: Users, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Top GPA', value: Math.max(...MOCK_STUDENTS.map(s => s.gpa)).toFixed(1), icon: BarChart2, color: 'var(--warning)', bg: 'var(--warning-light)' },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiIcon} style={{ background: k.bg, color: k.color }}><Icon size={20} /></div>
              <div><p className={styles.kpiValue} style={{ color: k.color }}>{k.value}</p><p className={styles.kpiLabel}>{k.label}</p></div>
            </div>
          );
        })}
      </div>

      <div className={styles.chartsGrid}>
        {/* Weekly Attendance */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Weekly Attendance</h2><span className={styles.chip}>This week</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ATTENDANCE_WEEKLY} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Bar dataKey="present" fill="var(--primary)" radius={[4,4,0,0]} name="Present" />
              <Bar dataKey="absent" fill="var(--danger)" radius={[4,4,0,0]} name="Absent" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Radar */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Subject Performance</h2><span className={styles.chip}>Class avg</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={PERFORMANCE_DATA}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="Class Avg" dataKey="avg" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Students */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Top Performers</h2><span className={styles.chip}>By GPA</span></div>
          <div className={styles.rankList}>
            {topStudents.map((s, i) => (
              <div key={s.id} className={styles.rankRow}>
                <span className={styles.rankNum}>#{i + 1}</span>
                <div className={styles.rankAvatar}>{s.name.charAt(0)}</div>
                <div className={styles.rankInfo}>
                  <p className={styles.rankName}>{s.name}</p>
                  <p className={styles.rankMeta}>{s.grade}-{s.section} · Attendance: {s.attendance}%</p>
                </div>
                <span className={styles.gpaTag}>{s.gpa}</span>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>At-Risk Students</h2><span className={styles.chip} style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>{atRisk.length}</span></div>
          <div className={styles.rankList}>
            {atRisk.map(s => (
              <div key={s.id} className={styles.rankRow}>
                <AlertTriangle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                <div className={styles.rankAvatar} style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>{s.name.charAt(0)}</div>
                <div className={styles.rankInfo}>
                  <p className={styles.rankName}>{s.name}</p>
                  <p className={styles.rankMeta} style={{ color: 'var(--danger)' }}>Attendance: {s.attendance}% · GPA: {s.gpa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
