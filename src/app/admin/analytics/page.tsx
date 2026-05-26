'use client';

import React, { useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { ATTENDANCE_WEEKLY, PERFORMANCE_DATA, FEE_COLLECTION, STUDENT_MARKS } from '@/lib/mockData';
import styles from './analytics.module.css';

const HEATMAP_DATA = Array.from({ length: 52 * 7 }, () =>
  Math.random() > 0.65 ? Math.floor(Math.random() * 4) + 1 : 0
);

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

export default function AdminAnalyticsPage() {
  const stableHeatmap = useMemo(() => HEATMAP_DATA, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>School Analytics</h1>
          <p className={styles.sub}>Academic Year 2024–25 · Performance & Activity Overview</p>
        </div>
        <button className={styles.exportBtn}>⬇ Export Report</button>
      </div>

      {/* Metric KPIs */}
      <div className={styles.kpiRow}>
        {[
          { label: 'Peak Attendance Month', value: 'January', sub: '98.2% avg', color: '#6366f1' },
          { label: 'Top Performing Subject', value: 'English', sub: '85 avg marks', color: '#10b981' },
          { label: 'Current Streak', value: '14 days', sub: 'Above 90% attendance', color: '#f59e0b' },
          { label: 'School Score', value: '340 pts', sub: 'Top 5% statewide', color: '#8b5cf6' },
        ].map((k, i) => (
          <div key={i} className={styles.kpiCard} style={{ borderColor: k.color }}>
            <p className={styles.kpiLabel}>{k.label}</p>
            <p className={styles.kpiValue} style={{ color: k.color }}>{k.value}</p>
            <p className={styles.kpiSub}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className={styles.chartsRow}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Weekly Attendance Trend</h2>
            <span className={styles.chip}>This week</span>
          </div>
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

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Subject Performance</h2>
            <span className={styles.chip}>School avg</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PERFORMANCE_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} name="Avg Marks" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fee Collection */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Fee Collection vs Pending</h2>
          <span className={styles.chip}>Jan – May 2025</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={FEE_COLLECTION} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
            <defs>
              <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} formatter={(v: any) => [`₹${(v/1000).toFixed(1)}k`, '']} />
            <Area dataKey="collected" stroke="#6366f1" fill="url(#gc)" strokeWidth={2.5} name="Collected" />
            <Area dataKey="pending" stroke="#ef4444" fill="url(#gp)" strokeWidth={2} name="Pending" />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Heatmap */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Activity Heatmap</h2>
          <span className={styles.chip}>Jun 2024 → May 2025 · each cell = 1 day</span>
        </div>
        <div className={styles.heatmapWrap}>
          <div className={styles.monthLabels}>
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>
          <div className={styles.heatmapGrid}>
            {stableHeatmap.map((level, i) => (
              <div key={i} className={`${styles.cell} ${styles[`l${level}`]}`} title={`Level ${level}`} />
            ))}
          </div>
        </div>
        <div className={styles.legend}>
          <span>Less</span>
          {[0,1,2,3,4].map(l => <div key={l} className={`${styles.cell} ${styles[`l${l}`]}`} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
