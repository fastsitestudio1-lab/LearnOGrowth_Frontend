'use client';

import React, { useState } from 'react';
import { MOCK_TEACHERS } from '@/lib/mockData';
import type { Teacher } from '@/types';
import { Search, Plus, Pencil, Trash2, Mail, BookOpen } from 'lucide-react';
import styles from './teachers.module.css';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const departments = [...new Set(MOCK_TEACHERS.map(t => t.department))];

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                       t.subject.toLowerCase().includes(search.toLowerCase()) ||
                       t.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || t.department === deptFilter;
    return matchSearch && matchDept;
  });

  const handleDelete = (id: string) => setTeachers(prev => prev.filter(t => t.id !== id));

  const DEPT_COLORS: Record<string, { bg: string; color: string }> = {
    Science: { bg: 'rgba(99,102,241,0.12)', color: '#6366f1' },
    Humanities: { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
    Commerce: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
    Arts: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Teachers Directory</h1>
          <p className={styles.sub}>{teachers.length} faculty members across {departments.length} departments</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      {/* Dept Summary Cards */}
      <div className={styles.deptGrid}>
        {departments.map(dept => {
          const cfg = DEPT_COLORS[dept] ?? { bg: 'var(--border)', color: 'var(--text-secondary)' };
          const count = teachers.filter(t => t.department === dept).length;
          const total = teachers.filter(t => t.department === dept).reduce((a, t) => a + t.studentsCount, 0);
          return (
            <div key={dept} className={styles.deptCard}>
              <div className={styles.deptIcon} style={{ background: cfg.bg, color: cfg.color }}>
                <BookOpen size={20} />
              </div>
              <div>
                <p className={styles.deptName}>{dept}</p>
                <p className={styles.deptMeta}>{count} teachers · {total} students</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, subject or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <select className={styles.select} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Teacher Cards Grid */}
      <div className={styles.cardsGrid}>
        {filtered.map(t => {
          const cfg = DEPT_COLORS[t.department] ?? { bg: 'var(--border)', color: 'var(--text-secondary)' };
          return (
            <div key={t.id} className={styles.teacherCard}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{t.name.charAt(0)}</div>
                <div className={styles.cardActions}>
                  <button className={styles.editBtn} title="Edit"><Pencil size={14} /></button>
                  <button className={styles.deleteBtn} title="Remove" onClick={() => handleDelete(t.id)}><Trash2 size={14} /></button>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.teacherName}>{t.name}</h3>
                <div className={styles.subjectBadge} style={{ background: cfg.bg, color: cfg.color }}>
                  {t.subject}
                </div>
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Dept</span>
                    <span className={styles.metaValue}>{t.department}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Emp ID</span>
                    <span className={styles.metaValue}>{t.employeeId}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Classes</span>
                    <span className={styles.metaValue}>{t.classesCount}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Students</span>
                    <span className={styles.metaValue}>{t.studentsCount}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Mail size={14} />
                <span>{t.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
