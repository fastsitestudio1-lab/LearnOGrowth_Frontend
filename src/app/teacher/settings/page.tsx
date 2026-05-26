'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Bell, Shield, User, Lock, Save, BookOpen } from 'lucide-react';
import styles from './settings.module.css';

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className={`${styles.toggle} ${on ? styles.toggleOn : ''}`} onClick={() => onChange(!on)}>
      <span className={styles.knob} />
    </button>
  );
}

export default function TeacherSettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [toggles, setToggles] = useState({ notif_leave: true, notif_submit: true, notif_admin: true, priv_profile: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.sub}>Manage your faculty profile and preferences</p>
        </div>
        <button className={`${styles.saveBtn} ${saved ? styles.saveBtnDone : ''}`} onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className={styles.sections}>
        {/* Profile */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><User size={18} /><h2>Professional Profile</h2></div>
          <div className={styles.profileArea}>
            <div className={styles.avatarLg}>{user?.name?.charAt(0) ?? 'A'}</div>
            <div className={styles.fields}>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label>Full Name</label><input type="text" defaultValue={user?.name ?? ''} className={styles.input} /></div>
                <div className={styles.field}><label>Email</label><input type="email" defaultValue={user?.email ?? ''} className={styles.input} /></div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label>Department</label><input type="text" defaultValue={user?.department ?? 'Science'} className={styles.input} /></div>
                <div className={styles.field}><label>Employee ID</label><input type="text" defaultValue="EMP-001" className={styles.input} readOnly /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><Sun size={18} /><h2>Appearance</h2></div>
          <div className={styles.card}>
            <div className={styles.row}>
              <div><p className={styles.rowLabel}>Theme</p><p className={styles.rowSub}>Switch between light and dark mode</p></div>
              <button className={styles.themeBtn} onClick={toggleTheme}>
                {theme === 'light' ? <><Moon size={15} /> Dark</> : <><Sun size={15} /> Light</>}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><Bell size={18} /><h2>Notification Preferences</h2></div>
          <div className={styles.card}>
            {[
              { id: 'notif_leave', label: 'Leave Requests', sub: 'Alerts when students apply for leave' },
              { id: 'notif_submit', label: 'Assignment Submissions', sub: 'Notify when students submit assignments' },
              { id: 'notif_admin', label: 'Admin Announcements', sub: 'Important school-wide announcements' },
            ].map(s => (
              <div key={s.id} className={styles.row}>
                <div><p className={styles.rowLabel}>{s.label}</p><p className={styles.rowSub}>{s.sub}</p></div>
                <Toggle on={toggles[s.id as keyof typeof toggles]} onChange={v => setToggles(p => ({ ...p, [s.id]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><Shield size={18} /><h2>Privacy & Security</h2></div>
          <div className={styles.card}>
            <div className={styles.row}>
              <div><p className={styles.rowLabel}>Public Profile</p><p className={styles.rowSub}>Allow students to see your contact info</p></div>
              <Toggle on={toggles.priv_profile} onChange={v => setToggles(p => ({ ...p, priv_profile: v }))} />
            </div>
            <div className={styles.row}>
              <div><p className={styles.rowLabel}>Change Password</p><p className={styles.rowSub}>Update your account password</p></div>
              <button className={styles.changeBtn}><Lock size={14} /> Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
