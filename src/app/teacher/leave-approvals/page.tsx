'use client';

import React, { useState } from 'react';
import { MOCK_LEAVE_REQUESTS } from '@/lib/mockData';
import type { LeaveRequest } from '@/types';
import { CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import styles from './leave-approvals.module.css';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending: { bg: 'var(--warning-light)', color: 'var(--warning)' },
  Approved: { bg: 'var(--success-light)', color: 'var(--success)' },
  Rejected: { bg: 'var(--danger-light)', color: 'var(--danger)' },
};

export default function LeaveApprovalsPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
  };

  const filtered = leaves.filter(l => {
    const matchFilter = filter === 'All' || l.status === filter;
    const matchSearch = l.studentName.toLowerCase().includes(search.toLowerCase()) ||
                       l.class.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Leave Approvals</h1>
          <p className={styles.sub}>{leaves.filter(l => l.status === 'Pending').length} pending approvals</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search student or class..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.tabs}>
          {['All', 'Pending', 'Approved', 'Rejected'].map(t => (
            <button key={t} className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td>
                  <div className={styles.nameCell}>
                    <div className={styles.avatar}>{l.studentName.charAt(0)}</div>
                    <span>{l.studentName}</span>
                  </div>
                </td>
                <td><span className={styles.classBadge}>{l.class}</span></td>
                <td>{l.type}</td>
                <td>{l.from}</td>
                <td>{l.to}</td>
                <td className={styles.reasonCell}>{l.reason}</td>
                <td>
                  <span className={styles.statusBadge} style={{ background: STATUS_STYLES[l.status].bg, color: STATUS_STYLES[l.status].color }}>
                    {l.status}
                  </span>
                </td>
                <td>
                  {l.status === 'Pending' && (
                    <div className={styles.actions}>
                      <button className={styles.approveBtn} onClick={() => handleAction(l.id, 'Approved')} title="Approve">
                        <CheckCircle size={16} />
                      </button>
                      <button className={styles.rejectBtn} onClick={() => handleAction(l.id, 'Rejected')} title="Reject">
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
