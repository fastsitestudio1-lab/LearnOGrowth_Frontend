'use client';

import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import type { Notification } from '@/types';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import styles from './notifications.module.css';

const TYPE_CFG: Record<string, { bg: string; color: string; label: string }> = {
  info: { bg: 'var(--info-light)', color: 'var(--info)', label: 'Info' },
  success: { bg: 'var(--success-light)', color: 'var(--success)', label: 'Success' },
  warning: { bg: 'var(--warning-light)', color: 'var(--warning)', label: 'Warning' },
  error: { bg: 'var(--danger-light)', color: 'var(--danger)', label: 'Alert' },
};

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.sub}>{unreadCount} unread · {notifications.length} total</p>
        </div>
        {unreadCount > 0 && (
          <button className={styles.markAllBtn} onClick={markAllRead}>
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      <div className={styles.filterRow}>
        {(['all', 'unread'] as const).map(f => (
          <button key={f} className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.empty}><Bell size={40} /><p>No notifications</p></div>
        )}
        {filtered.map(n => {
          const cfg = TYPE_CFG[n.type];
          return (
            <div key={n.id} className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`} onClick={() => markRead(n.id)}>
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
                <button className={styles.deleteBtn} onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}><Trash2 size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
