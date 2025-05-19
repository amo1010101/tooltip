import React from 'react';

interface ScoreIndicatorProps {
  score: number;
}

export default function ScoreIndicator({ score }: ScoreIndicatorProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{
          width: `${score}%`,
        }}
      />
    </div>
  );
} 