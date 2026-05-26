'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Bell, Moon, Sun, Search, Menu, LogOut, ChevronRight, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import styles from './TopNav.module.css';

interface TopNavProps {
  toggleSidebar: () => void;
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {parts.map((part, idx) => {
        const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        const isLast = idx === parts.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight size={12} className={styles.breadcrumbSep} />}
            <span className={isLast ? styles.breadcrumbCurrent : styles.breadcrumbPart}>
              {label}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default function TopNav({ toggleSidebar }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const mounted = useMounted();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  // Close notif on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={styles.topnav}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <div className={styles.titleArea}>
          <Breadcrumbs />
        </div>
      </div>

      <div className={styles.searchWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search students, classes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.right}>
        {/* Theme Toggle */}
        <button className={styles.iconBtn} onClick={toggleTheme} title="Toggle theme">
          {mounted && (theme === 'light' ? <Moon size={18} /> : <Sun size={18} />)}
        </button>

        {/* Notifications */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            className={`${styles.iconBtn} ${notifOpen ? styles.iconBtnActive : ''}`}
            onClick={() => setNotifOpen(o => !o)}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className={styles.notifBadge}>{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className={styles.notifPanel}>
              <div className={styles.notifHeader}>
                <span className={styles.notifTitle}>Notifications</span>
                <span className={styles.notifCount}>{unreadCount} new</span>
                <button className={styles.notifClose} onClick={() => setNotifOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className={styles.notifList}>
                {MOCK_NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`${styles.notifItem} ${n.read ? styles.notifRead : ''}`}>
                    <div className={`${styles.notifDot} ${styles[`dot_${n.type}`]}`} />
                    <div className={styles.notifContent}>
                      <p className={styles.notifItemTitle}>{n.title}</p>
                      <p className={styles.notifItemMsg}>{n.message}</p>
                      <p className={styles.notifTime}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        {mounted && user && (
          <div className={styles.userChip}>
            <div className={styles.avatarSmall}>{user.name.charAt(0)}</div>
            <span className={styles.userName}>{user.name.split(' ')[0]}</span>
          </div>
        )}

        {/* Logout */}
        <button className={`${styles.iconBtn} ${styles.logoutBtn}`} onClick={logout} title="Sign out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
