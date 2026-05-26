'use client';

import React from 'react';
import AttendanceChart from './AttendanceChart';
import CalendarWidget from './CalendarWidget';
import { Users, GraduationCap, Clock, Activity } from 'lucide-react';
import styles from './Dashboard.module.css';

const summaryStats = [
  { label: 'Total Students', value: '1,245', icon: Users, color: 'var(--primary-color)' },
  { label: 'Average Attendance', value: '94.2%', icon: Clock, color: 'var(--success)' },
  { label: 'Active Projects', value: '38', icon: Activity, color: 'var(--warning)' },
  { label: 'Graduation Rate', value: '98%', icon: GraduationCap, color: 'var(--info)' },
];

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        {summaryStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
              <div className={styles.statIconWrapper} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Attendance Overview</h2>
          <AttendanceChart />
        </div>
        <div className={styles.sideGrid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Calendar</h2>
            <CalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
