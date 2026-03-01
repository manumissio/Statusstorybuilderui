import React from 'react';
import { BriefBullet } from '../types';
import { Link2, ExternalLink } from 'lucide-react';

interface TraceabilityBarProps {
  bullets: BriefBullet[];
  onBulletClick: (bulletId: string) => void;
}

export function TraceabilityBar({ bullets, onBulletClick }: TraceabilityBarProps) {
  const bulletsWithSources = bullets.filter((b) => b.sourceSignals.length > 0);

  return (
    <div className="border-t border-gray-200 bg-white px-8 py-3">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link2 className="h-4 w-4" />
            <span>Traceability:</span>
          </div>

          <div className="flex flex-1 items-center gap-2 overflow-x-auto">
            {bulletsWithSources.length === 0 ? (
              <span className="text-xs text-gray-500">
                No source links yet - click signals to add traced bullets
              </span>
            ) : (
              bulletsWithSources.slice(0, 8).map((bullet) => (
                <button
                  key={bullet.id}
                  onClick={() => onBulletClick(bullet.id)}
                  className="group flex items-center gap-1.5 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                >
                  <span className="max-w-[200px] truncate">{bullet.text}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">→</span>
                    <span className="font-mono text-blue-600">
                      {bullet.sourceSignals.length} source{bullet.sourceSignals.length > 1 ? 's' : ''}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>
              ))
            )}
            {bulletsWithSources.length > 8 && (
              <span className="text-xs text-gray-500">
                +{bulletsWithSources.length - 8} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
