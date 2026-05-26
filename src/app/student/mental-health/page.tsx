'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  HeartPulse, Phone, AlertTriangle, Moon, Battery, 
  Smile, Send, BrainCircuit, Activity, CheckCircle, ChevronRight, TrendingUp 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './mental-health.module.css';
import { useRouter } from 'next/navigation';

const MOODS = [
  { emoji: '😔', label: 'Struggling' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😁', label: 'Great' },
];

const MOOD_DATA = [
  { day: 'Mon', score: 3 },
  { day: 'Tue', score: 4 },
  { day: 'Wed', score: 2 },
  { day: 'Thu', score: 3 },
  { day: 'Fri', score: 1 },
  { day: 'Sat', score: 3 },
  { day: 'Sun', score: 4 },
];

export default function StudentMentalHealthPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not senior
  React.useEffect(() => {
    if (user?.grade) {
      const isSenior = ['10th', '11th', '12th'].some(g => (user.grade as string).includes(g));
      if (!isSenior) router.push('/student/dashboard');
    }
  }, [user, router]);

  const [crisisDetected, setCrisisDetected] = useState(true);
  const [mood, setMood] = useState<string>('🙂');
  const [sleep, setSleep] = useState('7');
  const [energy, setEnergy] = useState('Medium');
  const [saved, setSaved] = useState(false);

  const handleSaveTracker = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}><HeartPulse size={28} style={{ color: 'var(--primary)' }} /> Mental Health & Wellbeing</h1>
          <p className={styles.sub}>Your private, safe space for emotional tracking and personalized support.</p>
        </div>
      </div>

      {/* Premium Crisis Banner */}
      {crisisDetected && (
        <div className={styles.crisisBanner}>
          <div className={styles.crisisIcon}><AlertTriangle size={22} /></div>
          <div className={styles.crisisContent}>
            <h3 className={styles.crisisTitle}>You don't have to face this alone.</h3>
            <p className={styles.crisisText}>
              We noticed you might be going through a tough time. Remember, reaching out is a sign of strength. Free, confidential, and professional support is available 24/7 right now.
            </p>
            <div className={styles.crisisActions}>
              <a href="tel:9152987821" className={`${styles.helpBtn} ${styles.helpBtnPrimary}`}><Phone size={14} /> iCall (TISS): 9152987821</a>
              <a href="tel:9999666555" className={`${styles.helpBtn} ${styles.helpBtnSecondary}`}><Phone size={14} /> Vandrevala: 999 966 6555</a>
              <button className={`${styles.helpBtn} ${styles.helpBtnSecondary}`} style={{ marginLeft: 'auto', border: 'none', background: 'transparent' }} onClick={() => setCrisisDetected(false)}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {/* Left Column: Tracking & Quizzes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Health Tracker */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Daily Check-In</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            
            <div className={styles.trackerGrid}>
              <div className={styles.trackItem}>
                <label className={styles.trackLabel}>How are you feeling?</label>
                <div className={styles.moodSelector}>
                  {MOODS.map(m => (
                    <button key={m.label} className={`${styles.moodBtn} ${mood === m.emoji ? styles.moodActive : ''}`} onClick={() => setMood(m.emoji)}>
                      <span>{m.emoji}</span>
                      <span className={styles.moodLabel}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.trackRow}>
                <div className={styles.trackItem}>
                  <label className={styles.trackLabel}>Sleep</label>
                  <div className={styles.trackInputWrap}>
                    <Moon size={16} className={styles.trackInputIcon} />
                    <input type="number" min="0" max="24" value={sleep} onChange={e => setSleep(e.target.value)} className={styles.trackInput} placeholder="Hrs" />
                  </div>
                </div>
                <div className={styles.trackItem}>
                  <label className={styles.trackLabel}>Energy</label>
                  <div className={styles.trackInputWrap}>
                    <Battery size={16} className={styles.trackInputIcon} />
                    <select value={energy} onChange={e => setEnergy(e.target.value)} className={styles.trackInput}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.saveBtn} onClick={handleSaveTracker}>
              {saved ? <><CheckCircle size={18} /> Logged Successfully!</> : 'Save Daily Log'}
            </button>
          </div>

          {/* Mood Overview Chart */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><TrendingUp size={18} style={{ color: 'var(--primary)' }} /> Mood Overview</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>This Week</span>
            </div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={MOOD_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 4]} ticks={[1,2,3,4]} tickFormatter={v => v === 1 ? '😔' : v === 2 ? '😐' : v === 3 ? '🙂' : '😁'} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assessments */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Clinical Assessments</h2>
            </div>
            <div className={styles.assessList}>
              {[
                { name: 'PHQ-9 Depression Screener', desc: 'A quick 9-question clinical check to understand your overall mood.', icon: Activity, color: 'var(--primary)' },
                { name: 'GAD-7 Anxiety Screener', desc: 'Evaluate your stress and anxiety levels over the past 2 weeks.', icon: HeartPulse, color: 'var(--warning)' },
                { name: 'Academic Burnout Check', desc: 'Find out if exam pressure is affecting your mental wellbeing.', icon: Battery, color: 'var(--danger)' }
              ].map((a, i) => (
                <div key={i} className={styles.assessItem}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `color-mix(in srgb, ${a.color} 15%, transparent)`, color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <a.icon size={20} />
                    </div>
                    <div className={styles.assessInfo}>
                      <h3>{a.name}</h3>
                      <p>{a.desc}</p>
                    </div>
                  </div>
                  <button className={styles.assessBtn}>Start <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Mind Twin */}
        <div className={`${styles.card} ${styles.twinCard}`}>
          <div className={styles.twinHeader}>
            <div className={styles.twinIcon}><BrainCircuit size={24} /></div>
            <div>
              <h2>Mind Twin AI</h2>
              <p><span className={styles.onlineDot}></span> Listening to you securely</p>
            </div>
          </div>
          <div className={styles.twinChatBox}>
            <div className={`${styles.chatMsg} ${styles.msgAi}`}>
              Hi Arjun. I see you logged feeling "Struggling" today, and your sleep has been under 6 hours this week. Do you want to talk about the upcoming board exams?
            </div>
            <div className={`${styles.chatMsg} ${styles.msgUser}`}>
              Honestly, I'm pretty stressed out. There's too much syllabus left. I don't know where to start.
            </div>
            <div className={`${styles.chatMsg} ${styles.msgAi}`}>
              It's completely normal to feel overwhelmed right now. Taking it one step at a time is key. Would you like to try a 2-minute breathing exercise, or should we break down your syllabus into smaller chunks?
            </div>
          </div>
          <div className={styles.chatInputWrap}>
            <div className={styles.chatInput}>
              <input type="text" placeholder="Type a message..." />
              <button className={styles.chatSend}><Send size={16} /></button>
            </div>
            <p className={styles.disclaimer}>
              Conversations are AI-powered and strictly confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
