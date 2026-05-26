import styles from './loading.module.css';

export default function DashboardLoading() {
  return (
    <div className={styles.loadingPage}>
      {/* Header Skeleton */}
      <div className={styles.headerSkeleton}>
        <div className={`skeleton ${styles.titleSkeleton}`} />
        <div className={`skeleton ${styles.subSkeleton}`} />
      </div>

      {/* Stats Skeleton */}
      <div className={styles.statsGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.statCard}>
            <div className={`skeleton ${styles.iconSkeleton}`} />
            <div className={styles.statText}>
              <div className={`skeleton ${styles.valueSkeleton}`} />
              <div className={`skeleton ${styles.labelSkeleton}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Card Skeletons */}
      <div className={styles.cardsGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={`skeleton ${styles.cardHeaderSkeleton}`} />
            <div className={`skeleton ${styles.cardBodySkeleton}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
