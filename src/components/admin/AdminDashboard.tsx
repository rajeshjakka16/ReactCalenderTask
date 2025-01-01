import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { CompanyList } from './CompanyList';
import { CommunicationMethodList } from './CommunicationMethodList';
import { CompanyDialog } from './CompanyDialog';

export function AdminDashboard() {
  const [showAddCompany, setShowAddCompany] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Company Management</h2>
        <Button onClick={() => setShowAddCompany(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      <CompanyList />
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Communication Methods</h2>
        <CommunicationMethodList />
      </div>

      <CompanyDialog
        open={showAddCompany}
        onClose={() => setShowAddCompany(false)}
      />
    </div>
  );
}