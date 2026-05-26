'use client';

import React, { useState } from 'react';
import DataTable from '../ui/DataTable';
import styles from './AttendanceTracker.module.css';
import { Save, CheckCircle, XCircle } from 'lucide-react';

// Mock student data
const initialStudents = [
  { id: '1', name: 'Emma Thompson', grade: '10th', studentId: 'ST-001' },
  { id: '2', name: 'James Wilson', grade: '10th', studentId: 'ST-002' },
  { id: '3', name: 'Sophia Martinez', grade: '10th', studentId: 'ST-003' },
  { id: '4', name: 'Oliver Brown', grade: '10th', studentId: 'ST-004' },
  { id: '5', name: 'Isabella Davis', grade: '10th', studentId: 'ST-005' },
  { id: '6', name: 'William Garcia', grade: '10th', studentId: 'ST-006' },
  { id: '7', name: 'Mia Rodriguez', grade: '10th', studentId: 'ST-007' },
];

export default function AttendanceTracker() {
  // Store attendance status for each student ('present', 'absent', or null if not marked yet)
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | null>>(() => {
    const initialState: Record<string, 'present' | 'absent' | null> = {};
    initialStudents.forEach(s => { initialState[s.id] = null; });
    return initialState;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleStatus = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status: 'present' | 'absent') => {
    setAttendance(prev => {
      const newState = { ...prev };
      initialStudents.forEach(s => { newState[s.id] = status; });
      return newState;
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { 
      key: 'name', 
      label: 'Name',
      render: (val: unknown) => (
        <div className={styles.nameCell}>
          <div className={styles.avatarSmall}>{(val as string).charAt(0)}</div>
          <span className={styles.nameText}>{val as string}</span>
        </div>
      )
    },
    { key: 'grade', label: 'Grade' },
    {
      key: 'status',
      label: 'Attendance Status',
      render: (_: unknown, row: Record<string, unknown>) => {
        const studentId = row.id as string;
        const currentStatus = attendance[studentId];
        
        return (
          <div className={styles.toggleGroup}>
            <button
              className={`${styles.toggleButton} ${styles.presentBtn} ${currentStatus === 'present' ? styles.activePresent : ''}`}
              onClick={() => toggleStatus(studentId, 'present')}
              title="Mark Present"
            >
              <CheckCircle size={18} />
              Present
            </button>
            <button
              className={`${styles.toggleButton} ${styles.absentBtn} ${currentStatus === 'absent' ? styles.activeAbsent : ''}`}
              onClick={() => toggleStatus(studentId, 'absent')}
              title="Mark Absent"
            >
              <XCircle size={18} />
              Absent
            </button>
          </div>
        );
      }
    }
  ];

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;
  const totalMarked = presentCount + absentCount;
  const totalStudents = initialStudents.length;

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h2 className={styles.title}>Today's Attendance</h2>
          <p className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className={styles.summaryStats}>
          <div className={styles.statBadge}>
            <span className={styles.statLabel}>Marked:</span>
            <span className={styles.statValue}>{totalMarked} / {totalStudents}</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statLabel}>Present:</span>
            <span className={`${styles.statValue} ${styles.textSuccess}`}>{presentCount}</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statLabel}>Absent:</span>
            <span className={`${styles.statValue} ${styles.textDanger}`}>{absentCount}</span>
          </div>
        </div>
      </div>

      <div className={styles.bulkActions}>
        <span className={styles.bulkLabel}>Bulk Actions:</span>
        <button className={`${styles.bulkBtn} ${styles.bulkPresent}`} onClick={() => markAll('present')}>
          Mark All Present
        </button>
        <button className={`${styles.bulkBtn} ${styles.bulkAbsent}`} onClick={() => markAll('absent')}>
          Mark All Absent
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <DataTable 
          columns={columns} 
          data={initialStudents} 
          hideActions={true}
          itemsPerPage={10}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.saveStatus}>
          {saveSuccess && <span className={styles.successMessage}>Attendance saved successfully!</span>}
        </div>
        <button 
          className={styles.saveButton} 
          onClick={handleSave}
          disabled={isSaving || totalMarked === 0}
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>
    </div>
  );
}
