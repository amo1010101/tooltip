import React from 'react';
import { Action } from './PillarCard';

interface ActionItemProps {
  action: Action;
}

export default function ActionItem({ action }: ActionItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <div
          className={`w-2 h-2 rounded-full ${
            action.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-400'
          }`}
        />
        <span className="text-gray-700">{action.title}</span>
      </div>
      <span className="text-green-600 font-medium">{action.points}</span>
    </div>
  );
} 