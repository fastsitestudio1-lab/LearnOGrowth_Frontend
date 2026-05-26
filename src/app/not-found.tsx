import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.sub}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className={styles.homeBtn}>
          ← Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
