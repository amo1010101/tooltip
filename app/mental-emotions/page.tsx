import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'mental-emotions',
  title: 'Mental & Emotions',
  subPillars: [
    {
      id: 'stress-management',
      title: 'Stress Management',
      score: 65,
      actions: [
        {
          title: 'Try breathing technique (cardiac coherence)',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Practice mini-meditation for 3 days',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Keep daily stress journal',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Identify 3 recurring stress sources',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Try EFT (Emotional Freedom Technique)',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'self-esteem',
      title: 'Self-Esteem',
      score: 70,
      actions: [
        {
          title: 'Write down 3 personal qualities',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Talk to yourself as a friend for 24h',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Complete one uncomfortable micro-action',
          points: '+20 points',
          status: 'todo'
        },
        {
          title: 'Practice self-gratitude',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Identify one limiting belief',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'emotional-regulation',
      title: 'Emotional Regulation',
      score: 68,
      actions: [
        {
          title: 'Note emotions 3x/day for 3 days',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Take 10 minutes of complete silence daily',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Describe emotion without judgment',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Read about emotion wheel',
          points: '+10 points',
          status: 'todo'
        },
        {
          title: 'Express difficult emotion to someone',
          points: '+15 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'mind-clarity',
      title: 'Mind Clarity',
      score: 72,
      actions: [
        {
          title: 'Do one brain dump session',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Use Notion/Todoist to clear mind',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Turn off notifications for 4h',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Try GTD method',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'No screens 2h before bed',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function MentalEmotionsPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Mental & Emotions Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 