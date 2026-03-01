import React from 'react';
import { Signal } from '../types';
import {
  Flag,
  AlertCircle,
  GitBranch,
  TrendingUp,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface LeftPanelProps {
  signals: Signal[];
  onSignalClick: (signal: Signal) => void;
  selectedSignals: string[];
}

export function LeftPanel({ signals, onSignalClick, selectedSignals }: LeftPanelProps) {
  const getSignalIcon = (type: Signal['type']) => {
    switch (type) {
      case 'milestone':
        return <Flag className="h-4 w-4" />;
      case 'blocker':
        return <AlertCircle className="h-4 w-4" />;
      case 'dependency':
        return <GitBranch className="h-4 w-4" />;
      case 'change':
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Signal['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getTypeLabel = (type: Signal['type']) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const sortedSignals = [...signals].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h2 className="text-lg text-gray-900">Live Signals</h2>
        <p className="mt-1 text-sm text-gray-600">
          Click to insert into brief
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {sortedSignals.map((signal) => {
            const isSelected = selectedSignals.includes(signal.id);
            return (
              <button
                key={signal.id}
                onClick={() => onSignalClick(signal)}
                className={`w-full rounded-lg border bg-white p-4 text-left transition-all hover:shadow-md ${
                  isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md border p-1.5 ${getPriorityColor(signal.priority)}`}>
                      {getSignalIcon(signal.type)}
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${getPriorityColor(
                        signal.priority
                      )}`}
                    >
                      {getTypeLabel(signal.type)}
                    </span>
                  </div>
                  {signal.changed && (
                    <span className="flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                      <TrendingUp className="h-3 w-3" />
                      Changed
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-sm text-gray-900">{signal.title}</h3>
                <p className="mb-3 text-xs text-gray-600">{signal.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Source: {signal.source}</span>
                  {signal.daysOld && signal.daysOld > 7 && (
                    <span className="flex items-center gap-1 text-xs text-red-600">
                      <Clock className="h-3 w-3" />
                      {signal.daysOld} days old
                      <AlertTriangle className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
