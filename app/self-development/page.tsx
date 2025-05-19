import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'self-development',
  title: 'Self Development',
  subPillars: [
    {
      id: 'personal-growth',
      title: 'Personal Growth',
      score: 70,
      actions: [
        {
          title: 'Read 10 pages daily',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Write morning journal',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Take non-professional course',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Create bucket list',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Do one new thing',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'creativity-expression',
      title: 'Creativity & Expression',
      score: 65,
      actions: [
        {
          title: 'Write personal post',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Draw/sing/create for 30min',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Create mood playlist',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Write fiction',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Join creative challenge',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'life-vision',
      title: 'Life Vision & Values',
      score: 68,
      actions: [
        {
          title: 'Write down 5 values',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Note misalignment moments',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Read/listen philosophy content',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Write ideal life vision',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Create vision board',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'curiosity-culture',
      title: 'Curiosity & Culture',
      score: 72,
      actions: [
        {
          title: 'Watch unknown topic documentary',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Read biography',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Explore different culture',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Create discovery notebook',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Share weekly cultural recommendation',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function SelfDevelopmentPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Self Development Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 