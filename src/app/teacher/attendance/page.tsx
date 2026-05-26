'use client';

import React, { useState } from 'react';
import { MOCK_STUDENTS } from '@/lib/mockData';
import { CheckCircle, XCircle, Save } from 'lucide-react';
import styles from './attendance.module.css';

const CLASSES = ['10-A', '10-B', '11-A', '11-B'];

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [saved, setSaved] = useState(false);

  const classStudents = MOCK_STUDENTS.filter(s => `${s.grade.replace('th','')}-${s.section}` === selectedClass || selectedClass === '10-A');

  const toggle = (id: string) =>
    setAttendance(prev => ({ ...prev, [id]: prev[id] === 'absent' ? 'present' : 'absent' }));

  const getStatus = (id: string): 'present' | 'absent' => attendance[id] ?? 'present';

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const presentCount = classStudents.filter(s => getStatus(s.id) === 'present').length;
  const absentCount = classStudents.length - presentCount;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mark Attendance</h1>
          <p className={styles.sub}>Select class and date to mark attendance</p>
        </div>
        <button className={`${styles.saveBtn} ${saved ? styles.saveDone : ''}`} onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Attendance'}
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Class</label>
          <div className={styles.classTabs}>
            {CLASSES.map(c => (
              <button key={c} className={`${styles.classTab} ${selectedClass === c ? styles.classTabActive : ''}`} onClick={() => setSelectedClass(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className={styles.controlGroup}>
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className={styles.dateInput} max={new Date().toISOString().split('T')[0]} />
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statBit} style={{ color: 'var(--success)' }}><CheckCircle size={16} /> {presentCount} Present</div>
        <div className={styles.statBit} style={{ color: 'var(--danger)' }}><XCircle size={16} /> {absentCount} Absent</div>
        <div className={styles.statBit} style={{ color: 'var(--primary)' }}>Total: {classStudents.length}</div>
        <div className={styles.pct} style={{ color: Math.round((presentCount / classStudents.length) * 100) >= 85 ? 'var(--success)' : 'var(--warning)' }}>
          {Math.round((presentCount / classStudents.length) * 100)}% attendance
        </div>
        <div className={styles.bulkActions}>
          <button className={styles.bulkBtn} onClick={() => { const all: Record<string, 'present'> = {}; classStudents.forEach(s => { all[s.id] = 'present'; }); setAttendance(all); }}>Mark All Present</button>
          <button className={styles.bulkBtnDanger} onClick={() => { const all: Record<string, 'absent'> = {}; classStudents.forEach(s => { all[s.id] = 'absent'; }); setAttendance(all); }}>Mark All Absent</button>
        </div>
      </div>

      {/* Student Grid */}
      <div className={styles.studentGrid}>
        {classStudents.map(s => {
          const status = getStatus(s.id);
          return (
            <div
              key={s.id}
              className={`${styles.studentCard} ${status === 'absent' ? styles.cardAbsent : styles.cardPresent}`}
              onClick={() => toggle(s.id)}
            >
              <div className={styles.cardAvatar}>{s.name.charAt(0)}</div>
              <div className={styles.cardInfo}>
                <p className={styles.cardName}>{s.name}</p>
                <p className={styles.cardId}>{s.id}</p>
              </div>
              <div className={`${styles.cardStatus} ${status === 'present' ? styles.present : styles.absent}`}>
                {status === 'present' ? <CheckCircle size={18} /> : <XCircle size={18} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
