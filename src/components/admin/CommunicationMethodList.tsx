import React from 'react';
import { useAppStore } from '../../store';
import { Button } from '../ui/button';

export function CommunicationMethodList() {
  const methods = useAppStore((state) => state.communicationMethods);
  const updateMethod = useAppStore((state) => state.updateCommunicationMethod);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sequence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mandatory
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {methods.map((method) => (
              <tr key={method.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {method.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {method.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {method.sequence}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant={method.isMandatory ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      updateMethod(method.id, {
                        isMandatory: !method.isMandatory,
                      })
                    }
                  >
                    {method.isMandatory ? 'Required' : 'Optional'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}