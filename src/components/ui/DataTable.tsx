'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import styles from './DataTable.module.css';
import Link from 'next/link';

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  itemsPerPage?: number;
  rowLinkPrefix?: string;
  hideActions?: boolean;
}

export default function DataTable({ columns, data, itemsPerPage = 10, rowLinkPrefix, hideActions = false }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
              {!hideActions && <th className={styles.actionsCell}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] as React.ReactNode}
                  </td>
                ))}
                {!hideActions && (
                  <td className={styles.actionsCell}>
                    {rowLinkPrefix ? (
                      <Link href={`${rowLinkPrefix}/${row.id}`} className={styles.actionButton}>
                        <MoreHorizontal size={18} />
                      </Link>
                    ) : (
                      <button className={styles.actionButton}><MoreHorizontal size={18} /></button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className={styles.pageControls}>
            <button 
              className={styles.pageButton} 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className={styles.pageButton} 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
