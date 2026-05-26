'use client';

import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <SideNav isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <div className={styles.main}>
        <TopNav toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
