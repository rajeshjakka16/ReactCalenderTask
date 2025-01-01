import React from 'react';
import { useAppStore } from '../../store';
import { formatDate } from '../../lib/utils';

export function NotificationPanel() {
  const companies = useAppStore((state) => state.companies);
  const today = new Date();

  const overdueCompanies = companies.filter(
    company => company.nextCommunication && company.nextCommunication < today
  );

  const dueTodayCompanies = companies.filter(company => 
    company.nextCommunication && 
    formatDate(company.nextCommunication) === formatDate(today)
  );

  if (overdueCompanies.length === 0 && dueTodayCompanies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {overdueCompanies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium mb-2">Overdue Communications</h3>
          <ul className="space-y-2">
            {overdueCompanies.map(company => (
              <li key={company.id} className="text-red-700">
                {company.name} - Due {formatDate(company.nextCommunication!)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {dueTodayCompanies.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium mb-2">Due Today</h3>
          <ul className="space-y-2">
            {dueTodayCompanies.map(company => (
              <li key={company.id} className="text-yellow-700">
                {company.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}