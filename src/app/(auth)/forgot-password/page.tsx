'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import styles from '../auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authIcon} style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
          <Mail size={28} />
        </div>
        {!sent ? (
          <>
            <h1 className={styles.authTitle}>Forgot Password?</h1>
            <p className={styles.authSubtitle}>Enter your email address and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.fieldGroup}>
                <label htmlFor="fp-email">Email Address</label>
                <input
                  id="fp-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@nexus.edu"
                  required
                />
              </div>
              <button type="submit" className={styles.primaryBtn} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : <><Send size={16} /> Send Reset Link</>}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successCheck}>✓</div>
            <h2>Check your inbox</h2>
            <p>We sent a reset link to <strong>{email}</strong>. Check your email and follow the instructions.</p>
            <Link href="/otp-verify" className={styles.primaryBtn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              Enter OTP →
            </Link>
          </div>
        )}
        <Link href="/login" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
