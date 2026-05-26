'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types';
import { LogIn, GraduationCap, Users, ShieldCheck, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import styles from './LoginForm.module.css';

const ROLES: { id: Role; label: string; icon: React.ComponentType<{size?:number}>; desc: string; color: string }[] = [
  { id: 'student', label: 'Student', icon: GraduationCap, desc: 'Access your dashboard, assignments & attendance', color: '#6366f1' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, desc: 'Manage classes, mark attendance & review submissions', color: '#10b981' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'Full school management & analytics access', color: '#f59e0b' },
];

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    login(selectedRole, email);
    setIsLoading(false);
  };

  const selectedRoleData = ROLES.find(r => r.id === selectedRole)!;

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>N</div>
          <span className={styles.brandName}>Student Nexus</span>
        </div>
        <div className={styles.heroText}>
          <h1>Empowering Education,<br />One Dashboard<br />at a Time.</h1>
          <p>A unified platform for students, teachers, and administrators to collaborate, track progress, and achieve excellence.</p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statItem}><strong>1,245</strong><span>Students</span></div>
          <div className={styles.statItem}><strong>48</strong><span>Teachers</span></div>
          <div className={styles.statItem}><strong>94%</strong><span>Attendance</span></div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          {/* Role Selector */}
          <div className={styles.roleGrid}>
            {ROLES.map(role => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  className={`${styles.roleCard} ${selectedRole === role.id ? styles.roleCardActive : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                  style={{ '--role-color': role.color } as React.CSSProperties}
                >
                  <Icon size={20} />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>

          <p className={styles.roleDesc}>{selectedRoleData.desc}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.errorAlert}>{error}</div>}

            <div className={styles.fieldGroup}>
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={`e.g. ${selectedRole === 'teacher' ? 'anita' : selectedRole === 'admin' ? 'admin' : 'arjun'}@nexus.edu`}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="login-password">Password</label>
                <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div className={styles.passwordWrapper}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button type="button" className={styles.eyeToggle} onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In as {selectedRoleData.label}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          <button
            type="button"
            className={styles.ssoBtn}
            onClick={() => login(selectedRole)}
          >
            <Users size={18} />
            Continue with SSO
          </button>

          <p className={styles.hint}>
            Demo: Enter any email + password. Role determines your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
