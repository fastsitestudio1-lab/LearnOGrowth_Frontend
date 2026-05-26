import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
}

export default function ProgressBar({ progress, label, color = 'var(--primary-color)' }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={styles.container}>
      {label && (
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
          <span className={styles.percentage}>{clampedProgress}%</span>
        </div>
      )}
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${clampedProgress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
