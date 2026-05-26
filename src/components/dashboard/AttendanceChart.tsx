'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', attendance: 95 },
  { name: 'Tue', attendance: 98 },
  { name: 'Wed', attendance: 92 },
  { name: 'Thu', attendance: 99 },
  { name: 'Fri', attendance: 88 },
];

export default function AttendanceChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="name" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            itemStyle={{ color: 'var(--primary-color)' }}
          />
          <Line type="monotone" dataKey="attendance" stroke="var(--primary-color)" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
