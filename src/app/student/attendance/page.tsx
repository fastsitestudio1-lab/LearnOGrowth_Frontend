'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import styles from './attendance.module.css';

const MONTHS = ['June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'];

type AttDay = 'present' | 'absent' | 'holiday' | 'weekend';

function generateAttendance(): Record<string, AttDay> {
  const record: Record<string, AttDay> = {};
  const start = new Date('2024-06-01');
  const end = new Date('2025-05-31');
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split('T')[0];
    const day = d.getDay();
    if (day === 0 || day === 6) { record[key] = 'weekend'; continue; }
    const rand = Math.random();
    record[key] = rand > 0.09 ? 'present' : rand > 0.04 ? 'absent' : 'holiday';
  }
  return record;
}

const ATTENDANCE = generateAttendance();

const SUBJECT_ATT = [
  { subject: 'Mathematics', present: 42, total: 46, pct: 91 },
  { subject: 'Physics', present: 38, total: 46, pct: 83 },
  { subject: 'Chemistry', present: 44, total: 46, pct: 96 },
  { subject: 'English', present: 45, total: 46, pct: 98 },
  { subject: 'History', present: 36, total: 46, pct: 78 },
];

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function StudentAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState(11); // May = index 11

  const calendarDays = useMemo(() => {
    const monthIdx = selectedMonth < 7 ? selectedMonth + 5 : selectedMonth - 7;
    const year = monthIdx <= 5 ? 2025 : 2024;
    const month = monthIdx;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { date: string | null; status: AttDay | null }[] = [];
    for (let i = 0; i < firstDay; i++) days.push({ date: null, status: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ date: key, status: ATTENDANCE[key] ?? null });
    }
    return days;
  }, [selectedMonth]);

  const totalPresent = Object.values(ATTENDANCE).filter(v => v === 'present').length;
  const totalAbsent = Object.values(ATTENDANCE).filter(v => v === 'absent').length;
  const totalDays = totalPresent + totalAbsent;
  const pct = Math.round((totalPresent / totalDays) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Attendance</h1>
          <p className={styles.sub}>Academic Year 2024–25</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className={styles.kpiRow}>
        {[
          { label: 'Overall Attendance', value: `${pct}%`, icon: TrendingUp, color: pct >= 85 ? 'var(--success)' : 'var(--warning)', bg: pct >= 85 ? 'var(--success-light)' : 'var(--warning-light)' },
          { label: 'Days Present', value: totalPresent, icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-light)' },
          { label: 'Days Absent', value: totalAbsent, icon: XCircle, color: 'var(--danger)', bg: 'var(--danger-light)' },
          { label: 'Working Days', value: totalDays, icon: Calendar, color: 'var(--primary)', bg: 'var(--primary-light)' },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiIcon} style={{ background: k.bg, color: k.color }}><Icon size={20} /></div>
              <div>
                <p className={styles.kpiValue} style={{ color: k.color }}>{k.value}</p>
                <p className={styles.kpiLabel}>{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.contentGrid}>
        {/* Calendar */}
        <div className={styles.card}>
          <div className={styles.calHeader}>
            <h2>Calendar View</h2>
            <select className={styles.monthSelect} value={selectedMonth} onChange={e => setSelectedMonth(+e.target.value)}>
              {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
          </div>
          <div className={styles.dayLabels}>
            {DAY_LABELS.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className={styles.calGrid}>
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`${styles.calDay} ${day.status ? styles[`day_${day.status}`] : styles.dayEmpty}`}
                title={day.date ?? ''}
              >
                {day.date ? new Date(day.date).getDate() : ''}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className={styles.legend}>
            {[
              { label: 'Present', cls: 'day_present' },
              { label: 'Absent', cls: 'day_absent' },
              { label: 'Holiday', cls: 'day_holiday' },
              { label: 'Weekend', cls: 'day_weekend' },
            ].map(l => (
              <div key={l.label} className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles[l.cls]}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject-wise */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h2>Subject-wise Attendance</h2></div>
          <div className={styles.subjectList}>
            {SUBJECT_ATT.map(s => (
              <div key={s.subject} className={styles.subjectRow}>
                <div className={styles.subjectTop}>
                  <span className={styles.subjectName}>{s.subject}</span>
                  <span className={styles.subjectPct} style={{ color: s.pct >= 85 ? 'var(--success)' : s.pct >= 75 ? 'var(--warning)' : 'var(--danger)' }}>
                    {s.pct}%
                  </span>
                </div>
                <div className={styles.subjectBar}>
                  <div
                    className={styles.subjectFill}
                    style={{
                      width: `${s.pct}%`,
                      background: s.pct >= 85 ? 'var(--success)' : s.pct >= 75 ? 'var(--warning)' : 'var(--danger)'
                    }}
                  />
                </div>
                <p className={styles.subjectMeta}>{s.present}/{s.total} classes attended</p>
                {s.pct < 75 && (
                  <div className={styles.warningTag}>
                    <AlertCircle size={12} /> Below minimum 75% — at risk!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
