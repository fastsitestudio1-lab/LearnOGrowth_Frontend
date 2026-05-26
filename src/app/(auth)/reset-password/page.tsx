'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import styles from '../auth.module.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const router = useRouter();

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Medium', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e'][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authIcon} style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
          <Lock size={28} />
        </div>
        {done ? (
          <div className={styles.successState}>
            <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
            <h2>Password Updated!</h2>
            <p>Redirecting you to login...</p>
          </div>
        ) : (
          <>
            <h1 className={styles.authTitle}>Reset Password</h1>
            <p className={styles.authSubtitle}>Create a new secure password for your account.</p>
            {error && <div className={styles.errorAlert}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.fieldGroup}>
                <label>New Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                  />
                  <button type="button" className={styles.eyeToggle} onClick={() => setShowPwd(p => !p)}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password && (
                  <div className={styles.strengthBar}>
                    <div className={styles.strengthFill} style={{ width: `${(strength/3)*100}%`, background: strengthColor }} />
                    <span style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
              </div>
              <div className={styles.fieldGroup}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
              </div>
              <button type="submit" className={styles.primaryBtn} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Update Password'}
              </button>
            </form>
          </>
        )}
        {!done && (
          <Link href="/login" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        )}
      </div>
    </div>
  );
}
