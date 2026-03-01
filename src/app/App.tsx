import React, { useState } from 'react';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { TraceabilityBar } from './components/TraceabilityBar';
import { ComparisonModal } from './components/ComparisonModal';
import { mockSignals, currentBrief, previousBrief } from './data/mockData';
import { AudienceType, ToneType, StatusBrief, Signal } from './types';

export default function App() {
  const [audience, setAudience] = useState<AudienceType>('client');
  const [tone, setTone] = useState<ToneType>('executive');
  const [dateRange] = useState({
    start: new Date('2026-02-23'),
    end: new Date('2026-03-01'),
  });
  const [brief, setBrief] = useState<StatusBrief>(currentBrief);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  const handleSignalClick = (signal: Signal) => {
    // Toggle selection
    if (selectedSignals.includes(signal.id)) {
      setSelectedSignals(selectedSignals.filter((id) => id !== signal.id));
      return;
    }

    setSelectedSignals([...selectedSignals, signal.id]);

    // Determine which section to add to based on signal category
    let targetSectionId = 'on-track';
    if (signal.category === 'at-risk') {
      targetSectionId = 'at-risk';
    } else if (signal.category === 'blocked') {
      targetSectionId = 'blocked';
    }

    // Generate bullet text based on tone
    let bulletText = signal.title;
    if (tone === 'operational') {
      bulletText = `${signal.title} - ${signal.description} (Source: ${signal.source})`;
    }

    // Add new bullet to appropriate section
    const updatedSections = brief.sections.map((section) => {
      if (section.id === targetSectionId) {
        const newBullet = {
          id: `b-${Date.now()}`,
          text: bulletText,
          sourceSignals: [signal.id],
          isNew: true,
        };
        return {
          ...section,
          bullets: [...section.bullets, newBullet],
        };
      }
      return section;
    });

    setBrief({
      ...brief,
      sections: updatedSections,
    });
  };

  const handleRemoveBullet = (sectionId: string, bulletId: string) => {
    const updatedSections = brief.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          bullets: section.bullets.filter((b) => b.id !== bulletId),
        };
      }
      return section;
    });

    setBrief({
      ...brief,
      sections: updatedSections,
    });
  };

  const handleRebuildDraft = () => {
    // Reset to original mock data
    setBrief(currentBrief);
    setSelectedSignals([]);
  };

  const handleExport = (format: 'ppt' | 'pdf') => {
    alert(`Export to ${format.toUpperCase()} would be triggered here`);
  };

  const handleBulletClick = (bulletId: string) => {
    // Scroll to bullet or highlight it
    console.log('Navigate to bullet:', bulletId);
  };

  const allBullets = brief.sections.flatMap((section) => section.bullets);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header
        audience={audience}
        onAudienceChange={setAudience}
        dateRange={dateRange}
        onDateRangeChange={() => {}}
        onRebuildDraft={handleRebuildDraft}
        onCompare={() => setShowComparison(true)}
        onExport={handleExport}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[360px]">
          <LeftPanel
            signals={mockSignals}
            onSignalClick={handleSignalClick}
            selectedSignals={selectedSignals}
          />
        </div>

        <div className="flex-1">
          <RightPanel
            brief={brief}
            tone={tone}
            onToneChange={setTone}
            onBriefUpdate={setBrief}
            onRemoveBullet={handleRemoveBullet}
          />
        </div>
      </div>

      <TraceabilityBar bullets={allBullets} onBulletClick={handleBulletClick} />

      {showComparison && (
        <ComparisonModal
          currentBrief={brief}
          previousBrief={previousBrief}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
