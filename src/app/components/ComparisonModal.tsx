import React from 'react';
import { StatusBrief, ReportComparison } from '../types';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';

interface ComparisonModalProps {
  currentBrief: StatusBrief;
  previousBrief: StatusBrief;
  onClose: () => void;
}

export function ComparisonModal({
  currentBrief,
  previousBrief,
  onClose,
}: ComparisonModalProps) {
  const getComparison = (): ReportComparison => {
    const currentBullets = currentBrief.sections.flatMap((s) =>
      s.bullets.map((b) => ({ section: s.title, text: b.text }))
    );
    const previousBullets = previousBrief.sections.flatMap((s) =>
      s.bullets.map((b) => ({ section: s.title, text: b.text }))
    );

    const added = currentBullets.filter(
      (cb) => !previousBullets.some((pb) => pb.text === cb.text)
    );

    const removed = previousBullets.filter(
      (pb) => !currentBullets.some((cb) => cb.text === pb.text)
    );

    const changed: string[] = [];

    return {
      added: added.map((a) => a.text),
      removed: removed.map((r) => r.text),
      changed,
    };
  };

  const comparison = getComparison();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 w-full max-w-5xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-xl text-gray-900">Report Comparison</h2>
            <p className="mt-1 text-sm text-gray-600">
              Comparing {formatDate(previousBrief.date)} to {formatDate(currentBrief.date)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[600px] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Overall Status Change */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base text-gray-900">
                Overall Status
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Minus className="h-4 w-4 text-red-600" />
                    <span className="text-xs text-red-600">Previous</span>
                  </div>
                  <p className="text-sm text-gray-700">{previousBrief.overallStatus}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Plus className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">Current</span>
                  </div>
                  <p className="text-sm text-gray-700">{currentBrief.overallStatus}</p>
                </div>
              </div>
            </div>

            {/* Added Items */}
            {comparison.added.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base text-gray-900">
                  <Plus className="h-5 w-5 text-green-600" />
                  Added Items ({comparison.added.length})
                </h3>
                <div className="space-y-2">
                  {comparison.added.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-green-200 bg-green-50 p-3"
                    >
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Removed Items */}
            {comparison.removed.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base text-gray-900">
                  <Minus className="h-5 w-5 text-red-600" />
                  Removed Items ({comparison.removed.length})
                </h3>
                <div className="space-y-2">
                  {comparison.removed.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {comparison.added.length === 0 && comparison.removed.length === 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-500">No changes detected between reports</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
