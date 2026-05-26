'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CalendarWidget.module.css';

export default function CalendarWidget() {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentDay = 18;

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton}><ChevronLeft size={16} /></button>
        <h3 className={styles.month}>May 2026</h3>
        <button className={styles.navButton}><ChevronRight size={16} /></button>
      </div>
      <div className={styles.grid}>
        {days.map(day => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
        {dates.map(date => (
          <div 
            key={date} 
            className={`${styles.date} ${date === currentDay ? styles.today : ''}`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}
