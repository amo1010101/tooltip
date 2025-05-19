'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type PillarScore = {
  id: string;
  title: string;
  score: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
};

type InsightLevel = {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
};

type PillarInsights = {
  low: InsightLevel;
  medium: InsightLevel;
  high: InsightLevel;
};

// Helper function to generate insights based on score
function generateInsights(pillar: string, score: number): Omit<PillarScore, 'id' | 'title' | 'score'> {
  const insights: Record<string, PillarInsights> = {
    'health-energy': {
      low: {
        strengths: ['Awareness of health importance', 'Ready to make changes'],
        improvements: ['Sleep quality', 'Physical activity', 'Nutrition habits'],
        recommendations: ['Start with basic sleep hygiene', 'Introduce daily walking', 'Plan regular meals']
      },
      medium: {
        strengths: ['Basic healthy routines', 'Regular physical activity'],
        improvements: ['Energy management', 'Recovery practices'],
        recommendations: ['Optimize sleep schedule', 'Enhance nutrition quality', 'Add strength training']
      },
      high: {
        strengths: ['Strong health foundation', 'Active lifestyle'],
        improvements: ['Fine-tune energy levels', 'Advanced recovery'],
        recommendations: ['Explore advanced fitness goals', 'Optimize nutrition timing', 'Enhance sleep quality']
      }
    },
    'mental-emotions': {
      low: {
        strengths: ['Self-awareness', 'Desire to improve'],
        improvements: ['Stress management', 'Emotional regulation'],
        recommendations: ['Start daily mindfulness', 'Learn basic breathing techniques', 'Practice self-reflection']
      },
      medium: {
        strengths: ['Basic emotional awareness', 'Some coping strategies'],
        improvements: ['Emotional resilience', 'Stress response'],
        recommendations: ['Develop meditation practice', 'Learn advanced coping skills', 'Practice emotional intelligence']
      },
      high: {
        strengths: ['Strong emotional intelligence', 'Effective stress management'],
        improvements: ['Peak performance', 'Advanced emotional mastery'],
        recommendations: ['Explore advanced meditation', 'Teach others', 'Deepen practice']
      }
    },
    'relations': {
      low: {
        strengths: ['Recognition of importance', 'Openness to connect'],
        improvements: ['Social connections', 'Communication skills'],
        recommendations: ['Join social groups', 'Practice active listening', 'Schedule regular check-ins']
      },
      medium: {
        strengths: ['Stable relationships', 'Basic communication skills'],
        improvements: ['Deeper connections', 'Conflict resolution'],
        recommendations: ['Enhance empathy skills', 'Practice vulnerability', 'Strengthen boundaries']
      },
      high: {
        strengths: ['Strong support network', 'Excellent communication'],
        improvements: ['Leadership in relationships', 'Community building'],
        recommendations: ['Mentor others', 'Build community projects', 'Deepen existing bonds']
      }
    },
    'work-finance': {
      low: {
        strengths: ['Financial awareness', 'Desire for growth'],
        improvements: ['Career planning', 'Financial management'],
        recommendations: ['Create basic budget', 'Set career goals', 'Build emergency fund']
      },
      medium: {
        strengths: ['Career stability', 'Basic financial planning'],
        improvements: ['Career advancement', 'Investment strategy'],
        recommendations: ['Develop new skills', 'Optimize investments', 'Network strategically']
      },
      high: {
        strengths: ['Career success', 'Strong financial foundation'],
        improvements: ['Leadership development', 'Wealth building'],
        recommendations: ['Mentor others', 'Diversify investments', 'Plan legacy']
      }
    },
    'self-development': {
      low: {
        strengths: ['Growth mindset', 'Learning interest'],
        improvements: ['Learning habits', 'Goal setting'],
        recommendations: ['Start daily learning habit', 'Set SMART goals', 'Find accountability partner']
      },
      medium: {
        strengths: ['Regular learning habits', 'Clear goals'],
        improvements: ['Skill mastery', 'Knowledge application'],
        recommendations: ['Deepen expertise', 'Share knowledge', 'Set challenging goals']
      },
      high: {
        strengths: ['Strong learning system', 'Continuous growth'],
        improvements: ['Teaching others', 'Innovation'],
        recommendations: ['Create content', 'Build learning community', 'Push boundaries']
      }
    }
  };

  const level = score < 40 ? 'low' : score < 70 ? 'medium' : 'high';
  return insights[pillar][level];
}

// Helper function to get pillar title
function getPillarTitle(id: string): string {
  const titles: Record<string, string> = {
    'health-energy': 'Health & Energy',
    'mental-emotions': 'Mental & Emotions',
    'relations': 'Relations',
    'work-finance': 'Work & Finance',
    'self-development': 'Self Development'
  };
  return titles[id];
}

export default function DiagnosticResults() {
  const [results, setResults] = useState<PillarScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get scores from localStorage (set by DiagnosticForm)
    const scoresJson = localStorage.getItem('diagnostic_scores');
    if (scoresJson) {
      const scores = JSON.parse(scoresJson);
      
      // Transform scores into full results with insights
      const fullResults = Object.entries(scores).map(([id, score]) => ({
        id,
        title: getPillarTitle(id),
        score: score as number,
        ...generateInsights(id, score as number)
      }));

      setResults(fullResults);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading your results...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personal Growth Profile
          </h1>
          <p className="text-lg text-gray-600">
            Based on your responses, here's where you stand and what to focus on.
          </p>
        </div>

        <div className="grid gap-6">
          {results.map((pillar) => (
            <Card key={pillar.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{pillar.title}</span>
                  <span className="text-2xl font-bold">{pillar.score}%</span>
                </CardTitle>
                <Progress value={pillar.score} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">Strengths</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {pillar.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-600">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-700 mb-2">Areas for Growth</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {pillar.improvements.map((improvement, index) => (
                        <li key={index} className="text-gray-600">{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-blue-700 mb-2">Recommended Next Steps</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {pillar.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-600">{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button size="lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 