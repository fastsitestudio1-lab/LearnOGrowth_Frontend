'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import styles from '../auth.module.css';

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setError('');
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    // Demo: any 6-digit code works
    router.push('/reset-password');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
          <ShieldCheck size={28} />
        </div>
        <h1 className={styles.authTitle}>OTP Verification</h1>
        <p className={styles.authSubtitle}>Enter the 6-digit code sent to your email address.</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <div className={styles.otpGrid}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { inputs.current[idx] = el; }}
              className={styles.otpInput}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
            />
          ))}
        </div>

        <button className={styles.primaryBtn} onClick={handleVerify} disabled={loading}>
          {loading ? <span className={styles.spinner} /> : 'Verify OTP'}
        </button>

        <p className={styles.resendHint}>
          Didn't receive a code? <button className={styles.resendBtn} onClick={() => setOtp(['','','','','',''])}>Resend OTP</button>
        </p>

        <Link href="/forgot-password" className={styles.backLink}>
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
    </div>
  );
}
