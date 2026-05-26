'use client';

import React from 'react';
import { STUDENT_MARKS, PERFORMANCE_DATA } from '@/lib/mockData';
import { TrendingUp, Award, Target, BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import styles from './performance.module.css';

const GRADE_TREND = [
  { term: 'Term 1', gpa: 3.4 },
  { term: 'Mid-1', gpa: 3.6 },
  { term: 'Term 2', gpa: 3.7 },
  { term: 'Mid-2', gpa: 3.8 },
  { term: 'Term 3', gpa: 3.8 },
];

const RANK_DATA = [
  { subject: 'Math', rank: 8 },
  { subject: 'Physics', rank: 15 },
  { subject: 'Chemistry', rank: 6 },
  { subject: 'English', rank: 3 },
  { subject: 'History', rank: 18 },
];

export default function StudentPerformancePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Performance</h1>
          <p className={styles.sub}>Academic Year 2024–25 · Detailed analytics</p>
        </div>
      </div>

      {/* KPIs */}
      <div className={styles.kpiRow}>
        {[
          { label: 'Current GPA', value: '3.8', sub: 'Top 15% of class', icon: TrendingUp, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Class Rank', value: '#12', sub: 'Out of 125 students', icon: Award, color: 'var(--warning)', bg: 'var(--warning-light)' },
          { label: 'Best Subject', value: 'English', sub: '91% · Grade A+', icon: Target, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Tests Taken', value: '24', sub: 'This semester', icon: BarChart2, color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)' },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiIcon} style={{ background: k.bg, color: k.color }}><Icon size={20} /></div>
              <div>
                <p className={styles.kpiValue} style={{ color: k.color }}>{k.value}</p>
                <p className={styles.kpiLabel}>{k.label}</p>
                <p className={styles.kpiSub}>{k.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts grid */}
      <div className={styles.chartsGrid}>
        {/* Marks Trend */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Monthly Marks Trend</h2><span className={styles.chip}>Last 6 months</span></div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={STUDENT_MARKS} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="marks" stroke="var(--primary)" strokeWidth={2.5} fill="url(#mg)" dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Radar */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Subject Radar</h2><span className={styles.chip}>vs Class Avg</span></div>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={PERFORMANCE_DATA}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Radar name="You" dataKey="avg" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Class" dataKey="class" stroke="var(--accent-amber)" fill="var(--accent-amber)" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* GPA Trend */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>GPA Trend</h2><span className={styles.chip}>By term</span></div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={GRADE_TREND} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="term" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[3, 4]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="gpa" stroke="var(--secondary)" strokeWidth={2.5} fill="url(#gg)" dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Class Rank by Subject */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Class Rank by Subject</h2><span className={styles.chip}>Lower is better</span></div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={RANK_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={12} reversed />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Bar dataKey="rank" fill="var(--accent-violet)" radius={[4,4,0,0]} name="Rank" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
