'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '@/lib/mockData';
import { HeartPulse, Search, AlertTriangle, Smile, Activity, PhoneCall } from 'lucide-react';
import styles from './wellbeing.module.css';

// Generate mock mental health data for senior students
const SENIOR_STUDENTS = MOCK_STUDENTS.filter(s => ['10th', '11th', '12th'].includes(s.grade)).map((s, i) => {
  const isCrisis = i % 7 === 0; // Fake some crisis conditions
  const isWarning = i % 4 === 0 && !isCrisis;
  
  return {
    ...s,
    mhStatus: isCrisis ? 'Crisis Risk' : isWarning ? 'Elevated Stress' : 'Stable',
    recentMood: isCrisis ? '😔' : isWarning ? '😐' : '🙂',
    phq9Score: isCrisis ? Math.floor(Math.random() * 10) + 15 : isWarning ? Math.floor(Math.random() * 5) + 10 : Math.floor(Math.random() * 9),
    sleepAvg: isCrisis ? (Math.random() * 2 + 4).toFixed(1) : isWarning ? (Math.random() * 2 + 5).toFixed(1) : (Math.random() * 2 + 7).toFixed(1),
  };
});

export default function TeacherWellbeingPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = SENIOR_STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchStatus = filter === 'All' || 
                       (filter === 'Alerts' && s.mhStatus !== 'Stable') ||
                       (filter === 'Crisis' && s.mhStatus === 'Crisis Risk');
    return matchSearch && matchStatus;
  });

  const crisisCount = SENIOR_STUDENTS.filter(s => s.mhStatus === 'Crisis Risk').length;
  const warningCount = SENIOR_STUDENTS.filter(s => s.mhStatus === 'Elevated Stress').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Wellbeing Insights</h1>
          <p className={styles.sub}>Mental health and emotional tracking for senior grades (10th-12th)</p>
        </div>
      </div>

      {crisisCount > 0 && (
        <div className={styles.alertBanner}>
          <div className={styles.alertIcon}><AlertTriangle size={20} /></div>
          <div className={styles.alertContent}>
            <h3 className={styles.alertTitle}>Attention Required: High-Risk Students Detected</h3>
            <p className={styles.alertText}>
              {crisisCount} student(s) have flagged high scores on clinical assessments or logged consistently low moods indicating a potential crisis. Please review their profiles and coordinate with the school counselor.
            </p>
          </div>
        </div>
      )}

      {/* KPI Stats */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total Monitored', value: SENIOR_STUDENTS.length, icon: HeartPulse, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Stable Baselines', value: SENIOR_STUDENTS.length - crisisCount - warningCount, icon: Smile, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Elevated Stress', value: warningCount, icon: Activity, color: 'var(--warning)', bg: 'var(--warning-light)' },
          { label: 'Crisis Risk', value: crisisCount, icon: AlertTriangle, color: 'var(--danger)', bg: 'var(--danger-light)' },
        ].map((k, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: k.bg, color: k.color }}><k.icon size={22} /></div>
            <div>
              <p className={styles.statValue} style={{ color: k.color }}>{k.value}</p>
              <p className={styles.statLabel}>{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.tabs}>
          {['All', 'Alerts', 'Crisis'].map(t => (
            <button key={t} className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Recent Mood</th>
                <th>PHQ-9 Score</th>
                <th>Avg Sleep</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar} style={{ background: s.mhStatus === 'Crisis Risk' ? 'var(--danger)' : s.mhStatus === 'Elevated Stress' ? 'var(--warning)' : undefined }}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className={styles.nameText}>{s.name}</p>
                        <p className={styles.idText}>{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{s.grade}-{s.section}</span></td>
                  <td>
                    <span className={`${styles.badge} ${s.mhStatus === 'Crisis Risk' ? styles.badgeCrisis : s.mhStatus === 'Elevated Stress' ? styles.badgeWarning : styles.badgeNormal}`}>
                      {s.mhStatus === 'Crisis Risk' && <AlertTriangle size={12} />}
                      {s.mhStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}><span className={styles.moodEmoji}>{s.recentMood}</span></td>
                  <td>
                    <span style={{ fontWeight: 700, color: s.phq9Score >= 15 ? 'var(--danger)' : s.phq9Score >= 10 ? 'var(--warning)' : 'var(--text-primary)' }}>
                      {s.phq9Score} / 27
                    </span>
                  </td>
                  <td><span style={{ fontSize: '0.875rem' }}>{s.sleepAvg} hrs</span></td>
                  <td>
                    <button className={styles.actionBtn}>
                      <PhoneCall size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Intervene
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No students match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
