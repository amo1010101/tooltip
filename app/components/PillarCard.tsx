import React from 'react';
import ScoreIndicator from './ScoreIndicator';
import ActionItem from './ActionItem';

export type Action = {
  title: string;
  points: string;
  status: 'todo' | 'in-progress';
};

export type SubPillar = {
  id: string;
  title: string;
  score: number;
  actions: Action[];
};

export type PillarData = {
  id: string;
  title: string;
  subPillars: SubPillar[];
};

interface PillarCardProps {
  pillar: PillarData;
}

export default function PillarCard({ pillar }: PillarCardProps) {
  // Calculate overall score as average of subpillar scores
  const overallScore = Math.round(
    pillar.subPillars.reduce((acc, sub) => acc + sub.score, 0) / pillar.subPillars.length
  );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{pillar.title}</h2>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">{overallScore}</div>
            <div className="text-sm text-gray-500 ml-1">/100</div>
          </div>
        </div>

        <ScoreIndicator score={overallScore} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillar.subPillars.map((subPillar) => (
          <div key={subPillar.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{subPillar.title}</h3>
              <div className="flex items-center">
                <div className="text-xl font-bold text-blue-600">{subPillar.score}</div>
                <div className="text-sm text-gray-500 ml-1">/100</div>
              </div>
            </div>

            <ScoreIndicator score={subPillar.score} />

            <div className="space-y-4 mt-6">
              <h4 className="text-lg font-semibold text-gray-700">Actions to Improve Score</h4>
              {subPillar.actions.map((action, index) => (
                <ActionItem key={index} action={action} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 