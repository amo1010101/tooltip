import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'culture-learning',
  title: 'Culture & Learning',
  subPillars: [
    {
      id: 'intellectual-growth',
      title: 'Intellectual Growth',
      score: 78,
      actions: [
        {
          title: 'Read educational content daily',
          points: '+15 points',
          status: 'in-progress'
        },
        {
          title: 'Online course completion',
          points: '+20 points',
          status: 'todo'
        },
        {
          title: 'Knowledge sharing/teaching',
          points: '+18 points',
          status: 'in-progress'
        },
        {
          title: 'Problem-solving challenges',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Academic writing practice',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'cultural-enrichment',
      title: 'Cultural Enrichment',
      score: 72,
      actions: [
        {
          title: 'Cultural events attendance',
          points: '+15 points',
          status: 'in-progress'
        },
        {
          title: 'Language learning practice',
          points: '+20 points',
          status: 'todo'
        },
        {
          title: 'Art gallery/museum visits',
          points: '+12 points',
          status: 'in-progress'
        },
        {
          title: 'Cultural cuisine exploration',
          points: '+10 points',
          status: 'todo'
        },
        {
          title: 'International media consumption',
          points: '+8 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'creative-expression',
      title: 'Creative Expression',
      score: 70,
      actions: [
        {
          title: 'Regular creative practice',
          points: '+15 points',
          status: 'in-progress'
        },
        {
          title: 'New art form exploration',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Creative project completion',
          points: '+20 points',
          status: 'in-progress'
        },
        {
          title: 'Skill-sharing workshops',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Creative community engagement',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function CultureLearningPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Culture & Learning Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 