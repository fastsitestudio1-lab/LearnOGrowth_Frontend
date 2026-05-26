'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '@/lib/mockData';
import { Search, AlertTriangle } from 'lucide-react';
import styles from './students.module.css';

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = MOCK_STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Students</h1>
          <p className={styles.sub}>{MOCK_STUDENTS.length} students across your classes</p>
        </div>
      </div>

      {/* Summary */}
      <div className={styles.summaryRow}>
        {[
          { label: 'Total', value: MOCK_STUDENTS.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Active', value: MOCK_STUDENTS.filter(s => s.status === 'Active').length, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'At Risk', value: MOCK_STUDENTS.filter(s => s.status === 'Warning').length, color: 'var(--warning)', bg: 'var(--warning-light)' },
          { label: 'Avg GPA', value: (MOCK_STUDENTS.reduce((a, s) => a + s.gpa, 0) / MOCK_STUDENTS.length).toFixed(1), color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)' },
        ].map((c, i) => (
          <div key={i} className={styles.summaryChip} style={{ background: c.bg, color: c.color }}>
            <span className={styles.chipValue}>{c.value}</span>
            <span className={styles.chipLabel}>{c.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.tabs}>
          {['All', 'Active', 'Warning'].map(t => (
            <button key={t} className={`${styles.tab} ${statusFilter === t ? styles.tabActive : ''}`} onClick={() => setStatusFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Student</th><th>Grade</th><th>GPA</th><th>Attendance</th><th>Status</th><th>Parent</th></tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>{s.name.charAt(0)}</div>
                      <div><p className={styles.nameText}>{s.name}</p><p className={styles.idText}>{s.id}</p></div>
                    </div>
                  </td>
                  <td><span className={styles.gradeBadge}>{s.grade}-{s.section}</span></td>
                  <td><span style={{ fontWeight: 700, color: s.gpa >= 3.5 ? 'var(--success)' : s.gpa >= 3.0 ? 'var(--warning)' : 'var(--danger)' }}>{s.gpa}</span></td>
                  <td>
                    <div className={styles.attCell}>
                      <div className={styles.attBar}><div className={styles.attFill} style={{ width: `${s.attendance}%`, background: s.attendance >= 85 ? 'var(--success)' : s.attendance >= 75 ? 'var(--warning)' : 'var(--danger)' }} /></div>
                      <span>{s.attendance}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.statusBadge} style={{ background: s.status === 'Active' ? 'var(--success-light)' : s.status === 'Warning' ? 'var(--warning-light)' : 'var(--danger-light)', color: s.status === 'Active' ? 'var(--success)' : s.status === 'Warning' ? 'var(--warning)' : 'var(--danger)' }}>
                      {s.status === 'Warning' && <AlertTriangle size={11} />} {s.status}
                    </span>
                  </td>
                  <td className={styles.parentName}>{s.parentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
