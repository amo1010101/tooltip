import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'work-finance',
  title: 'Work & Finance',
  subPillars: [
    {
      id: 'career-direction',
      title: 'Career Direction',
      score: 70,
      actions: [
        {
          title: 'Write your professional "Why"',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Take a career test',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Identify 3 professional passions',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'List dream jobs',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Ask for talent feedback',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'productivity-time',
      title: 'Productivity & Time',
      score: 65,
      actions: [
        {
          title: 'Use Eisenhower matrix',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Audit your calendar',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Remove 3 unnecessary tasks',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Block 1h for Deep Work daily',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Identify one time waster',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'financial-health',
      title: 'Financial Health',
      score: 68,
      actions: [
        {
          title: 'Track expenses for 1 week',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Set up automatic transfer',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Read investment article',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Create simple Excel budget',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Set 3-month financial goal',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'professional-skills',
      title: 'Professional Skills',
      score: 72,
      actions: [
        {
          title: 'Complete short training',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Ask colleague for training',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Read professional book',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Learn new SaaS tool',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Explain job to 10-year-old',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function WorkFinancePage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Work & Finance Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 