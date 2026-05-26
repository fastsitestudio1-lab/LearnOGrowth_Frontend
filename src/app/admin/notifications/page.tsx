'use client';

import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import type { Notification } from '@/types';
import { Bell, CheckCheck, Trash2, Filter } from 'lucide-react';
import styles from './notifications.module.css';

const TYPE_CFG: Record<string, { bg: string; color: string; label: string }> = {
  info: { bg: 'var(--info-light)', color: 'var(--info)', label: 'Info' },
  success: { bg: 'var(--success-light)', color: 'var(--success)', label: 'Success' },
  warning: { bg: 'var(--warning-light)', color: 'var(--warning)', label: 'Warning' },
  error: { bg: 'var(--danger-light)', color: 'var(--danger)', label: 'Alert' },
};

// Extend with extra admin notifications
const ADMIN_NOTIFICATIONS: Notification[] = [
  ...MOCK_NOTIFICATIONS,
  { id: 'N-007', title: 'New Teacher Joined', message: 'Mr. Kumar has joined the Physics department.', type: 'success', time: '4 days ago', read: true },
  { id: 'N-008', title: 'Fee Collection Alert', message: '3 students have overdue fees for April.', type: 'error', time: '5 days ago', read: true },
  { id: 'N-009', title: 'Exam Schedule Approved', message: 'Final exam schedule for June has been approved.', type: 'info', time: '6 days ago', read: true },
  { id: 'N-010', title: 'Parent Meeting Scheduled', message: 'Annual parent-teacher meeting on June 5th.', type: 'warning', time: '1 week ago', read: true },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(ADMIN_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'info' | 'success' | 'warning' | 'error'>('all');

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.sub}>{unreadCount} unread · {notifications.length} total</p>
        </div>
        {unreadCount > 0 && (
          <button className={styles.markAllBtn} onClick={markAllRead}>
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterRow}>
        {['all', 'unread', 'info', 'success', 'warning', 'error'].map(f => (
          <button
            key={f}
            className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
            onClick={() => setFilter(f as typeof filter)}
          >
            {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : TYPE_CFG[f]?.label ?? f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <Bell size={40} />
            <p>No notifications here</p>
          </div>
        )}
        {filtered.map(n => {
          const cfg = TYPE_CFG[n.type];
          return (
            <div
              key={n.id}
              className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
              onClick={() => markRead(n.id)}
            >
              <div className={styles.itemDot} style={{ background: cfg.color }} />
              <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                  <span className={styles.itemTitle}>{n.title}</span>
                  <span className={styles.typeBadge} style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                </div>
                <p className={styles.itemMessage}>{n.message}</p>
                <p className={styles.itemTime}>{n.time}</p>
              </div>
              <div className={styles.itemActions}>
                {!n.read && <div className={styles.unreadDot} />}
                <button
                  className={styles.deleteBtn}
                  onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
