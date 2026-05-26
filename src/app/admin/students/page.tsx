'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '@/lib/mockData';
import type { Student } from '@/types';
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import styles from './students.module.css';

type SortKey = 'name' | 'grade' | 'gpa' | 'attendance';

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [showAdd, setShowAdd] = useState(false);
  const PER_PAGE = 6;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = students
    .filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
      const matchGrade = gradeFilter === 'All' || s.grade === gradeFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchGrade && matchStatus;
    })
    .sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      return sortAsc ? (va < vb ? -1 : 1) : (va > vb ? -1 : 1);
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));

  const STATUS_STYLES: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
    Active: { bg: 'var(--success-light)', color: 'var(--success)', icon: <TrendingUp size={12} /> },
    Warning: { bg: 'var(--warning-light)', color: 'var(--warning)', icon: <AlertTriangle size={12} /> },
    Inactive: { bg: 'var(--danger-light)', color: 'var(--danger)', icon: <TrendingDown size={12} /> },
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Students Directory</h1>
          <p className={styles.sub}>{students.length} total students registered</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Summary chips */}
      <div className={styles.summaryRow}>
        {[
          { label: 'Total', value: students.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Active', value: students.filter(s => s.status === 'Active').length, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Warning', value: students.filter(s => s.status === 'Warning').length, color: 'var(--warning)', bg: 'var(--warning-light)' },
          { label: 'Avg GPA', value: (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(1), color: 'var(--info)', bg: 'var(--info-light)' },
          { label: 'Avg Attendance', value: Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length) + '%', color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)' },
        ].map((chip, i) => (
          <div key={i} className={styles.summaryChip} style={{ background: chip.bg, color: chip.color }}>
            <span className={styles.chipValue}>{chip.value}</span>
            <span className={styles.chipLabel}>{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className={styles.searchInput}
          />
        </div>
        <select className={styles.select} value={gradeFilter} onChange={e => { setGradeFilter(e.target.value); setPage(1); }}>
          <option value="All">All Grades</option>
          {['9th', '10th', '11th', '12th'].map(g => <option key={g} value={g}>{g} Grade</option>)}
        </select>
        <select className={styles.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Warning">Warning</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th className={styles.sortable} onClick={() => toggleSort('grade')}>Grade {sortKey === 'grade' ? (sortAsc ? '↑' : '↓') : ''}</th>
                <th>Section</th>
                <th className={styles.sortable} onClick={() => toggleSort('gpa')}>GPA {sortKey === 'gpa' ? (sortAsc ? '↑' : '↓') : ''}</th>
                <th className={styles.sortable} onClick={() => toggleSort('attendance')}>Attendance {sortKey === 'attendance' ? (sortAsc ? '↑' : '↓') : ''}</th>
                <th>Status</th>
                <th>Parent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(s => {
                const st = STATUS_STYLES[s.status];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>{s.name.charAt(0)}</div>
                        <div>
                          <p className={styles.studentName}>{s.name}</p>
                          <p className={styles.studentId}>{s.id} · {s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.gradeBadge}>{s.grade}</span></td>
                    <td>{s.section}</td>
                    <td>
                      <span className={styles.gpaChip} style={{ color: s.gpa >= 3.5 ? 'var(--success)' : s.gpa >= 3.0 ? 'var(--warning)' : 'var(--danger)' }}>
                        {s.gpa}
                      </span>
                    </td>
                    <td>
                      <div className={styles.attendanceCell}>
                        <div className={styles.attendanceBar}>
                          <div
                            className={styles.attendanceFill}
                            style={{ width: `${s.attendance}%`, background: s.attendance >= 85 ? 'var(--success)' : s.attendance >= 75 ? 'var(--warning)' : 'var(--danger)' }}
                          />
                        </div>
                        <span>{s.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: st.bg, color: st.color }}>
                        {st.icon} {s.status}
                      </span>
                    </td>
                    <td className={styles.parentCell}>{s.parentName}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} title="Edit"><Pencil size={14} /></button>
                        <button className={styles.deleteBtn} title="Delete" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className={styles.pageControls}>
              <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} className={`${styles.pageNum} ${p === page ? styles.pageNumActive : ''}`} onClick={() => setPage(p)}>{p}</button>
              ))}
              <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal (placeholder) */}
      {showAdd && (
        <div className={styles.modalOverlay} onClick={() => setShowAdd(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Add New Student</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Student registration form coming soon.</p>
            <button className={styles.addBtn} style={{ marginTop: '1.5rem' }} onClick={() => setShowAdd(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
