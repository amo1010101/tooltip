import React from 'react';
import PillarCard, { PillarData } from '../components/PillarCard';

const pillarData: PillarData = {
  id: 'relations',
  title: 'Relations',
  subPillars: [
    {
      id: 'intimate-relationships',
      title: 'Intimate Relationships',
      score: 70,
      actions: [
        {
          title: 'Plan a date night',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Express sincere appreciation',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Have a vulnerable conversation',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Read relationship article together',
          points: '+10 points',
          status: 'todo'
        },
        {
          title: 'Establish disconnection routine together',
          points: '+15 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'friends-social',
      title: 'Friends & Social Life',
      score: 65,
      actions: [
        {
          title: 'Message 3 long-lost friends',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Organize spontaneous coffee meetup',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Attend a Meetup event',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Remove one toxic relationship',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Share vulnerability with friend',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'family',
      title: 'Family',
      score: 68,
      actions: [
        {
          title: 'Call family member without reason',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Write unsent letter',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Plan activity with close relative',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Ask for honest feedback',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Say sincere "I love you" or "thank you"',
          points: '+10 points',
          status: 'todo'
        }
      ]
    },
    {
      id: 'community-belonging',
      title: 'Community & Belonging',
      score: 72,
      actions: [
        {
          title: 'Participate in volunteer action',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Post public idea or opinion',
          points: '+12 points',
          status: 'todo'
        },
        {
          title: 'Join community about passion',
          points: '+18 points',
          status: 'todo'
        },
        {
          title: 'Offer help to someone',
          points: '+15 points',
          status: 'todo'
        },
        {
          title: 'Express public gratitude',
          points: '+10 points',
          status: 'todo'
        }
      ]
    }
  ]
};

export default function RelationsPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Relations Dashboard</h1>
      <PillarCard pillar={pillarData} />
    </div>
  );
} 