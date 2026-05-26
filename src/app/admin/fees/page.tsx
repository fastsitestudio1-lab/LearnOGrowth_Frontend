'use client';

import React, { useState } from 'react';
import { FEE_COLLECTION } from '@/lib/mockData';
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle, Search, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './fees.module.css';

const FEE_RECORDS = [
  { id: 'F-001', studentName: 'Arjun Kumar', grade: '10th-A', amount: 15000, paid: 15000, status: 'Paid', dueDate: '2025-05-10', paidDate: '2025-05-08' },
  { id: 'F-002', studentName: 'Priya Sharma', grade: '10th-A', amount: 15000, paid: 15000, status: 'Paid', dueDate: '2025-05-10', paidDate: '2025-05-05' },
  { id: 'F-003', studentName: 'Rohan Mehta', grade: '10th-B', amount: 15000, paid: 0, status: 'Pending', dueDate: '2025-05-10', paidDate: '' },
  { id: 'F-004', studentName: 'Sneha Patel', grade: '11th-A', amount: 16000, paid: 8000, status: 'Partial', dueDate: '2025-05-15', paidDate: '2025-05-12' },
  { id: 'F-005', studentName: 'Kiran Rao', grade: '11th-B', amount: 16000, paid: 16000, status: 'Paid', dueDate: '2025-05-15', paidDate: '2025-05-14' },
  { id: 'F-006', studentName: 'Divya Nair', grade: '12th-A', amount: 18000, paid: 0, status: 'Overdue', dueDate: '2025-04-30', paidDate: '' },
  { id: 'F-007', studentName: 'Aakash Singh', grade: '12th-B', amount: 18000, paid: 18000, status: 'Paid', dueDate: '2025-04-30', paidDate: '2025-04-28' },
  { id: 'F-008', studentName: 'Meera Iyer', grade: '9th-A', amount: 14000, paid: 14000, status: 'Paid', dueDate: '2025-05-20', paidDate: '2025-05-19' },
];

const STATUS_CFG: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  Paid: { bg: 'var(--success-light)', color: 'var(--success)', icon: <CheckCircle size={12} /> },
  Pending: { bg: 'var(--warning-light)', color: 'var(--warning)', icon: <AlertTriangle size={12} /> },
  Partial: { bg: 'var(--info-light)', color: 'var(--info)', icon: <AlertTriangle size={12} /> },
  Overdue: { bg: 'var(--danger-light)', color: 'var(--danger)', icon: <AlertTriangle size={12} /> },
};

export default function AdminFeesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const totalCollected = FEE_RECORDS.reduce((a, f) => a + f.paid, 0);
  const totalExpected = FEE_RECORDS.reduce((a, f) => a + f.amount, 0);
  const totalPending = totalExpected - totalCollected;
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  const filtered = FEE_RECORDS.filter(f => {
    const matchSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || f.grade.includes(search);
    const matchStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Fee Management</h1>
          <p className={styles.sub}>Track collections, pending dues, and payment history</p>
        </div>
        <button className={styles.exportBtn}><Download size={16} /> Export</button>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        {[
          { label: 'Total Collected', value: `₹${(totalCollected/1000).toFixed(0)}k`, sub: `${collectionRate}% of target`, icon: <IndianRupee size={20} />, color: '#10b981', bg: 'var(--success-light)' },
          { label: 'Pending Dues', value: `₹${(totalPending/1000).toFixed(0)}k`, sub: `${FEE_RECORDS.filter(f => f.status === 'Pending').length} students`, icon: <AlertTriangle size={20} />, color: '#f59e0b', bg: 'var(--warning-light)' },
          { label: 'Overdue', value: `${FEE_RECORDS.filter(f => f.status === 'Overdue').length}`, sub: 'Need immediate followup', icon: <AlertTriangle size={20} />, color: '#ef4444', bg: 'var(--danger-light)' },
          { label: 'Collection Rate', value: `${collectionRate}%`, sub: 'vs last month: +2%', icon: <TrendingUp size={20} />, color: '#6366f1', bg: 'var(--primary-light)' },
        ].map((s, i) => (
          <div key={i} className={styles.summaryCard}>
            <div className={styles.summaryIcon} style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <p className={styles.summaryValue}>{s.value}</p>
              <p className={styles.summaryLabel}>{s.label}</p>
              <p className={styles.summarySub}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Monthly Collection Trend</h2>
          <span className={styles.chip}>Jan – May 2025</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={FEE_COLLECTION} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} formatter={(v: any) => [`₹${(v/1000).toFixed(1)}k`, '']} />
            <Bar dataKey="collected" fill="var(--primary)" radius={[4,4,0,0]} name="Collected" />
            <Bar dataKey="pending" fill="var(--warning)" radius={[4,4,0,0]} name="Pending" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search student or grade..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
        </div>
        <div className={styles.tabs}>
          {['All', 'Paid', 'Pending', 'Partial', 'Overdue'].map(t => (
            <button key={t} className={`${styles.tab} ${statusFilter === t ? styles.tabActive : ''}`} onClick={() => setStatusFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th><th>Grade</th><th>Total Fee</th><th>Paid</th>
                <th>Balance</th><th>Status</th><th>Due Date</th><th>Paid On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => {
                const cfg = STATUS_CFG[f.status];
                const balance = f.amount - f.paid;
                return (
                  <tr key={f.id}>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>{f.studentName.charAt(0)}</div>
                        <span>{f.studentName}</span>
                      </div>
                    </td>
                    <td><span className={styles.gradeBadge}>{f.grade}</span></td>
                    <td>₹{f.amount.toLocaleString()}</td>
                    <td className={styles.paidAmount}>₹{f.paid.toLocaleString()}</td>
                    <td className={balance > 0 ? styles.balanceDue : styles.balanceClear}>
                      {balance > 0 ? `₹${balance.toLocaleString()}` : '—'}
                    </td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: cfg.bg, color: cfg.color }}>
                        {cfg.icon}{f.status}
                      </span>
                    </td>
                    <td>{f.dueDate}</td>
                    <td>{f.paidDate || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
