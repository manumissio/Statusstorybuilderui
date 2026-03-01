import React from 'react';
import { AudienceType } from '../types';
import { Calendar, Users, FileText, Download, RefreshCw, Eye } from 'lucide-react';

interface HeaderProps {
  audience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
  dateRange: { start: Date; end: Date };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  onRebuildDraft: () => void;
  onCompare: () => void;
  onExport: (format: 'ppt' | 'pdf') => void;
}

export function Header({
  audience,
  onAudienceChange,
  dateRange,
  onRebuildDraft,
  onCompare,
  onExport,
}: HeaderProps) {
  const audienceLabels: Record<AudienceType, string> = {
    client: 'Client Leadership',
    internal: 'Internal Leadership',
    team: 'Delivery Team',
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <header className="border-b border-gray-200 bg-white px-8 py-4">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl text-gray-900">Status Story Builder</h1>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
            {(['client', 'internal', 'team'] as AudienceType[]).map((aud) => (
              <button
                key={aud}
                onClick={() => onAudienceChange(aud)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  audience === aud
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {audienceLabels[aud]}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCompare}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            Compare to Last
          </button>

          <button
            onClick={onRebuildDraft}
            className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            Rebuild Draft
          </button>

          <div className="relative">
            <button
              onClick={() => onExport('pdf')}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
