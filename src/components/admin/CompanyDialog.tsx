import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/button';
import { CompanyForm } from './CompanyForm';
import type { Company } from '../../types';

interface CompanyDialogProps {
  companyId?: string | null;
  open: boolean;
  onClose: () => void;
}

export function CompanyDialog({ companyId, open, onClose }: CompanyDialogProps) {
  const companies = useAppStore((state) => state.companies);
  const company = companies.find((c) => c.id === companyId);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-semibold">
              {company ? 'Edit Company' : 'Add Company'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>
          <CompanyForm company={company} onClose={onClose} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}