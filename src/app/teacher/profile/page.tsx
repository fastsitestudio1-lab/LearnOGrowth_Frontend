'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, Users, BookOpen, Calendar, Award, BarChart2 } from 'lucide-react';
import { PERFORMANCE_DATA, ATTENDANCE_WEEKLY } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './profile.module.css';

export default function TeacherProfilePage() {
  const { user } = useAuth();
  return (
    <div className={styles.page}>
      <div className={styles.heroCard}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.avatarLg}>{user?.name?.charAt(0) ?? 'A'}</div>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{user?.name ?? 'Dr. Anita Desai'}</h1>
            <p className={styles.heroRole}>{user?.subject ?? 'Mathematics'} · {user?.department ?? 'Science'} Department</p>
            <div className={styles.heroBadges}>
              <span className={styles.badge} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Employee ID: EMP-001</span>
              <span className={styles.badge} style={{ background: 'rgba(34,197,94,0.2)', color: '#86efac' }}>● Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Contact & Details</h2></div>
          <div className={styles.infoList}>
            {[
              { icon: Mail, label: 'Email', value: user?.email ?? 'anita@nexus.edu' },
              { icon: Phone, label: 'Phone', value: '+91 98765 11111' },
              { icon: BookOpen, label: 'Subject', value: user?.subject ?? 'Mathematics' },
              { icon: Users, label: 'Department', value: user?.department ?? 'Science' },
              { icon: Calendar, label: 'Joined', value: 'June 2018' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoRow}>
                <div className={styles.infoIconBox}><Icon size={16} /></div>
                <div><p className={styles.infoLabel}>{label}</p><p className={styles.infoValue}>{value}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Teaching Overview</h2></div>
          <div className={styles.statsGrid}>
            {[
              { label: 'Classes', value: '4', icon: BookOpen, color: 'var(--primary)', bg: 'var(--primary-light)' },
              { label: 'Students', value: '120', icon: Users, color: 'var(--success)', bg: 'var(--success-light)' },
              { label: 'Experience', value: '7 yrs', icon: Award, color: 'var(--warning)', bg: 'var(--warning-light)' },
              { label: 'Tests Set', value: '42', icon: BarChart2, color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className={styles.statBox} style={{ background: s.bg }}>
                  <Icon size={20} style={{ color: s.color }} />
                  <p className={styles.statBoxValue} style={{ color: s.color }}>{s.value}</p>
                  <p className={styles.statBoxLabel}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}><h2>Class Performance Trend</h2><span className={styles.chip}>Subject avg</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PERFORMANCE_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} name="Class Avg" />
              <Line type="monotone" dataKey="class" stroke="var(--secondary)" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3 }} name="School Avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
