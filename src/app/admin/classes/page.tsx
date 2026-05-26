'use client';

import React from 'react';
import { MOCK_STUDENTS, MOCK_TEACHERS } from '@/lib/mockData';
import { BookOpen, Users, GraduationCap } from 'lucide-react';
import styles from './classes.module.css';

const CLASSES = [
  { id: 'C-001', grade: '9th', section: 'A', classTeacher: 'Ms. Lakshmi Krishnan', subject: 'English', strength: 40, room: '101' },
  { id: 'C-002', grade: '10th', section: 'A', classTeacher: 'Dr. Anita Desai', subject: 'Mathematics', strength: 42, room: '102' },
  { id: 'C-003', grade: '10th', section: 'B', classTeacher: 'Prof. Ravi Shankar', subject: 'Physics', strength: 38, room: '103' },
  { id: 'C-004', grade: '11th', section: 'A', classTeacher: 'Mr. Subramaniam', subject: 'Chemistry', strength: 35, room: '201' },
  { id: 'C-005', grade: '11th', section: 'B', classTeacher: 'Dr. Anita Desai', subject: 'Mathematics', strength: 36, room: '202' },
  { id: 'C-006', grade: '12th', section: 'A', classTeacher: 'Prof. Ravi Shankar', subject: 'Physics', strength: 30, room: '203' },
  { id: 'C-007', grade: '12th', section: 'B', classTeacher: 'Ms. Lakshmi Krishnan', subject: 'English', strength: 32, room: '204' },
];

const GRADE_COLORS: Record<string, string> = {
  '9th': '#6366f1', '10th': '#10b981', '11th': '#f59e0b', '12th': '#ef4444',
};

export default function AdminClassesPage() {
  const totalStrength = CLASSES.reduce((a, c) => a + c.strength, 0);
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Class Management</h1>
          <p className={styles.sub}>{CLASSES.length} classes · {totalStrength} total students</p>
        </div>
        <button className={styles.addBtn}><BookOpen size={16} /> Add Class</button>
      </div>

      <div className={styles.gradeRow}>
        {['9th', '10th', '11th', '12th'].map(grade => {
          const cls = CLASSES.filter(c => c.grade === grade);
          const str = cls.reduce((a, c) => a + c.strength, 0);
          const color = GRADE_COLORS[grade];
          return (
            <div key={grade} className={styles.gradeCard} style={{ borderColor: color }}>
              <div className={styles.gradeHeader} style={{ background: `${color}18`, color }}>
                <GraduationCap size={18} /><span>{grade} Grade</span>
              </div>
              <div className={styles.gradeStats}>
                <div className={styles.gradeStat}>
                  <span className={styles.gradeStatValue} style={{ color }}>{cls.length}</span>
                  <span className={styles.gradeStatLabel}>Sections</span>
                </div>
                <div className={styles.gradeStat}>
                  <span className={styles.gradeStatValue}>{str}</span>
                  <span className={styles.gradeStatLabel}>Students</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class</th><th>Class Teacher</th><th>Subject</th>
                <th>Room</th><th>Strength</th><th>Occupancy</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {CLASSES.map(cls => {
                const color = GRADE_COLORS[cls.grade] ?? '#6366f1';
                const occupancy = Math.round((cls.strength / 45) * 100);
                return (
                  <tr key={cls.id}>
                    <td>
                      <span className={styles.classBadge} style={{ background: `${color}18`, color }}>
                        {cls.grade}-{cls.section}
                      </span>
                    </td>
                    <td>
                      <div className={styles.teacherCell}>
                        <div className={styles.teacherAvatar}>{cls.classTeacher.charAt(0)}</div>
                        <span>{cls.classTeacher}</span>
                      </div>
                    </td>
                    <td>{cls.subject}</td>
                    <td><span className={styles.roomBadge}>Room {cls.room}</span></td>
                    <td>
                      <div className={styles.strengthCell}><Users size={14} /><span>{cls.strength}</span></div>
                    </td>
                    <td>
                      <div className={styles.occCell}>
                        <div className={styles.occBar}>
                          <div className={styles.occFill} style={{ width: `${occupancy}%`, background: occupancy >= 90 ? 'var(--danger)' : occupancy >= 75 ? 'var(--warning)' : 'var(--success)' }} />
                        </div>
                        <span>{occupancy}%</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.viewBtn}>View</button>
                        <button className={styles.editBtn}>Edit</button>
                      </div>
                    </td>
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
