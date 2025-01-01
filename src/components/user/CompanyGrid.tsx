import React from 'react';
import { useAppStore } from '../../store';
import { formatDate, cn } from '../../lib/utils';
import { Tooltip } from '../ui/tooltip';
import { Checkbox } from '../ui/checkbox';

interface CompanyGridProps {
  selectedCompanies: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function CompanyGrid({ selectedCompanies, onSelectionChange }: CompanyGridProps) {
  const companies = useAppStore((state) => state.companies);
  const communications = useAppStore((state) => state.communications);
  const methods = useAppStore((state) => state.communicationMethods);

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter(comm => comm.companyId === companyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
      .map(comm => ({
        ...comm,
        method: methods.find(m => m.id === comm.methodId)?.name
      }));
  };

  const handleCompanySelect = (companyId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedCompanies, companyId]);
    } else {
      onSelectionChange(selectedCompanies.filter(id => id !== companyId));
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Communications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Due
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => {
              const lastComms = getLastFiveCommunications(company.id);
              const isOverdue = company.nextCommunication && new Date() > company.nextCommunication;
              const isDueToday = company.nextCommunication && 
                formatDate(new Date()) === formatDate(company.nextCommunication);

              return (
                <tr 
                  key={company.id}
                  className={cn(
                    isOverdue && "bg-red-50",
                    isDueToday && "bg-yellow-50"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedCompanies.includes(company.id)}
                      onCheckedChange={(checked) => 
                        handleCompanySelect(company.id, checked as boolean)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {company.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {company.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {lastComms.map((comm, idx) => (
                        <Tooltip key={idx} content={comm.notes || "No notes"}>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {comm.method}
                            <span className="ml-1 text-blue-500">
                              {formatDate(comm.date)}
                            </span>
                          </span>
                        </Tooltip>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.nextCommunication ? (
                      formatDate(company.nextCommunication)
                    ) : (
                      "Not scheduled"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}