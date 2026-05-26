'use client';

import React, { useState } from 'react';
import { MOCK_LEAVE_REQUESTS } from '@/lib/mockData';
import type { LeaveRequest } from '@/types';
import { FileUp, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import styles from './leave.module.css';

const MY_LEAVES = MOCK_LEAVE_REQUESTS.filter(l => l.studentId === 'ST-001' || l.studentId === 'ST-003' || l.studentId === 'ST-002');

const STATUS_CFG: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  Pending: { bg: 'var(--warning-light)', color: 'var(--warning)', icon: <Clock size={13} /> },
  Approved: { bg: 'var(--success-light)', color: 'var(--success)', icon: <CheckCircle size={13} /> },
  Rejected: { bg: 'var(--danger-light)', color: 'var(--danger)', icon: <XCircle size={13} /> },
};

const TYPE_OPTIONS = ['Medical', 'Personal', 'Emergency'];

export default function StudentLeavePage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Medical', from: '', to: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    { id: 'MY-001', studentName: 'Arjun Kumar', studentId: 'ST-001', type: 'Medical', from: '2025-05-10', to: '2025-05-11', reason: 'Fever', status: 'Approved', class: '10-A' },
    { id: 'MY-002', studentName: 'Arjun Kumar', studentId: 'ST-001', type: 'Personal', from: '2025-04-20', to: '2025-04-20', reason: 'Family function', status: 'Approved', class: '10-A' },
    { id: 'MY-003', studentName: 'Arjun Kumar', studentId: 'ST-001', type: 'Medical', from: '2025-06-03', to: '2025-06-05', reason: 'Doctor appointment', status: 'Pending', class: '10-A' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveRequest = {
      id: `MY-${Date.now()}`,
      studentName: 'Arjun Kumar',
      studentId: 'ST-001',
      type: form.type as 'Medical' | 'Personal' | 'Emergency',
      from: form.from,
      to: form.to,
      reason: form.reason,
      status: 'Pending',
      class: '10-A',
    };
    setLeaves(prev => [newLeave, ...prev]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ type: 'Medical', from: '', to: '', reason: '' }); }, 1500);
  };

  const approved = leaves.filter(l => l.status === 'Approved').length;
  const pending = leaves.filter(l => l.status === 'Pending').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Leave Management</h1>
          <p className={styles.sub}>{leaves.length} requests this year · {pending} pending</p>
        </div>
        <button className={styles.applyBtn} onClick={() => setShowForm(true)}>
          <Plus size={16} /> Apply for Leave
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total Applied', value: leaves.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Approved', value: approved, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Pending', value: pending, color: 'var(--warning)', bg: 'var(--warning-light)' },
          { label: 'Rejected', value: leaves.filter(l => l.status === 'Rejected').length, color: 'var(--danger)', bg: 'var(--danger-light)' },
        ].map((s, i) => (
          <div key={i} className={styles.statCard} style={{ background: s.bg }}>
            <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Leave history */}
      <div className={styles.card}>
        <div className={styles.cardHeader}><h2>My Leave Requests</h2></div>
        <div className={styles.leaveList}>
          {leaves.map(l => {
            const cfg = STATUS_CFG[l.status];
            return (
              <div key={l.id} className={styles.leaveItem}>
                <div className={styles.leaveLeft}>
                  <span className={styles.leaveType}>{l.type}</span>
                  <p className={styles.leaveDates}>{l.from} → {l.to}</p>
                  <p className={styles.leaveReason}>{l.reason}</p>
                </div>
                <span className={styles.statusBadge} style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.icon} {l.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Apply Modal */}
      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className={styles.successState}>
                <CheckCircle size={48} style={{ color: 'var(--success)' }} />
                <h2>Leave Submitted!</h2>
                <p>Your request is under review.</p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <FileUp size={20} style={{ color: 'var(--primary)' }} />
                  <h2>Apply for Leave</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label>Leave Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} required>
                      {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.dateRow}>
                    <div className={styles.field}>
                      <label>From Date</label>
                      <input type="date" value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} required />
                    </div>
                    <div className={styles.field}>
                      <label>To Date</label>
                      <input type="date" value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} required />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Reason</label>
                    <textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} rows={3} placeholder="Briefly describe the reason..." required />
                  </div>
                  <div className={styles.modalActions}>
                    <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className={styles.submitBtn}>Submit Request</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
