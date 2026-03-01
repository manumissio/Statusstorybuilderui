import React from 'react';
import { StatusBrief, ToneType, BriefBullet } from '../types';
import { Plus, Sparkles, TrendingUp, X } from 'lucide-react';

interface RightPanelProps {
  brief: StatusBrief;
  tone: ToneType;
  onToneChange: (tone: ToneType) => void;
  onBriefUpdate: (brief: StatusBrief) => void;
  onRemoveBullet: (sectionId: string, bulletId: string) => void;
}

export function RightPanel({
  brief,
  tone,
  onToneChange,
  onBriefUpdate,
  onRemoveBullet,
}: RightPanelProps) {
  const handleOverallStatusChange = (value: string) => {
    onBriefUpdate({
      ...brief,
      overallStatus: value,
    });
  };

  const handleBulletTextChange = (sectionId: string, bulletId: string, text: string) => {
    const updatedSections = brief.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          bullets: section.bullets.map((bullet) =>
            bullet.id === bulletId ? { ...bullet, text } : bullet
          ),
        };
      }
      return section;
    });

    onBriefUpdate({
      ...brief,
      sections: updatedSections,
    });
  };

  const renderBullet = (bullet: BriefBullet, sectionId: string) => {
    return (
      <div
        key={bullet.id}
        className={`group relative rounded-lg border bg-white p-3 ${
          bullet.isNew
            ? 'border-green-300 bg-green-50'
            : bullet.changedFromLast
            ? 'border-yellow-300 bg-yellow-50'
            : 'border-gray-200'
        }`}
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {bullet.isNew && (
              <span className="flex items-center gap-1 rounded bg-green-600 px-2 py-0.5 text-xs text-white">
                <Plus className="h-3 w-3" />
                New
              </span>
            )}
            {bullet.changedFromLast && (
              <span className="flex items-center gap-1 rounded bg-yellow-600 px-2 py-0.5 text-xs text-white">
                <TrendingUp className="h-3 w-3" />
                Changed
              </span>
            )}
          </div>
          <button
            onClick={() => onRemoveBullet(sectionId, bullet.id)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-red-600" />
          </button>
        </div>
        <textarea
          value={bullet.text}
          onChange={(e) => handleBulletTextChange(sectionId, bullet.id, e.target.value)}
          className="w-full resize-none border-0 bg-transparent p-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
          rows={2}
        />
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-gray-900">Status Brief Draft</h2>
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => onToneChange('executive')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
                tone === 'executive'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              Executive Concise
            </button>
            <button
              onClick={() => onToneChange('operational')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
                tone === 'operational'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Operational Detail
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Overall Status */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-sm text-gray-700">Overall Status</label>
            <textarea
              value={brief.overallStatus}
              onChange={(e) => handleOverallStatusChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Sections */}
          {brief.sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base text-gray-900">{section.title}</h3>
                <button className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50">
                  <Plus className="h-3 w-3" />
                  Add Bullet
                </button>
              </div>

              {section.bullets.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <p className="text-sm text-gray-500">
                    No items yet. Click signals to insert bullets.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {section.bullets.map((bullet) => renderBullet(bullet, section.id))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
