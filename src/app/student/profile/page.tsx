'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, MapPin, Calendar, BookOpen, TrendingUp, Award, GraduationCap } from 'lucide-react';
import { STUDENT_MARKS, PERFORMANCE_DATA } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './profile.module.css';

const SUBJECTS = [
  { name: 'Mathematics', grade: 'A', marks: 85, max: 100 },
  { name: 'Physics', grade: 'B+', marks: 78, max: 100 },
  { name: 'Chemistry', grade: 'A', marks: 82, max: 100 },
  { name: 'English', grade: 'A+', marks: 91, max: 100 },
  { name: 'History', grade: 'B', marks: 74, max: 100 },
];

export default function StudentProfilePage() {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      {/* Hero Card */}
      <div className={styles.heroCard}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.avatarLg}>{user?.name?.charAt(0) ?? 'A'}</div>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{user?.name ?? 'Arjun Kumar'}</h1>
            <p className={styles.heroRole}>Student · {user?.grade ?? '10th-A'} · Roll No. 01</p>
            <div className={styles.heroBadges}>
              <span className={styles.badge} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                <GraduationCap size={13} /> Academic Year 2024–25
              </span>
              <span className={styles.badge} style={{ background: 'rgba(34,197,94,0.2)', color: '#86efac' }}>
                ● Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Personal Info */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Personal Information</h2></div>
          <div className={styles.infoList}>
            {[
              { icon: Mail, label: 'Email', value: user?.email ?? 'arjun@nexus.edu' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Address', value: '24, MG Road, Bengaluru - 560001' },
              { icon: Calendar, label: 'Date of Birth', value: '14 March 2009' },
              { icon: BookOpen, label: 'Section', value: 'Grade 10 · Section A' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoRow}>
                <div className={styles.infoIconBox}><Icon size={16} /></div>
                <div>
                  <p className={styles.infoLabel}>{label}</p>
                  <p className={styles.infoValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Stats */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Academic Overview</h2></div>
          <div className={styles.statsGrid}>
            {[
              { label: 'GPA', value: '3.8', icon: TrendingUp, color: 'var(--primary)', bg: 'var(--primary-light)' },
              { label: 'Attendance', value: '92%', icon: Calendar, color: 'var(--success)', bg: 'var(--success-light)' },
              { label: 'Class Rank', value: '#12', icon: Award, color: 'var(--warning)', bg: 'var(--warning-light)' },
              { label: 'Subjects', value: '5', icon: BookOpen, color: 'var(--accent-violet)', bg: 'rgba(139,92,246,0.12)' },
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

          {/* Subject Grades */}
          <div className={styles.subjectList}>
            {SUBJECTS.map(s => (
              <div key={s.name} className={styles.subjectRow}>
                <span className={styles.subjectName}>{s.name}</span>
                <div className={styles.subjectBarWrap}>
                  <div className={styles.subjectBar}>
                    <div className={styles.subjectFill} style={{ width: `${s.marks}%`, background: s.marks >= 85 ? 'var(--success)' : s.marks >= 75 ? 'var(--primary)' : 'var(--warning)' }} />
                  </div>
                </div>
                <span className={styles.subjectMarks}>{s.marks}%</span>
                <span className={styles.subjectGrade}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}><h2>Performance Trend</h2><span className={styles.chip}>Last 6 months</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={STUDENT_MARKS} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="marks" stroke="var(--primary)" strokeWidth={2.5} fill="url(#pg)" dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Parent Info */}
        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}><h2>Parent / Guardian Details</h2></div>
          <div className={styles.parentGrid}>
            {[
              { role: 'Father', name: 'Ramesh Kumar', phone: '+91 99887 76655', email: 'ramesh@gmail.com' },
              { role: 'Mother', name: 'Sunita Kumar', phone: '+91 98765 12345', email: 'sunita@gmail.com' },
            ].map(p => (
              <div key={p.role} className={styles.parentCard}>
                <div className={styles.parentAvatar}>{p.name.charAt(0)}</div>
                <div>
                  <p className={styles.parentRole}>{p.role}</p>
                  <p className={styles.parentName}>{p.name}</p>
                  <p className={styles.parentContact}><Phone size={12} /> {p.phone}</p>
                  <p className={styles.parentContact}><Mail size={12} /> {p.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
