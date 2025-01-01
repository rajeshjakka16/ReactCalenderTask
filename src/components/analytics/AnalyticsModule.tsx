import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppStore } from '../../store';

export function AnalyticsModule() {
  const communications = useAppStore((state) => state.communications);
  const methods = useAppStore((state) => state.communicationMethods);

  const communicationsByMethod = methods.map(method => ({
    name: method.name,
    count: communications.filter(c => c.methodId === method.id).length,
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Communication Frequency</h3>
        <div className="h-[400px]">
          <BarChart
            width={800}
            height={400}
            data={communicationsByMethod}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" name="Number of Communications" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}