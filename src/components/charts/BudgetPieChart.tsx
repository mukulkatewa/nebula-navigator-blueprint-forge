
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#AF19FF'];

const BudgetPieChart = ({ data }: { data: any }) => {
  const chartData = Object.entries(data)
    .filter(([, value]) => typeof value === 'number' && value > 0)
    .map(([key, value]) => ({ name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value: value as number }));

  if (chartData.length === 0) {
    return <p className="text-neutral-400">Not enough data to display a chart.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChart;
