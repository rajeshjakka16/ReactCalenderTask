import React, { useState } from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { CompanyGrid } from './CompanyGrid';
import { NotificationPanel } from './NotificationPanel';
import { CalendarView } from './CalendarView';
import { CommunicationDialog } from './CommunicationDialog';
import { useAppStore } from '../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function UserDashboard() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCommunicationDialog, setShowCommunicationDialog] = useState(false);
  const companies = useAppStore((state) => state.companies);

  const selectedCompanyObjects = companies.filter(c => selectedCompanies.includes(c.id));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Communication Dashboard</h2>
        <Button
          onClick={() => setShowCommunicationDialog(true)}
          disabled={selectedCompanies.length === 0}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Log Communication
        </Button>
      </div>
      
      <NotificationPanel />

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Company Grid</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <CompanyGrid
            selectedCompanies={selectedCompanies}
            onSelectionChange={setSelectedCompanies}
          />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
      </Tabs>

      <CommunicationDialog
        companies={selectedCompanyObjects}
        open={showCommunicationDialog}
        onClose={() => setShowCommunicationDialog(false)}
      />
    </div>
  );
}