import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'health-energy',
  title: 'Health & Energy',
  subPillars: [
    {
      id: 'sleep-recovery',
      title: 'Sleep & Recovery',
      score: 70,
      actions: [
        {
          title: 'Maintain fixed bedtime for 5 days',
          points: '+20 points',
          status: 'todo'
        },
        {
          title: 'No screens 60 min before bed',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Track sleep with app for 1 week',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Try early bedtime (before 11pm)',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Use magnesium or relaxing tea',
          points: '+8 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'nutrition-hydration',
      title: 'Nutrition & Hydration',
      score: 65,
      actions: [
        {
          title: 'Drink 1.5L water daily',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Eat at least 3 vegetables daily',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'No sugary snacks for 3 days',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Try intermittent fasting for 2 days',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Keep food journal for 3 days',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'physical-activity',
      title: 'Physical Activity',
      score: 68,
      actions: [
        {
          title: 'Walk 30 min/day for 5 days',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Complete 2 guided workout sessions',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Try a new activity (yoga, boxing, etc.)',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Hit daily step goal (10,000)',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Morning stretching routine (5 min)',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'energy-levels',
      title: 'Energy Levels',
      score: 72,
      actions: [
        {
          title: 'Skip coffee for 2 days and observe',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Schedule daily focus time block',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Sleep 7h+ for 3 consecutive nights',
          points: '+20 points',
          status: 'todo'
        },
        {
          title: 'Use Pomodoro technique',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Identify daily energy vampires',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function HealthEnergyPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Health & Energy Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 