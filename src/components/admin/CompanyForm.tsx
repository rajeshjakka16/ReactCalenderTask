import React from 'react';
import { useAppStore } from '../../store';
import { Button } from '../ui/button';
import type { Company } from '../../types';

interface CompanyFormProps {
  company?: Company;
  onClose: () => void;
}

export function CompanyForm({ company, onClose }: CompanyFormProps) {
  const addCompany = useAppStore((state) => state.addCompany);
  const updateCompany = useAppStore((state) => state.updateCompany);
  const [emails, setEmails] = React.useState<string[]>(company?.emails || ['']);
  const [phones, setPhones] = React.useState<string[]>(company?.phoneNumbers || ['']);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const companyData = {
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      linkedinProfile: formData.get('linkedinProfile') as string,
      emails: emails.filter(Boolean),
      phoneNumbers: phones.filter(Boolean),
      comments: formData.get('comments') as string,
      communicationPeriodicity: parseInt(formData.get('periodicity') as string, 10),
    };

    if (company) {
      updateCompany(company.id, companyData);
    } else {
      addCompany(companyData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={company?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          defaultValue={company?.location}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          name="linkedinProfile"
          defaultValue={company?.linkedinProfile}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Addresses
        </label>
        {emails.map((email, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const newEmails = [...emails];
                newEmails[index] = e.target.value;
                setEmails(newEmails);
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (emails.length > 1) {
                  setEmails(emails.filter((_, i) => i !== index));
                }
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setEmails([...emails, ''])}
          className="mt-2"
        >
          Add Email
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Numbers
        </label>
        {phones.map((phone, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const newPhones = [...phones];
                newPhones[index] = e.target.value;
                setPhones(newPhones);
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (phones.length > 1) {
                  setPhones(phones.filter((_, i) => i !== index));
                }
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setPhones([...phones, ''])}
          className="mt-2"
        >
          Add Phone
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          name="periodicity"
          defaultValue={company?.communicationPeriodicity || 14}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          name="comments"
          defaultValue={company?.comments}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {company ? 'Update Company' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
}