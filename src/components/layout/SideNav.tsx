'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, User, Calendar, CheckSquare,
  Folder, ShieldCheck, UploadCloud, FileUp,
  BarChart3, Bell, Settings, LogOut, X,
  GraduationCap, Users, ClipboardList, BookOpen,
  PieChart, ChevronRight, Building2, HeartPulse
} from 'lucide-react';
import styles from './SideNav.module.css';
import type { Role } from '@/types';

interface SideNavProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const NAV_BY_ROLE: Record<Role, { label: string; items: { name: string; href: string; icon: React.ComponentType<{size?:number;className?:string}>; badge?: string; badgeColor?: string }[] }[]> = {
  student: [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', href: '/student/profile', icon: User },
      ]
    },
    {
      label: 'Academics',
      items: [
        { name: 'Attendance', href: '/student/attendance', icon: Calendar, badge: '92%', badgeColor: 'green' },
        { name: 'Assignments', href: '/student/assignments', icon: ClipboardList, badge: '2', badgeColor: 'red' },
        { name: 'Performance', href: '/student/performance', icon: PieChart },
      ]
    },
    {
      label: 'Applications',
      items: [
        { name: 'Leave Management', href: '/student/leave', icon: FileUp },
        { name: 'Notifications', href: '/student/notifications', icon: Bell, badge: '3', badgeColor: 'default' },
      ]
    },
    {
      label: 'System',
      items: [{ name: 'Settings', href: '/student/settings', icon: Settings }]
    }
  ],
  teacher: [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', href: '/teacher/profile', icon: User },
      ]
    },
    {
      label: 'Class Management',
      items: [
        { name: 'Students', href: '/teacher/students', icon: Users },
        { name: 'Mark Attendance', href: '/teacher/attendance', icon: CheckSquare },
        { name: 'Assignments', href: '/teacher/assignments', icon: ClipboardList },
        { name: 'Student Wellbeing', href: '/teacher/wellbeing', icon: HeartPulse, badge: 'Alerts', badgeColor: 'red' },
      ]
    },
    {
      label: 'Administration',
      items: [
        { name: 'Leave Approvals', href: '/teacher/leave-approvals', icon: ShieldCheck, badge: '2', badgeColor: 'default' },
        { name: 'Student Analytics', href: '/teacher/analytics', icon: BarChart3 },
        { name: 'Notifications', href: '/teacher/notifications', icon: Bell, badge: '5', badgeColor: 'default' },
      ]
    },
    {
      label: 'System',
      items: [{ name: 'Settings', href: '/teacher/settings', icon: Settings }]
    }
  ],
  admin: [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'Management',
      items: [
        { name: 'Students', href: '/admin/students', icon: GraduationCap },
        { name: 'Teachers', href: '/admin/teachers', icon: BookOpen },
        { name: 'Classes', href: '/admin/classes', icon: Building2 },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { name: 'School Analytics', href: '/admin/analytics', icon: PieChart },
        { name: 'Fee Management', href: '/admin/fees', icon: BarChart3 },
        { name: 'Notifications', href: '/admin/notifications', icon: Bell, badge: '12', badgeColor: 'red' },
      ]
    },
    {
      label: 'System',
      items: [{ name: 'Settings', href: '/admin/settings', icon: Settings }]
    }
  ]
};

const ROLE_LABELS: Record<Role, { name: string; sub: string }> = {
  student: { name: 'Arjun Kumar', sub: 'Student · 10th-A' },
  teacher: { name: 'Dr. Anita Desai', sub: 'Teacher · Mathematics' },
  admin: { name: 'Principal Sharma', sub: 'Administrator' },
};

export default function SideNav({ isOpen, closeSidebar }: SideNavProps) {
  const pathname = usePathname();
  const { role, logout, user } = useAuth();

  if (!role) return null;

  let sections = NAV_BY_ROLE[role] ? NAV_BY_ROLE[role].map(s => ({ ...s, items: [...s.items] })) : [];
  
  if (role === 'student' && user?.grade) {
    const isSenior = ['10th', '11th', '12th'].some(g => (user.grade as string).includes(g));
    if (isSenior) {
      sections = sections.map((sec) => {
        if (sec.label === 'Applications') {
          sec.items.push({ name: 'Mental Health', href: '/student/mental-health', icon: HeartPulse, badge: 'New', badgeColor: 'green' });
        }
        return sec;
      });
    }
  }

  const userInfo = ROLE_LABELS[role];

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeSidebar} />}
      <aside className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>N</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Student Nexus</span>
            <span className={styles.brandRole}>{role?.toUpperCase()}</span>
          </div>
          <button className={styles.closeBtn} onClick={closeSidebar} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {sections.map((section, idx) => (
            <div key={idx} className={styles.section}>
              <p className={styles.sectionLabel}>{section.label}</p>
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={() => { if (window.innerWidth <= 768) closeSidebar(); }}
                  >
                    <Icon size={18} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.name}</span>
                    {item.badge && (
                      <span className={`${styles.badge} ${item.badgeColor === 'green' ? styles.badgeGreen : item.badgeColor === 'red' ? styles.badgeRed : ''}`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight size={14} className={styles.activeArrow} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer - User + Logout */}
        <div className={styles.footer}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>{userInfo.name.charAt(0)}</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userInfo.name}</p>
              <p className={styles.userSub}>{userInfo.sub}</p>
            </div>
            <div className={styles.onlineDot} />
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
