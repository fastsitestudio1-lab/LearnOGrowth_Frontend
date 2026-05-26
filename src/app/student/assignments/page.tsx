'use client';

import React, { useState } from 'react';
import { MOCK_ASSIGNMENTS } from '@/lib/mockData';
import { CheckCircle, Clock, AlertTriangle, FileUp, Search } from 'lucide-react';
import styles from './assignments.module.css';

const STATUS_CONFIG = {
  Pending: { icon: Clock, color: 'var(--warning)', bg: 'var(--warning-light)', label: 'Pending' },
  Submitted: { icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-light)', label: 'Submitted' },
  Graded: { icon: CheckCircle, color: 'var(--info)', bg: 'var(--info-light)', label: 'Graded' },
  Late: { icon: AlertTriangle, color: 'var(--danger)', bg: 'var(--danger-light)', label: 'Late' },
};

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = MOCK_ASSIGNMENTS.filter(a => {
    const matchFilter = filter === 'All' || a.status === filter;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Assignments</h1>
          <p className={styles.sub}>{filtered.length} assignments</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterTabs}>
          {['All', 'Pending', 'Submitted', 'Graded', 'Late'].map(tab => (
            <button
              key={tab}
              className={`${styles.filterTab} ${filter === tab ? styles.filterTabActive : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards */}
      <div className={styles.grid}>
        {filtered.map(a => {
          const cfg = STATUS_CONFIG[a.status];
          const Icon = cfg.icon;
          const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return (
            <div key={a.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.subject}>{a.subject}</span>
                <div className={styles.statusBadge} style={{ background: cfg.bg, color: cfg.color }}>
                  <Icon size={12} />
                  <span>{cfg.label}</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{a.title}</h3>
              <p className={styles.desc}>{a.description}</p>
              <div className={styles.cardMeta}>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>Due: {a.dueDate}</span>
                </div>
                {daysLeft >= 0 && a.status === 'Pending' && (
                  <span className={`${styles.daysLeft} ${daysLeft <= 2 ? styles.urgent : ''}`}>
                    {daysLeft === 0 ? 'Due today!' : `${daysLeft}d left`}
                  </span>
                )}
                {a.marks !== undefined && (
                  <span className={styles.marks}>{a.marks}/{a.totalMarks}</span>
                )}
              </div>
              {(a.status === 'Pending' || a.status === 'Late') && (
                <button className={styles.submitBtn}>
                  <FileUp size={15} />
                  Submit Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
