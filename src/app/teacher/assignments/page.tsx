'use client';

import React, { useState } from 'react';
import { MOCK_ASSIGNMENTS } from '@/lib/mockData';
import type { Assignment } from '@/types';
import { Plus, CheckCircle, Clock, AlertTriangle, ClipboardList } from 'lucide-react';
import styles from './assignments.module.css';

const STATUS_CFG: Record<string, { bg: string; color: string }> = {
  Pending: { bg: 'var(--warning-light)', color: 'var(--warning)' },
  Submitted: { bg: 'var(--info-light)', color: 'var(--info)' },
  Graded: { bg: 'var(--success-light)', color: 'var(--success)' },
  Late: { bg: 'var(--danger-light)', color: 'var(--danger)' },
};

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', subject: '', dueDate: '', totalMarks: '', description: '' });

  const filtered = assignments.filter(a => filter === 'All' || a.status === filter);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newA: Assignment = {
      id: `A-${Date.now()}`,
      title: form.title,
      subject: form.subject,
      dueDate: form.dueDate,
      status: 'Pending',
      totalMarks: +form.totalMarks,
      description: form.description,
    };
    setAssignments(prev => [newA, ...prev]);
    setShowForm(false);
    setForm({ title: '', subject: '', dueDate: '', totalMarks: '', description: '' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Assignment Management</h1>
          <p className={styles.sub}>{assignments.length} assignments · {assignments.filter(a => a.status === 'Submitted').length} pending review</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}><Plus size={16} /> New Assignment</button>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total', value: assignments.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Submitted', value: assignments.filter(a => a.status === 'Submitted').length, color: 'var(--info)', bg: 'var(--info-light)' },
          { label: 'Graded', value: assignments.filter(a => a.status === 'Graded').length, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Overdue', value: assignments.filter(a => a.status === 'Late').length, color: 'var(--danger)', bg: 'var(--danger-light)' },
        ].map((s, i) => (
          <div key={i} className={styles.statCard} style={{ background: s.bg }}>
            <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className={styles.filterRow}>
        {['All', 'Pending', 'Submitted', 'Graded', 'Late'].map(f => (
          <button key={f} className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* List */}
      <div className={styles.list}>
        {filtered.map(a => {
          const cfg = STATUS_CFG[a.status];
          return (
            <div key={a.id} className={styles.item}>
              <div className={styles.itemIcon}><ClipboardList size={20} style={{ color: 'var(--primary)' }} /></div>
              <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                  <span className={styles.itemSubject}>{a.subject}</span>
                  <span className={styles.statusBadge} style={{ background: cfg.bg, color: cfg.color }}>{a.status}</span>
                </div>
                <h3 className={styles.itemTitle}>{a.title}</h3>
                <p className={styles.itemDesc}>{a.description}</p>
                <div className={styles.itemMeta}>
                  <span><Clock size={13} /> Due: {a.dueDate}</span>
                  <span>Max Marks: {a.totalMarks}</span>
                  {a.marks !== undefined && <span className={styles.graded}>Graded: {a.marks}/{a.totalMarks}</span>}
                </div>
              </div>
              {a.status === 'Submitted' && (
                <button className={styles.gradeBtn}>Grade Now</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Create Assignment</h2>
            <form onSubmit={handleCreate} className={styles.form}>
              <div className={styles.field}><label>Title</label><input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Assignment title" required /></div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label>Subject</label><input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Subject" required /></div>
                <div className={styles.field}><label>Max Marks</label><input type="number" value={form.totalMarks} onChange={e => setForm(p => ({ ...p, totalMarks: e.target.value }))} placeholder="100" required /></div>
              </div>
              <div className={styles.field}><label>Due Date</label><input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} required /></div>
              <div className={styles.field}><label>Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Instructions..." required /></div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
