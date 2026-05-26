'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import styles from './FilterBar.module.css';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  filters: {
    label: string;
    options: FilterOption[];
    onFilterChange: (value: string) => void;
  }[];
}

export default function FilterBar({ onSearchChange, filters }: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <Search size={18} className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.filtersWrapper}>
        <Filter size={18} className={styles.filterIcon} />
        {filters.map((filter, index) => (
          <select 
            key={index} 
            className={styles.selectInput}
            onChange={(e) => filter.onFilterChange(e.target.value)}
            aria-label={filter.label}
          >
            <option value="">{filter.label}</option>
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}
