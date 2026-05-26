'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Bell, Shield, Globe, Palette, Save, User, Lock } from 'lucide-react';
import styles from './settings.module.css';

type SettingToggle = {
  id: string;
  label: string;
  description: string;
  defaultValue: boolean;
};

const NOTIFICATION_SETTINGS: SettingToggle[] = [
  { id: 'notif_leave', label: 'Leave Requests', description: 'Get notified when students submit leave requests', defaultValue: true },
  { id: 'notif_fee', label: 'Fee Alerts', description: 'Alerts for overdue or pending fee payments', defaultValue: true },
  { id: 'notif_attendance', label: 'Attendance Reports', description: 'Daily attendance summary notifications', defaultValue: false },
  { id: 'notif_exam', label: 'Exam Announcements', description: 'Notifications for exam schedule changes', defaultValue: true },
];

const PRIVACY_SETTINGS: SettingToggle[] = [
  { id: 'priv_profile', label: 'Public Profile', description: 'Allow staff to see your profile information', defaultValue: true },
  { id: 'priv_activity', label: 'Activity Status', description: 'Show when you are online', defaultValue: false },
  { id: 'priv_analytics', label: 'Usage Analytics', description: 'Share anonymous usage data to improve the platform', defaultValue: true },
];

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={`${styles.toggle} ${enabled ? styles.toggleOn : ''}`}
      onClick={() => onChange(!enabled)}
      role="switch"
      aria-checked={enabled}
    >
      <span className={styles.toggleKnob} />
    </button>
  );
}

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifToggles, setNotifToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_SETTINGS.map(s => [s.id, s.defaultValue]))
  );
  const [privToggles, setPrivToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(PRIVACY_SETTINGS.map(s => [s.id, s.defaultValue]))
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.sub}>Manage your account preferences and platform settings</p>
        </div>
        <button className={`${styles.saveBtn} ${saved ? styles.saveBtnSuccess : ''}`} onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className={styles.settingsGrid}>
        {/* Profile Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <User size={18} />
            <h2>Profile Information</h2>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>{user?.name?.charAt(0) ?? 'A'}</div>
            <div className={styles.profileFields}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input type="text" defaultValue={user?.name ?? ''} className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <input type="email" defaultValue={user?.email ?? ''} className={styles.input} />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Role</label>
                  <input type="text" defaultValue={user?.role ?? ''} className={styles.input} readOnly />
                </div>
                <div className={styles.field}>
                  <label>Department</label>
                  <input type="text" defaultValue={user?.department ?? 'Administration'} className={styles.input} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Palette size={18} />
            <h2>Appearance</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingLabel}>Theme</p>
                <p className={styles.settingDesc}>Switch between light and dark mode</p>
              </div>
              <button className={styles.themeBtn} onClick={toggleTheme}>
                {theme === 'light' ? <><Moon size={16} /> Dark Mode</> : <><Sun size={16} /> Light Mode</>}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Bell size={18} />
            <h2>Notifications</h2>
          </div>
          <div className={styles.card}>
            {NOTIFICATION_SETTINGS.map(s => (
              <div key={s.id} className={styles.settingRow}>
                <div>
                  <p className={styles.settingLabel}>{s.label}</p>
                  <p className={styles.settingDesc}>{s.description}</p>
                </div>
                <ToggleSwitch
                  enabled={notifToggles[s.id]}
                  onChange={v => setNotifToggles(prev => ({ ...prev, [s.id]: v }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={18} />
            <h2>Privacy & Security</h2>
          </div>
          <div className={styles.card}>
            {PRIVACY_SETTINGS.map(s => (
              <div key={s.id} className={styles.settingRow}>
                <div>
                  <p className={styles.settingLabel}>{s.label}</p>
                  <p className={styles.settingDesc}>{s.description}</p>
                </div>
                <ToggleSwitch
                  enabled={privToggles[s.id]}
                  onChange={v => setPrivToggles(prev => ({ ...prev, [s.id]: v }))}
                />
              </div>
            ))}
            <div className={styles.settingRow}>
              <div>
                <p className={styles.settingLabel}>Change Password</p>
                <p className={styles.settingDesc}>Update your account password</p>
              </div>
              <button className={styles.changePwdBtn}><Lock size={14} /> Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
